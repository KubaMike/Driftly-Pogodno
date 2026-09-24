import { MapView } from '../components/map/MapView';
import { usePageTitle } from '../hooks/usePageTitle';

export function MapPage() {
    usePageTitle('Driftly-Pogodno - Mapa');

    return (
        <main className="wrap map-page">
            <MapView />
        </main>
    );
}