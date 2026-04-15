import React, { useEffect, useRef, useState } from 'react';
import { Project, Region } from '../types';
import { useLanguage } from '../i18n';

// Declare Leaflet's global variable `L` for TypeScript
declare var L: any;

interface InteractiveMapProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

const regions: (Region | 'Global')[] = ['Global', 'Central & North America', 'South America', 'Europe', 'Asia'];

// Function to get the bounds of a set of projects
const getBoundsForProjects = (projects: Project[]): any | null => {
    if (projects.length === 0) return null;
    const bounds = L.latLngBounds([]);
    projects.forEach(project => {
        project.mapCoordinates.forEach(coord => {
            // Leaflet expects [lat, lng]
            bounds.extend([coord[0], coord[1]]);
        });
    });
    return bounds.isValid() ? bounds : null;
};

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ projects, onSelectProject }) => {
    const { t } = useLanguage();
    const mapRef = useRef<any | null>(null);
    const projectsLayerRef = useRef<any | null>(null);
    const [activeRegion, setActiveRegion] = useState<Region | 'Global'>('Global');

    // Initialize map
    useEffect(() => {
        if (!mapRef.current && document.getElementById('map-container')) {
            mapRef.current = L.map('map-container', {
                center: [20, 0],
                zoom: 2,
                scrollWheelZoom: true,
            });
            
            L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
                subdomains: 'abcd',
                maxZoom: 20
            }).addTo(mapRef.current);

            projectsLayerRef.current = L.featureGroup().addTo(mapRef.current);
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    // Update map when region or projects change
    useEffect(() => {
        if (!mapRef.current || !projectsLayerRef.current) return;
        
        setTimeout(() => {
            if (mapRef.current) {
                 mapRef.current.invalidateSize(true);
            }
        }, 100);

        projectsLayerRef.current.clearLayers();

        const filteredProjects = activeRegion === 'Global' 
            ? projects 
            : projects.filter(p => p.region === activeRegion);
        
        if (filteredProjects.length === 0) return;

        const maxCapacity = Math.max(...filteredProjects.map(p => p.capacityMW), 1);

        filteredProjects.forEach(project => {
            const capacityRatio = project.capacityMW / maxCapacity;
            const baseWeight = 2;
            const maxWeightBonus = 6;
            
            const pathOptions = {
                color: project.technology === 'HVDC' ? '#22d3ee' : '#f59e0b',
                weight: baseWeight + (capacityRatio * maxWeightBonus),
                opacity: 0.7,
            };

            const highlightStyle = {
                weight: pathOptions.weight * 1.5,
                opacity: 1,
            };

            const polyline = L.polyline(project.mapCoordinates, pathOptions);

            const tooltipContent = `
                <div class="font-sans">
                    <strong class="text-base text-white">${project.name}</strong>
                    <p class="text-sm text-gray-300">${project.countries.join(' &ndash; ')}</p>
                    <p class="text-xs text-cyan-400 mt-1">${t('map.capacity')}: ${project.capacityMW.toLocaleString()} MW</p>
                </div>
            `;

            polyline.bindTooltip(tooltipContent, {
                sticky: true,
                className: 'custom-leaflet-tooltip'
            });

            polyline.on('mouseover', (e: any) => e.target.setStyle(highlightStyle));
            polyline.on('mouseout', (e: any) => e.target.setStyle(pathOptions));
            polyline.on('click', () => onSelectProject(project));

            project.mapCoordinates.forEach(coord => {
                const circleRadius = 3 + (capacityRatio * 8);
                const circleOptions = {
                    radius: circleRadius,
                    fillColor: pathOptions.color,
                    color: '#111827',
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                };
                const circleHighlightStyle = {
                    ...circleOptions,
                    radius: circleRadius * 1.5,
                    weight: 2,
                    color: '#ffffff'
                };

                const circle = L.circleMarker(coord, circleOptions);
                circle.bindTooltip(tooltipContent, {
                    sticky: true,
                    className: 'custom-leaflet-tooltip'
                });
                circle.on('mouseover', (e: any) => e.target.setStyle(circleHighlightStyle));
                circle.on('mouseout', (e: any) => e.target.setStyle(circleOptions));
                circle.on('click', () => onSelectProject(project));
                projectsLayerRef.current.addLayer(circle);
            });

            projectsLayerRef.current.addLayer(polyline);
        });
        
        const bounds = getBoundsForProjects(filteredProjects);
        if (bounds) {
             mapRef.current.flyToBounds(bounds, { padding: [50, 50], maxZoom: 8, duration: 1.5 });
        } else if (activeRegion === 'Global') {
            mapRef.current.flyTo([20, 0], 2, { duration: 1.5 });
        }

    }, [activeRegion, projects, onSelectProject, t]);

    const regionLabels: Record<Region | 'Global', string> = {
        'Global': t('map.region.global'),
        'Central & North America': t('map.region.centralNorthAmerica'),
        'South America': t('map.region.southAmerica'),
        'Europe': t('map.region.europe'),
        'Asia': t('map.region.asia')
    };
    
    return (
        <div className="bg-gray-900 rounded-lg border border-gray-700/80 p-4 shadow-xl flex flex-col flex-grow overflow-hidden">
             <div className="flex flex-wrap justify-center border-b border-gray-700 mb-4">
                {regions.map(region => (
                    <button
                        key={region}
                        onClick={() => setActiveRegion(region)}
                        className={`px-4 py-2 text-sm font-medium transition-colors duration-300 focus:outline-none ${
                            activeRegion === region
                                ? 'border-b-2 border-cyan-500 text-cyan-400'
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        {regionLabels[region]}
                    </button>
                ))}
            </div>
            <div id="map-container" className="rounded-md overflow-hidden flex-grow" style={{ backgroundColor: '#111827', minHeight: '400px' }}></div>
            <div className="mt-4 flex justify-end text-xs text-gray-400 space-x-4">
                 <div className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-[#f59e0b] mr-2 border border-white/50"></span>
                    <span>AC</span>
                </div>
                <div className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-[#22d3ee] mr-2 border border-white/50"></span>
                    <span>HVDC</span>
                </div>
            </div>
            <style>{`
                .custom-leaflet-tooltip {
                    background-color: rgba(17, 24, 39, 0.9) !important;
                    border: 1px solid #4b5563 !important;
                    color: #d1d5db !important;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.5) !important;
                    border-radius: 6px !important;
                }
                .custom-leaflet-tooltip .leaflet-tooltip-content {
                    padding: 8px 12px !important;
                }
                .leaflet-tooltip-top:before, .leaflet-tooltip-bottom:before, .leaflet-tooltip-left:before, .leaflet-tooltip-right:before {
                    border: none !important;
                }
            `}</style>
        </div>
    );
};
