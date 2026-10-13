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
    const places = trail.places.map(getPointSiteById).filter(isPointSite);
    const [showPlaces, setShowPlaces] = useState(false);
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
            <aside className={`trail-sheet${showPlaces ? ' places-active' : ''}`} style={sheetStyle}>
                <div className="sheet-handle" {...handleProps}>
                    <span className="sheet-grip" />
                </div>

                <section className={`trail-panel trail-panel-info${showPlaces ? ' collapsed' : ''}`}>
                    <div className="trail-panel-head">
                        <Link to="/" className="trail-back" aria-label={t('trail_back')}>
                            ←
                        </Link>
                        <button
                            type="button"
                            className="trail-panel-toggle"
                            aria-expanded={!showPlaces}
                            onClick={() => setShowPlaces(false)}
                        >
                            <h2>{l(trail.title)}</h2>
                        </button>
                    </div>
                    <div className="trail-panel-body">
                        <p className="trail-desc">{l(trail.longDescription)}</p>
                    </div>
                </section>

                {places.length > 0 && (
                    <section className={`trail-panel trail-panel-places${showPlaces ? ' open' : ''}`}>
                        <button
                            type="button"
                            className="places-head"
                            aria-expanded={showPlaces}
                            onClick={() => setShowPlaces(true)}
                        >
                            <span className="places-title">{t('trail_places')}</span>
                            <span className="trail-panel-chevron" />
                        </button>
                        <div className="trail-panel-body">
                            <div className="trail-places">
                                <ul>
                                    {places.map((point) => {
                                        const active = isPointActive(point.id);

                                        return (
                                            <li key={point.id}>
                                                {active ? (
                                                    <Link to={`/${point.path}`}>
                                                        {l(point.marker.title)}
                                                    </Link>
                                                ) : (
                                                    <span
                                                        className="trail-place-locked"
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