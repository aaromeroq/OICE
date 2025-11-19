import React, { useState, useEffect, useCallback } from 'react';
import { AcademicPublication } from '../types';
import { SearchIcon } from './Icons';

const SEMANTIC_ENDPOINT = 'https://api.semanticscholar.org/graph/v1/paper/search';
const API_KEY = 'mB34UaL8hVow81cwUnv71rP2FZn24J781rZs5S3g';
const SEARCH_FIELDS = 'title,abstract,authors,year,venue,url';
const SEARCH_LIMIT = 20;
const BASE_QUERY = 'International electricity interconnections';

const PublicationCard: React.FC<{ pub: AcademicPublication }> = ({ pub }) => (
    <div className="bg-gray-900 p-6 rounded-lg border border-gray-700/80 flex flex-col h-full animate-fade-in">
        <div className="flex justify-between items-start mb-2">
            <span className="text-xs text-gray-500">{pub.year || 'Año no disponible'} &bull; {pub.journal || 'Publicación no especificada'}</span>
        </div>
        <h4 className="font-bold text-white text-lg mb-2 flex-grow">{pub.title}</h4>
        <p className="text-sm text-gray-500 mb-3 italic">
            {pub.authors.length > 0 ? pub.authors.join(', ') : 'Autores no listados'}
        </p>
        <p className="text-gray-400 text-sm mb-4" style={{ display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {pub.abstract || 'Resumen no disponible.'}
        </p>
        {pub.link && (
            <a href={pub.link} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-cyan-500 hover:text-cyan-400 transition-colors mt-auto self-start">
                Leer Más &rarr;
            </a>
        )}
    </div>
);


export const AcademicRepository: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [publications, setPublications] = useState<AcademicPublication[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [hasSearched, setHasSearched] = useState(true);

    const buildQuery = useCallback((extraTerms: string) => {
        const trimmed = extraTerms.trim();
        return trimmed ? `${BASE_QUERY} ${trimmed}` : BASE_QUERY;
    }, []);

    const fetchPublications = useCallback(async (extraTerms: string) => {
        const query = buildQuery(extraTerms);

        setLoading(true);
        setError(null);
        setHasSearched(true);
        setPublications([]);

        const params = new URLSearchParams({
            query: query,
            limit: SEARCH_LIMIT.toString(),
            fields: SEARCH_FIELDS,
        });

        try {
            const response = await fetch(`${SEMANTIC_ENDPOINT}?${params.toString()}`, {
                headers: { 'x-api-key': API_KEY }
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: `Error del servidor: ${response.statusText}` }));
                throw new Error(errorData.message || `Error: ${response.status}`);
            }

            const data = await response.json();
            const formattedPublications: AcademicPublication[] = (data.data || []).map((p: any) => ({
                id: p.paperId,
                title: p.title,
                authors: (p.authors || []).map((a: any) => a.name),
                year: p.year,
                abstract: p.abstract,
                link: p.url,
                journal: p.venue,
            }));
            setPublications(formattedPublications);

        } catch (err: any) {
            console.error("Fallo al obtener datos de Semantic Scholar:", err);
            setError(`No se pudieron obtener los resultados. Por favor, inténtelo de nuevo más tarde. (${err.message})`);
        } finally {
            setLoading(false);
        }
    }, [buildQuery]);

    useEffect(() => {
        fetchPublications('');
    }, [fetchPublications]);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        fetchPublications(searchTerm);
    };

    const renderContent = () => {
        if (loading) {
            return (
                 <div className="text-center py-16">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mx-auto"></div>
                    <p className="text-gray-500 mt-4">Buscando en la literatura académica...</p>
                </div>
            );
        }
        if (error) {
             return (
                <div className="text-center py-16 bg-red-900/20 text-red-300 rounded-lg">
                    <p className="font-semibold">Ocurrió un error</p>
                    <p className="text-sm mt-2">{error}</p>
                </div>
            );
        }
        if (publications.length === 0 && hasSearched) {
            return (
                <div className="text-center py-16 bg-gray-900 rounded-lg">
                    <p className="text-gray-500">No se encontraron publicaciones que coincidan con su búsqueda.</p>
                </div>
            );
        }
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {publications.map(pub => <PublicationCard key={pub.id} pub={pub} />)}
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow">
            <div className="text-center mb-12">
                 <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                    Repositorio Académico
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
                    Explore el estado del arte en la investigación sobre interconexiones energéticas, impulsado por Semantic Scholar.
                </p>
                <p className="mt-2 text-sm text-gray-500">
                    Siempre buscamos con “{BASE_QUERY}”; el texto del cuadro se concatena al final.
                </p>
            </div>

            <form onSubmit={handleSearch} className="mb-8 p-4 bg-gray-900 rounded-lg border border-gray-800 flex flex-col sm:flex-row gap-4 items-center max-w-3xl mx-auto">
                <input
                    type="text"
                    placeholder="Añada filtros como país, tecnología, etc."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:flex-grow bg-gray-800 text-white rounded-md border-gray-700 focus:ring-cyan-500 focus:border-cyan-500"
                    aria-label="Buscar publicaciones"
                />
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto flex items-center justify-center px-5 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition-colors text-sm font-semibold disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                  <SearchIcon className="h-5 w-5 mr-2" />
                  <span>{loading ? 'Buscando...' : 'Buscar'}</span>
                </button>
            </form>
            
            <div className="max-w-7xl mx-auto">
              {renderContent()}
            </div>
            
            <style>{`
                @keyframes fade-in {
                  from { opacity: 0; transform: translateY(10px); }
                  to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
            `}</style>
        </div>
    );
};
