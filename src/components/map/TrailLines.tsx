import { Polyline } from 'react-leaflet';
import { getTrailById } from '../../trails/registry';

interface TrailLinesProps {
    trailId: string;
}

export function TrailLines({ trailId }: TrailLinesProps) {
    const trail = getTrailById(trailId);

    if (!trail) {
        return null;
    }

    return (
        <Polyline
            positions={trail.waypoints}
            pathOptions={trail.pathOptions}
        />
    );
}