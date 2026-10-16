import { useEffect, useRef } from 'react';
import { Polyline } from 'react-leaflet';
import type { Polyline as LeafletPolyline } from 'leaflet';
import { trails } from '../../trails/registry';

interface AllTrailLinesProps {
    highlightTrailId?: string | null;
}

export function AllTrailLines({ highlightTrailId = null }: AllTrailLinesProps) {
    const layersRef = useRef(new Map<string, LeafletPolyline>());

    // react-leaflet applies `pathOptions` through Leaflet's setStyle, which does
    // not (re)apply `className` — so we toggle the highlight class on the SVG
    // path element imperatively to drive the CSS animation.
    useEffect(() => {
        layersRef.current.forEach((layer, id) => {
            const element = layer.getElement();
            if (!element) {
                return;
            }
            element.classList.toggle('trail-line--highlight', id === highlightTrailId);
        });
    }, [highlightTrailId]);

    return (
        <>
            {trails.map((trail) => (
                <Polyline
                    key={trail.id}
                    ref={(layer) => {
                        if (layer) {
                            layersRef.current.set(trail.id, layer);
                        } else {
                            layersRef.current.delete(trail.id);
                        }
                    }}
                    positions={trail.waypoints}
                    pathOptions={trail.pathOptions}
                />
            ))}
        </>
    );
}
