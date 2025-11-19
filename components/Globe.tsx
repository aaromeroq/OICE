import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import Globe from 'react-globe.gl';
import { projects } from '../data/projects';

const GlobeComponent: React.FC = () => {
    const globeEl = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);

    useEffect(() => {
        const setGlobeDimensions = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.offsetWidth,
                    height: containerRef.current.offsetHeight
                });
            }
        };

        // Set dimensions on mount and on window resize
        setGlobeDimensions();
        window.addEventListener('resize', setGlobeDimensions);

        // A small timeout helps ensure layout is stable before getting dimensions
        const timeoutId = setTimeout(setGlobeDimensions, 100);

        return () => {
            window.removeEventListener('resize', setGlobeDimensions);
            clearTimeout(timeoutId);
        };
    }, []);

    const initializeGlobeControls = useCallback(() => {
        if (!globeEl.current) return;

        const controls = globeEl.current.controls();
        controls.autoRotate = true;
        controls.autoRotateSpeed = 1.2; // noticeable but calm rotation
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.enableRotate = false;
    }, []);
    
    const arcsData = useMemo(() => projects.map(project => ({
        startLat: project.mapCoordinates[0][0],
        startLng: project.mapCoordinates[0][1],
        endLat: project.mapCoordinates[project.mapCoordinates.length - 1][0],
        endLng: project.mapCoordinates[project.mapCoordinates.length - 1][1],
        color: project.technology === 'HVDC' ? 'rgba(34, 211, 238, 0.8)' : 'rgba(245, 158, 11, 0.8)',
        name: project.name,
    })), []);


    return (
      <div ref={containerRef} className="absolute inset-0 z-0">
        {dimensions && (
            <Globe
                ref={globeEl}
                width={dimensions.width}
                height={dimensions.height}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                
                arcsData={arcsData}
                arcColor={'color'}
                arcDashLength={0.4}
                arcDashGap={0.8}
                arcDashAnimateTime={2000}
                arcStroke={0.5}
                arcAltitudeAutoScale={0.4}
                
                atmosphereColor="rgba(135, 206, 250, 0.3)"
                atmosphereAltitude={0.15}
                
                onGlobeReady={() => {
                    initializeGlobeControls();
                    if (globeEl.current) {
                        globeEl.current.pointOfView({ lat: 20, lng: -40, altitude: 2.5 }, 1000);
                    }
                }}
            />
        )}
      </div>
    );
};

export default GlobeComponent;
