import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapView } from '../components/map/MapView';
import { usePageTitle } from '../hooks/usePageTitle';
import { usePullSheet } from '../hooks/usePullSheet';
import { useLanguage } from '../i18n/LanguageContext';
import { trails } from '../trails/registry';

export function TrailsPage() {
    const { t, l } = useLanguage();
    const [highlightId, setHighlightId] = useState<string | null>(null);
    const { open, dragging, sheetStyle, handleProps } = usePullSheet({ initiallyOpen: true });

    const allWaypoints = useMemo(
        () => trails.flatMap((trail) => trail.waypoints),
        []
    );

    usePageTitle(`${t('tab_trails')} - Driftly-Pogodno`);

    return (
        <main className="wrap map-page trails-page">
            <MapView
                showAllTrails
                highlightTrailId={highlightId}
                waypoints={allWaypoints}
            />
            <aside
                className={`trails-sheet${open ? ' open' : ''}${dragging ? ' dragging' : ''}`}
                style={sheetStyle}
            >
                <div className="sheet-handle" {...handleProps}>
                    <span className="sheet-grip" />
                </div>
                <aside className="trails-menu">
                    <div className="trails-menu-head">
                        <span className="trails-menu-title">{t('trails_legend_title')}</span>
                    </div>
                    <div className="trails-menu-body">
                        <p className="trails-menu-info">{t('trails_legend_info')}</p>
                        <ul className="trails-menu-list">
                            {trails.map((trail) => (
                                <li key={trail.id}>
                                    <Link
                                        to={`/trail/${trail.id}`}
                                        className="trail-legend-row"
                                        onMouseEnter={() => setHighlightId(trail.id)}
                                        onMouseLeave={() => setHighlightId(null)}
                                        onFocus={() => setHighlightId(trail.id)}
                                        onBlur={() => setHighlightId(null)}
                                    >
                                        <span
                                            className="trail-swatch"
                                            style={{ background: trail.pathOptions.color }}
                                            aria-hidden="true"
                                        />
                                        <span className="trail-legend-text">
                                            <span className="trail-legend-name">{l(trail.title)}</span>
                                            <span className="trail-legend-desc">
                                                {l(trail.description)}
                                            </span>
                                        </span>
                                        <span
                                            className="trail-legend-count"
                                            title={t('trail_points')}
                                        >
                                            {trail.points.length}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>
            </aside>
        </main>
    );
}
