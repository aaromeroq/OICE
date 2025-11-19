import React from 'react';

const ExternalLinkIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
);

const links = [
    {
        title: 'Informe: Integración Energética y Descarbonización en América Latina: La dinámica de la integración bajo el enfoque de corrientes múltiples',
        url: 'https://integracion.energia.la',
        description: 'El informe completo que sirve de base para este observatorio. Profundice en el análisis detallado de los modelos de gobernanza, los estudios de caso y las recomendaciones de políticas para la integración energética en América Latina y el Caribe.',
    },
    {
        title: 'Herramienta: explorer.energia.la',
        url: 'https://explorer.energia.la',
        description: 'Una herramienta de visualización de datos interactiva que complementa este atlas. Explore datos de inversión, capacidad de transmisión y generación renovable en toda la región para obtener una comprensión más profunda del panorama energético.',
    }
];

export const LinksSection: React.FC = () => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow">
            <div className="text-center mb-12">
                 <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                    Enlaces de Interés
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
                    Explore recursos adicionales y herramientas relacionadas con la integración energética.
                </p>
            </div>

            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                {links.map((link) => (
                     <div key={link.title} className="bg-gray-900 p-6 rounded-lg border border-gray-700/80 flex flex-col">
                         <h3 className="font-bold text-white text-xl mb-3">{link.title}</h3>
                         <p className="text-gray-400 text-sm mb-6 flex-grow">{link.description}</p>
                         <a 
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition-colors text-sm font-semibold self-start"
                        >
                             <span>Visitar Sitio</span>
                             <ExternalLinkIcon className="w-4 h-4" />
                         </a>
                     </div>
                ))}
            </div>
        </div>
    );
};