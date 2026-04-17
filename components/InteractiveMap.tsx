import React, { useEffect, useRef, useState, useMemo } from 'react';
import { EnergyCommunity, CommunityStatus } from '../types';
import { iberoamericanCountries, getCountryByName } from '../data/countries';
import { useLanguage } from '../i18n';

declare var L: any;

interface InteractiveMapProps {
  communities: EnergyCommunity[];
  onSelectCommunity: (community: EnergyCommunity) => void;
  initialCountry?: string | null;
}

const statusColors: Record<CommunityStatus, { color: string; bg: string }> = {
  'activa':     { color: '#0d9488', bg: 'bg-teal-500' },
  'incubacion': { color: '#f59e0b', bg: 'bg-amber-500' },
  'estancada':  { color: '#ef4444', bg: 'bg-red-500' },
  'abandonada': { color: '#78716c', bg: 'bg-stone-500' },
};

const regionGroups = ['Iberia', 'Mexico y Centroamerica', 'Caribe', 'Sudamerica'] as const;

// Lightweight Natural Earth 110m GeoJSON
const NE_GEOJSON_URL = 'https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson';
const countryGeoCache: Record<string, any> = {};
let neGeoData: any = null;

async function fetchCountryGeo(countryCode: string): Promise<any | null> {
    if (countryGeoCache[countryCode]) return countryGeoCache[countryCode];
    try {
        if (!neGeoData) {
            const res = await fetch(NE_GEOJSON_URL);
            neGeoData = await res.json();
        }
        const feature = neGeoData.features.find(
            (f: any) => f.properties.ISO_A3 === countryCode
        );
        if (feature) countryGeoCache[countryCode] = feature;
        return feature || null;
    } catch {
        return null;
    }
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ communities, onSelectCommunity, initialCountry }) => {
    const { t } = useLanguage();
    const mapRef = useRef<any | null>(null);
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const projectsLayerRef = useRef<any | null>(null);
    const borderLayerRef = useRef<any | null>(null);
    // Store callback in a ref so marker click handlers always use the latest reference
    const onSelectRef = useRef(onSelectCommunity);
    onSelectRef.current = onSelectCommunity;

    // Build localized statusConfig inside the component so we have access to t()
    const statusConfig = useMemo(() => ({
        activa:     { ...statusColors.activa,     label: t('atlas.legend.activa') },
        incubacion: { ...statusColors.incubacion, label: t('atlas.legend.incubacion') },
        estancada:  { ...statusColors.estancada,  label: t('atlas.legend.estancada') },
        abandonada: { ...statusColors.abandonada, label: t('atlas.legend.abandonada') },
    }), [t]);

    // Resolve initialCountry from English name (globe) to Spanish name (communities data)
    const resolveCountryName = (name: string | null | undefined): string | null => {
        if (!name) return null;
        const found = getCountryByName(name);
        return found ? found.name : name;
    };

    const [activeCountry, setActiveCountry] = useState<string | null>(resolveCountryName(initialCountry));
    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        if (initialCountry) {
            setActiveCountry(resolveCountryName(initialCountry));
        }
    }, [initialCountry]);

    const countriesWithData = useMemo(() => {
        const set = new Set<string>();
        communities.forEach(c => c.countries.forEach(cn => set.add(cn)));
        return set;
    }, [communities]);

    const filteredCommunities = useMemo(() => {
        if (!activeCountry) return communities;
        return communities.filter(c => c.countries.includes(activeCountry));
    }, [activeCountry, communities]);

    // Store t ref for use in DOM-based popup
    const tRef = useRef(t);
    tRef.current = t;

    // Initialize map — runs once
    useEffect(() => {
        const container = mapContainerRef.current;
        if (!container || mapRef.current) return;

        mapRef.current = L.map(container, {
            center: [10, -40],
            zoom: 3,
            scrollWheelZoom: true,
            zoomControl: false,
        });

        L.control.zoom({ position: 'topright' }).addTo(mapRef.current);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 18,
            crossOrigin: 'anonymous'
        }).addTo(mapRef.current);

        borderLayerRef.current = L.featureGroup().addTo(mapRef.current);
        projectsLayerRef.current = L.featureGroup().addTo(mapRef.current);

        const timer = setTimeout(() => {
            if (mapRef.current) mapRef.current.invalidateSize(true);
        }, 200);

        return () => {
            clearTimeout(timer);
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    // Draw country border when selected
    useEffect(() => {
        if (!mapRef.current || !borderLayerRef.current) return;
        borderLayerRef.current.clearLayers();
        if (!activeCountry) return;
        const countryInfo = getCountryByName(activeCountry);
        if (!countryInfo) return;
        fetchCountryGeo(countryInfo.code).then(feature => {
            if (!feature || !borderLayerRef.current) return;
            const geoLayer = L.geoJSON(feature, {
                interactive: false,
                style: {
                    color: '#0d9488',
                    weight: 2.5,
                    fillColor: '#0d9488',
                    fillOpacity: 0.08,
                    dashArray: '',
                },
            });
            borderLayerRef.current.addLayer(geoLayer);
        });
    }, [activeCountry]);

    // Update markers when filter changes
    useEffect(() => {
        if (!mapRef.current || !projectsLayerRef.current) return;

        setTimeout(() => {
            if (mapRef.current) mapRef.current.invalidateSize(true);
        }, 100);

        projectsLayerRef.current.clearLayers();

        filteredCommunities.forEach(community => {
            const cfg = statusConfig[community.status] || statusConfig['activa'];
            const coord: [number, number] = [community.mapCoordinates[1], community.mapCoordinates[0]];

            const baseStyle = {
                radius: 10,
                fillColor: cfg.color,
                color: '#ffffff',
                weight: 2.5,
                opacity: 1,
                fillOpacity: 0.9,
                bubblingMouseEvents: false,
            };

            const circle = L.circleMarker(coord, baseStyle);

            // Use a Leaflet Popup with a clickable button as fallback for the click
            const popupContent = document.createElement('div');
            popupContent.style.fontFamily = 'system-ui, sans-serif';
            popupContent.innerHTML = `
                <strong style="font-size: 14px; color: #1c1917; display: block; margin-bottom: 4px;">${community.name}</strong>
                <div style="font-size: 12px; color: #78716c; margin-bottom: 6px;">${community.countries.join(' / ')}</div>
                <span style="display: inline-block; padding: 2px 8px; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; border-radius: 4px; color: white; background: ${cfg.color}; margin-bottom: 8px;">${cfg.label}</span>
            `;
            const detailBtn = document.createElement('button');
            detailBtn.textContent = tRef.current('atlas.popup.viewDimensions');
            detailBtn.style.cssText = 'display:block;width:100%;margin-top:8px;padding:6px 12px;background:#0d9488;color:white;border:none;border-radius:6px;font-size:12px;font-weight:700;cursor:pointer;';
            detailBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                onSelectRef.current(community);
            });
            popupContent.appendChild(detailBtn);

            circle.bindPopup(popupContent, {
                maxWidth: 260,
                className: 'oice-popup',
            });

            circle.on('mouseover', function (this: any) {
                this.setStyle({ ...baseStyle, radius: 14, weight: 3, fillOpacity: 1 });
                this.bringToFront();
            });
            circle.on('mouseout', function (this: any) {
                this.setStyle(baseStyle);
            });

            projectsLayerRef.current.addLayer(circle);
        });

        // Fly to country or global view
        if (activeCountry) {
            const countryInfo = getCountryByName(activeCountry);
            if (countryInfo) {
                mapRef.current.flyTo(countryInfo.center, countryInfo.zoom, { duration: 1.2 });
            } else if (filteredCommunities.length > 0) {
                const bounds = L.latLngBounds([]);
                filteredCommunities.forEach(c => bounds.extend([c.mapCoordinates[1], c.mapCoordinates[0]]));
                if (bounds.isValid()) mapRef.current.flyToBounds(bounds, { padding: [50, 50], maxZoom: 8, duration: 1.2 });
            }
        } else {
            mapRef.current.flyTo([5, -50], 3, { duration: 1.2 });
        }
    }, [activeCountry, filteredCommunities, statusConfig]);

    const handleCountryClick = (countryName: string) => {
        setActiveCountry(prev => prev === countryName ? null : countryName);
    };

    return (
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm flex flex-col flex-grow overflow-hidden relative z-0">
            {/* Header */}
            <div className="px-6 py-4 border-b border-stone-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                    <h2 className="font-display text-2xl text-stone-800 tracking-display">{t('atlas.title')}</h2>
                    <p className="text-sm text-stone-500 mt-0.5 font-sans">
                        {activeCountry
                            ? <>{filteredCommunities.length} {filteredCommunities.length !== 1 ? (t('atlas.inCountry', { count: filteredCommunities.length, plural: 'ies' }).split(' in')[0]) : (t('atlas.inCountry', { count: filteredCommunities.length, plural: 'y' }).split(' in')[0])} <strong className="text-teal-700">{activeCountry}</strong></>
                            : t('atlas.subtitle', { count: communities.length, countries: countriesWithData.size })
                        }
                    </p>
                </div>
                <div className="flex gap-2">
                    {activeCountry && (
                        <button
                            onClick={() => setActiveCountry(null)}
                            className="text-sm font-semibold text-teal-700 hover:text-teal-900 hover:bg-teal-50 px-4 py-2 rounded-lg transition-colors border border-teal-200"
                        >
                            {t('atlas.backAll')}
                        </button>
                    )}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="text-sm font-semibold text-stone-500 hover:text-stone-700 hover:bg-stone-50 px-3 py-2 rounded-lg transition-colors border border-stone-200 lg:hidden"
                    >
                        {sidebarOpen ? t('atlas.hideSidebar') : t('atlas.showSidebar')}
                    </button>
                </div>
            </div>

            {/* Main content: sidebar + map */}
            <div className="flex flex-grow overflow-hidden">
                {/* Country sidebar */}
                <div className={`${sidebarOpen ? 'w-56 min-w-[14rem]' : 'w-0 min-w-0 overflow-hidden'} transition-all duration-300 border-r border-stone-100 bg-stone-50 overflow-y-auto hidden lg:block`}>
                    {regionGroups.map(region => {
                        const regionCountries = iberoamericanCountries.filter(c => c.region === region);
                        return (
                            <div key={region} className="py-2">
                                <div className="px-4 py-1.5 text-[10px] font-bold text-stone-400 uppercase tracking-widest">{region}</div>
                                {regionCountries.map(country => {
                                    const hasData = countriesWithData.has(country.name);
                                    const isActive = activeCountry === country.name;
                                    const count = communities.filter(c => c.countries.includes(country.name)).length;
                                    return (
                                        <button
                                            key={country.code}
                                            onClick={() => handleCountryClick(country.name)}
                                            className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between transition-colors ${
                                                isActive
                                                    ? 'bg-teal-100 text-teal-800 font-bold'
                                                    : hasData
                                                        ? 'text-stone-700 hover:bg-stone-100 font-medium'
                                                        : 'text-stone-400 cursor-default'
                                            }`}
                                            disabled={!hasData}
                                        >
                                            <span>{country.name}</span>
                                            {count > 0 && (
                                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isActive ? 'bg-teal-700 text-white' : 'bg-stone-200 text-stone-600'}`}>
                                                    {count}
                                                </span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>

                {/* Map */}
                <div className="flex-grow relative" style={{ minHeight: '520px' }}>
                    <div ref={mapContainerRef} className="absolute inset-0" style={{ backgroundColor: '#f5f5f4' }}></div>
                </div>
            </div>

            {/* Community cards panel — visible when a country is selected */}
            {activeCountry && filteredCommunities.length > 0 && (
                <div className="border-t border-stone-200 bg-stone-50 px-6 py-4">
                    <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-3">
                        {t('atlas.communityPanel', { country: activeCountry })}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {filteredCommunities.map(community => {
                            const cfg = statusConfig[community.status] || statusConfig['activa'];
                            return (
                                <button
                                    key={community.id}
                                    onClick={() => onSelectCommunity(community)}
                                    className="text-left bg-white border border-stone-200 rounded-lg p-4 hover:border-teal-400 hover:shadow-md transition-all group cursor-pointer"
                                >
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <h4 className="text-sm font-bold text-stone-800 group-hover:text-teal-700 transition-colors leading-tight">
                                            {community.name}
                                        </h4>
                                        <span
                                            className="flex-shrink-0 px-2 py-0.5 text-[9px] font-bold rounded uppercase tracking-wider text-white"
                                            style={{ backgroundColor: cfg.color }}
                                        >
                                            {cfg.label}
                                        </span>
                                    </div>
                                    <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                                        {community.dimensionTE.technology}
                                    </p>
                                    <div className="mt-2 flex items-center gap-3 text-[10px] text-stone-400">
                                        {community.dimensionGO.membersCount && (
                                            <span>👥 {community.dimensionGO.membersCount.toLocaleString()} {t('atlas.members')}</span>
                                        )}
                                        <span>📍 {community.countries.join(', ')}</span>
                                    </div>
                                    <div className="mt-2 text-[10px] text-teal-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                                        {t('atlas.viewTaxonomy')}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Legend */}
            <div className="px-6 py-3 border-t border-stone-100 flex justify-center flex-wrap gap-5 text-xs font-semibold text-stone-600">
                {Object.entries(statusConfig).map(([key, val]) => (
                    <div key={key} className="flex items-center gap-1.5">
                        <span className={`w-2.5 h-2.5 rounded-full ${val.bg}`}></span>
                        {val.label}
                    </div>
                ))}
            </div>

            <style>{`
                .oice-popup .leaflet-popup-content-wrapper {
                    background: rgba(255,255,255,0.98) !important;
                    backdrop-filter: blur(8px);
                    border-radius: 12px !important;
                    box-shadow: 0 12px 32px rgba(0,0,0,0.15) !important;
                    border: 1px solid #e7e5e4;
                    padding: 0 !important;
                }
                .oice-popup .leaflet-popup-content {
                    margin: 14px 16px !important;
                    font-family: system-ui, sans-serif;
                }
                .oice-popup .leaflet-popup-tip {
                    background: rgba(255,255,255,0.98) !important;
                    border: 1px solid #e7e5e4;
                    box-shadow: none !important;
                }
                .oice-popup .leaflet-popup-close-button {
                    color: #78716c !important;
                    font-size: 18px !important;
                    padding: 6px 8px !important;
                }
                .leaflet-interactive {
                    cursor: pointer !important;
                }
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
};
