import React, { useState, useEffect } from 'react';
import { NewsArticle } from '../types';
import { GoogleGenAI } from "@google/genai";

const NewsArticleItem: React.FC<{ article: NewsArticle }> = ({ article }) => {
    return (
        <div className="py-5 border-b border-gray-800 animate-fade-in">
            <p className="text-sm text-gray-500 mb-2">{article.date}</p>
            <a href={article.link} target="_blank" rel="noopener noreferrer" className="font-semibold text-gray-100 hover:text-cyan-400 transition-colors text-base leading-tight block">
                {article.title}
            </a>
            <p className="text-sm text-gray-400 mt-2">{article.summary}</p>
        </div>
    );
};

export const NewsFeed: React.FC = () => {
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [sources, setSources] = useState<{uri: string, title: string}[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                setError(null);
                
                if (!process.env.API_KEY) {
                  throw new Error("La clave de API de Gemini no está configurada.");
                }
                
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
                
                const prompt = `
                    Busca las 6 noticias más recientes y relevantes sobre interconexión eléctrica en América Latina y el Caribe.
                    Para cada noticia, proporciona el título exacto y original del artículo, un resumen breve (máximo 2-3 frases) y la fecha de publicación (en formato "dd de Mes, AAAA").
                    Responde únicamente con un array JSON válido de objetos. Cada objeto debe tener estas claves: "title", "summary", y "date".
                    El valor de la clave "title" DEBE SER IDÉNTICO al título del artículo original de la fuente. No lo resumas ni lo modifiques.
                    No incluyas explicaciones, texto introductorio, ni marques el JSON como un bloque de código. Tu respuesta debe ser solo el array JSON.
                `;

                const response = await ai.models.generateContent({
                   model: "gemini-2.5-flash",
                   contents: prompt,
                   config: {
                     tools: [{googleSearch: {}}],
                   },
                });

                let jsonText = response.text.trim();
                
                const startIndex = jsonText.indexOf('[');
                const endIndex = jsonText.lastIndexOf(']');

                if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
                    throw new Error("Respuesta de la IA no contiene un array JSON válido.");
                }

                jsonText = jsonText.substring(startIndex, endIndex + 1);

                const parsedArticles = JSON.parse(jsonText);

                if (!Array.isArray(parsedArticles)) {
                    throw new Error("La respuesta de la IA no es un array JSON válido.");
                }

                const formattedArticles: NewsArticle[] = parsedArticles.map((item: any, index: number) => ({
                    id: `news-${index}-${Date.now()}`,
                    title: item.title,
                    summary: item.summary,
                    date: item.date,
                    link: `https://www.google.com/search?tbm=nws&q="${encodeURIComponent(item.title)}"`,
                }));

                setArticles(formattedArticles);

                const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
                if (groundingChunks) {
                    const webSources: { uri: string; title: string }[] = groundingChunks
                        .filter((chunk: any) => chunk.web && chunk.web.uri)
                        .map((chunk: any) => ({
                            uri: chunk.web.uri,
                            title: chunk.web.title || new URL(chunk.web.uri).hostname,
                        }));
                    const uniqueSources = Array.from(new Map(webSources.map(s => [s.uri, s])).values());
                    setSources(uniqueSources);
                }

            } catch (e: any) {
                console.error("Fallo al obtener noticias de Gemini:", e);
                setError('No se pudieron cargar las noticias. La IA no respondió como se esperaba o hubo un problema de conexión.');
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    const renderContent = () => {
        if (loading) {
            return (
                <div className="text-center py-16">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mx-auto"></div>
                    <p className="text-gray-500 mt-4">Consultando a la IA para las últimas noticias...</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="text-center py-16 bg-red-900/20 text-red-300 rounded-lg">
                    <p>{error}</p>
                </div>
            );
        }

        if (articles.length === 0) {
            return (
                <div className="text-center py-16 bg-gray-900 rounded-lg">
                    <p className="text-gray-500">No se encontraron noticias relevantes en este momento.</p>
                </div>
            );
        }

        return articles.map(article => <NewsArticleItem key={article.id} article={article} />);
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow">
             <div className="text-center mb-12">
                 <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                    Noticias y Alertas
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
                    Manténgase actualizado con los últimos avances en integración energética, impulsado por Gemini y Google Search.
                </p>
            </div>

            <div className="max-w-4xl mx-auto">
                {renderContent()}
                
                {sources.length > 0 && !loading && !error && (
                    <div className="mt-12 pt-6 border-t border-gray-800">
                        <h3 className="text-lg font-semibold text-gray-300 mb-4">Fuentes Consultadas</h3>
                        <ul className="space-y-2">
                            {sources.map((source, index) => (
                                <li key={index}>
                                    <a 
                                        href={source.uri} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-sm text-cyan-500 hover:text-cyan-400 hover:underline transition-colors truncate block"
                                        title={source.title}
                                    >
                                        {source.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
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