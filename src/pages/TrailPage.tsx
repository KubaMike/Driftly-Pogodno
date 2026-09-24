import { Link, Navigate, useParams } from 'react-router-dom';
import { MapView } from '../components/map/MapView';
import { usePageTitle } from '../hooks/usePageTitle';
import { usePullSheet } from '../hooks/usePullSheet';
import { useLanguage } from '../i18n/LanguageContext';
import { getPointSiteById } from '../points/registry';
import type { PointSiteConfig } from '../points/types';
import { getTrailById } from '../trails/registry';
import type { TrailConfig } from '../trails/types';

export function TrailPage() {
    const { trailId } = useParams<{ trailId: string }>();
    const trail = trailId ? getTrailById(trailId) : undefined;

    if (!trail) {
        return <Navigate to="/" replace />;
    }

    return <TrailContent trail={trail} />;
}

function TrailContent({ trail }: { trail: TrailConfig }) {
    const { t, l } = useLanguage();
    const places = trail.places.map(getPointSiteById).filter(isPointSite);
    const { open, dragging, sheetStyle, handleProps } = usePullSheet();

    usePageTitle(`${l(trail.title)} - Driftly-Pogodno`);

    return (
        <main className="wrap trail-page">
            <div className="trail-map">
                <MapView trailId={trail.id} waypoints={trail.waypoints} />
            </div>
            <aside
                className={`trail-sidebar${open ? ' open' : ''}${dragging ? ' dragging' : ''}`}
                style={sheetStyle}
            >
                <div className="sheet-handle" {...handleProps}>
                    <span className="sheet-grip" />
                </div>
                <Link to="/" className="trail-back">
                    ← {t('trail_back')}
                </Link>
                <h2>{l(trail.title)}</h2>
                <p className="trail-desc">{l(trail.description)}</p>
                {places.length > 0 && (
                    <div className="trail-places">
                        <h3>{t('trail_places')}</h3>
                        <ul>
                            {places.map((point) => (
                                <li key={point.id}>
                                    <Link to={`/${point.path}`}>
                                        {l(point.marker.title)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </aside>
        </main>
    );
}

function isPointSite(point: PointSiteConfig | undefined): point is PointSiteConfig {
    return point !== undefined;
}