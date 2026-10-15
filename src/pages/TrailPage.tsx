import { useEffect, useReducer, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { MapView } from '../components/map/MapView';
import { isPointActive, subscribeUnlockAll } from '../hooks/usePointUnlock';
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
    const points = trail.points.map(getPointSiteById).filter(isPointSite);
    const [showPoints, setShowPoints] = useState(false);
    const [, forceRender] = useReducer((value: number) => value + 1, 0);
    const { open, dragging, sheetStyle, handleProps } = usePullSheet({ initiallyOpen: true });

    useEffect(() => subscribeUnlockAll(forceRender), []);

    usePageTitle(`${l(trail.title)} - Driftly-Pogodno`);

    return (
        <main
            className={`wrap trail-page${open ? ' trail-panel-open' : ''}${dragging ? ' trail-panel-dragging' : ''}`}
        >
            <div className="trail-map">
                <MapView trailId={trail.id} waypoints={trail.waypoints} />
            </div>
            <aside className={`trail-sheet${showPoints ? ' points-active' : ''}`} style={sheetStyle}>
                <div className="sheet-handle" {...handleProps}>
                    <span className="sheet-grip" />
                </div>

                <section className={`trail-panel trail-panel-info${showPoints ? ' collapsed' : ''}`}>
                    <div className="trail-panel-head">
                        <Link to="/" className="trail-back" aria-label={t('trail_back')}>
                            ←
                        </Link>
                        <button
                            type="button"
                            className="trail-panel-toggle"
                            aria-expanded={!showPoints}
                            onClick={() => setShowPoints(false)}
                        >
                            <h2>{l(trail.title)}</h2>
                        </button>
                    </div>
                    <div className="trail-panel-body">
                        <p className="trail-desc">{l(trail.longDescription)}</p>
                    </div>
                </section>

                {points.length > 0 && (
                    <section className={`trail-panel trail-panel-points${showPoints ? ' open' : ''}`}>
                        <button
                            type="button"
                            className="points-head"
                            aria-expanded={showPoints}
                            onClick={() => setShowPoints(true)}
                        >
                            <span className="points-title">{t('trail_points')}</span>
                            <span className="trail-panel-chevron" />
                        </button>
                        <div className="trail-panel-body">
                            <div className="trail-points">
                                <ul>
                                    {points.map((point) => {
                                        const active = isPointActive(point.id);

                                        return (
                                            <li key={point.id}>
                                                {active ? (
                                                    <Link to={`/${point.path}`}>
                                                        {l(point.marker.title)}
                                                    </Link>
                                                ) : (
                                                    <span
                                                        className="trail-point-locked"
                                                        aria-disabled="true"
                                                        title={l(point.marker.lockedTitle)}
                                                    >
                                                        {l(point.marker.title)}
                                                    </span>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    </section>
                )}
            </aside>
        </main>
    );
}

function isPointSite(point: PointSiteConfig | undefined): point is PointSiteConfig {
    return point !== undefined;
}