import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import Globe from 'react-globe.gl';
import { communitiesData } from '../data/communities';

interface GlobeComponentProps {
    onSelectCountry?: (countryName: string) => void;
}

const GlobeComponent: React.FC<GlobeComponentProps> = ({ onSelectCountry }) => {
    const globeEl = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);
    const [countries, setCountries] = useState<any[]>([]);
    const [hoverD, setHoverD] = useState<any>(null);

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
            .then(res => res.json())
            .then(countriesData => {
                setCountries(countriesData.features);
            });
    }, []);

    const iberoCountries = ['ARG', 'BOL', 'BRA', 'CHL', 'COL', 'CRI', 'CUB', 'DOM', 'ECU', 'SLV', 'GTM', 'HND', 'MEX', 'NIC', 'PAN', 'PRY', 'PER', 'PRT', 'ESP', 'URY', 'VEN'];

    // NASA-style bright sparkle points — one per community
    const communityPoints = useMemo(() =>
        communitiesData.map((c) => ({
            lat: c.mapCoordinates[1],
            lng: c.mapCoordinates[0],
            name: c.name,
            size: 0.6,
            color: '#fffbe6', // warm white glow
        })),
        []
    );

    // Inner bright core — smaller, whiter
    const communityPointsCore = useMemo(() =>
        communitiesData.map((c) => ({
            lat: c.mapCoordinates[1],
            lng: c.mapCoordinates[0],
            name: c.name,
            size: 0.25,
            color: '#ffffff',
        })),
        []
    );

    // Animated pulsing rings emanating from each community — warm glow
    const ringsData = useMemo(() =>
        communitiesData.map((c, i) => ({
            lat: c.mapCoordinates[1],
            lng: c.mapCoordinates[0],
            maxR: 4,
            propagationSpeed: 1.2 + (i % 3) * 0.4,
            repeatPeriod: 1800 + (i % 5) * 400,
            color: 'rgba(255, 251, 230, 0.8)', // warm white ring
        })),
        []
    );

    // Outer glow halo — larger, more transparent
    const glowRings = useMemo(() =>
        communitiesData.map((c, i) => ({
            lat: c.mapCoordinates[1],
            lng: c.mapCoordinates[0],
            maxR: 6,
            propagationSpeed: 0.8 + (i % 4) * 0.3,
            repeatPeriod: 2500 + (i % 3) * 600,
            color: 'rgba(226, 166, 120, 0.45)', // copper-tinted halo
        })),
        []
    );

    useEffect(() => {
        const setGlobeDimensions = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.offsetWidth,
                    height: containerRef.current.offsetHeight
                });
            }
        };

        setGlobeDimensions();
        setTimeout(setGlobeDimensions, 100);
        window.addEventListener('resize', setGlobeDimensions);

        return () => window.removeEventListener('resize', setGlobeDimensions);
    }, []);

    const initializeGlobeControls = useCallback(() => {
        if (!globeEl.current) return;
        const controls = globeEl.current.controls();
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.35;
        controls.enableZoom = true;
        controls.minDistance = 150;
        controls.maxDistance = 500;
    }, []);

    // Dark countries by default, teal only on hover for Ibero countries
    const getPolygonColor = useCallback((feat: any) => {
        const isHovered = hoverD === feat;
        const isIbero = iberoCountries.includes(feat.properties.ADM0_A3);

        if (isHovered && isIbero) return 'rgba(13, 148, 136, 0.55)';   // teal reveal on hover
        if (isHovered) return 'rgba(120, 113, 108, 0.25)';             // subtle stone for others
        if (isIbero) return 'rgba(30, 30, 28, 0.55)';                  // dark — NASA night look
        return 'rgba(40, 40, 38, 0.25)';                               // dark muted for rest
    }, [hoverD]);

    const getSideColor = useCallback((feat: any) => {
        const isHovered = hoverD === feat;
        const isIbero = iberoCountries.includes(feat.properties.ADM0_A3);
        if (isHovered && isIbero) return 'rgba(13, 148, 136, 0.3)';
        return 'rgba(50, 50, 48, 0.3)';
    }, [hoverD]);

    const getStrokeColor = useCallback((feat: any) => {
        const isHovered = hoverD === feat;
        const isIbero = iberoCountries.includes(feat.properties.ADM0_A3);
        if (isHovered && isIbero) return 'rgba(13, 148, 136, 0.8)';
        if (isHovered) return 'rgba(180, 180, 175, 0.5)';
        return 'rgba(80, 80, 75, 0.35)';                              // dim border lines
    }, [hoverD]);

    // Combine both ring sets
    const allRings = useMemo(() => [...ringsData, ...glowRings], [ringsData, glowRings]);

    return (
      <div ref={containerRef} className="absolute inset-0 z-0 bg-transparent flex items-center justify-end cursor-move"
           style={{ paddingLeft: '35%' }}>
        {dimensions && (
            <Globe
                ref={globeEl}
                width={dimensions.width}
                height={dimensions.height}

                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                backgroundColor="rgba(0,0,0,0)"
                atmosphereColor="rgba(120, 160, 180, 0.25)"
                atmosphereAltitude={0.18}

                // Country polygons — dark by default, teal on hover
                polygonsData={countries}
                polygonAltitude={d => d === hoverD ? 0.025 : 0.008}
                polygonCapColor={d => getPolygonColor(d)}
                polygonSideColor={d => getSideColor(d)}
                polygonStrokeColor={d => getStrokeColor(d)}
                polygonLabel={({ properties: d }: any) => `
                    <div style="background: rgba(28,25,23,0.92); color: #fffbe6; padding: 6px 12px; border-radius: 6px; box-shadow: 0 4px 16px rgba(0,0,0,0.4); font-family: system-ui, sans-serif; font-size: 12px; font-weight: 700; border: 1px solid rgba(255,251,230,0.15); backdrop-filter: blur(8px);">
                        ${d.ADMIN}
                    </div>
                `}
                onPolygonHover={setHoverD}
                onPolygonClick={({ properties: d }: any) => {
                    if (onSelectCountry) onSelectCountry(d.ADMIN);
                }}

                // Bright city-light points at community locations
                pointsData={communityPoints}
                pointAltitude={0.018}
                pointRadius="size"
                pointColor="color"
                pointsMerge={false}
                pointLabel="name"

                // Animated pulsing rings — city light ripples
                ringsData={allRings}
                ringColor="color"
                ringMaxRadius="maxR"
                ringPropagationSpeed="propagationSpeed"
                ringRepeatPeriod="repeatPeriod"
                ringAltitude={0.015}

                onGlobeReady={() => {
                    initializeGlobeControls();
                    if (globeEl.current) {
                        globeEl.current.pointOfView({ lat: 5, lng: -55, altitude: 2.2 }, 1000);
                    }
                }}
            />
        )}
      </div>
    );
};

export default GlobeComponent;
