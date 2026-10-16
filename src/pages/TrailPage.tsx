import { useEffect, useLayoutEffect, useReducer, useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { MapView } from '../components/map/MapView';
import { isComingSoonPreview, isPointActive, subscribeComingSoonPreview, subscribeUnlockAll } from '../hooks/usePointUnlock';
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
        return <Navigate to="/trails" replace />;
    }

    return <TrailContent trail={trail} />;
}

const PANEL_GAP_PX = 20;
const PANEL_TOP_PX = 86;
const PANEL_BOTTOM_PX = 20;

function TrailContent({ trail }: { trail: TrailConfig }) {
    const { t, l } = useLanguage();
    const points = trail.points.map(getPointSiteById).filter(isPointSite);
    const [showPoints, setShowPoints] = useState(false);
    const [panelsFit, setPanelsFit] = useState(false);
    const [, forceRender] = useReducer((value: number) => value + 1, 0);
    const { isMobile, open, dragging, sheetStyle, handleProps } = usePullSheet({ initiallyOpen: true });
    const infoPanelRef = useRef<HTMLElement>(null);
    const infoBodyRef = useRef<HTMLDivElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const pointsPanelRef = useRef<HTMLElement>(null);
    const pointsBodyRef = useRef<HTMLDivElement>(null);
    const pointsContentRef = useRef<HTMLDivElement>(null);

    useEffect(() => subscribeUnlockAll(forceRender), []);
    useEffect(() => subscribeComingSoonPreview(forceRender), []);

    useLayoutEffect(() => {
        if (isMobile || points.length === 0) {
            setPanelsFit(false);
            return;
        }

        const measure = () => {
            const infoPanel = infoPanelRef.current;
            const infoBody = infoBodyRef.current;
            const pointsPanel = pointsPanelRef.current;
            const pointsBody = pointsBodyRef.current;
            if (!infoPanel || !infoBody || !pointsPanel || !pointsBody) {
                return;
            }

            const previousInfo = infoBody.style.maxHeight;
            const previousPoints = pointsBody.style.maxHeight;
            infoBody.style.maxHeight = 'none';
            pointsBody.style.maxHeight = 'none';
            const infoHeight = infoPanel.scrollHeight;
            const pointsHeight = pointsPanel.scrollHeight;
            infoBody.style.maxHeight = previousInfo;
            pointsBody.style.maxHeight = previousPoints;

            const available = window.innerHeight - PANEL_TOP_PX - PANEL_BOTTOM_PX;
            setPanelsFit(infoHeight + PANEL_GAP_PX + pointsHeight <= available);
        };

        measure();
        window.addEventListener('resize', measure);
        const observer = new ResizeObserver(measure);
        if (descRef.current) {
            observer.observe(descRef.current);
        }
        if (pointsContentRef.current) {
            observer.observe(pointsContentRef.current);
        }
        return () => {
            window.removeEventListener('resize', measure);
            observer.disconnect();
        };
    }, [isMobile, points.length, trail.id]);

    usePageTitle(`${l(trail.title)} - Driftly-Pogodno`);

    const infoExpanded = panelsFit || !showPoints;
    const pointsExpanded = panelsFit || showPoints;

    return (
        <main
            className={`wrap trail-page${open ? ' trail-panel-open' : ''}${dragging ? ' trail-panel-dragging' : ''}${panelsFit ? ' fit-mode' : ''}`}
        >
            <div className="trail-map">
                <MapView trailId={trail.id} waypoints={trail.waypoints} />
            </div>
            <aside className="trail-sheet" style={sheetStyle}>
                <div className="sheet-handle" {...handleProps}>
                    <span className="sheet-grip" />
                </div>

                <section
                    ref={infoPanelRef}
                    className={`trail-panel trail-panel-info${infoExpanded ? '' : ' collapsed'}`}
                >
                    <div className="trail-panel-head">
                        <Link to="/trails" className="trail-back" aria-label={t('trail_back')}>
                            ←
                        </Link>
                        <button
                            type="button"
                            className="trail-panel-toggle"
                            aria-expanded={infoExpanded}
                            disabled={panelsFit}
                            onClick={() => setShowPoints(false)}
                        >
                            <h2>{l(trail.title)}</h2>
                        </button>
                    </div>
                    <div ref={infoBodyRef} className="trail-panel-body">
                        <p ref={descRef} className="trail-desc">
                            {l(trail.longDescription)}
                        </p>
                    </div>
                </section>

                {points.length > 0 && (
                    <section
                        ref={pointsPanelRef}
                        className={`trail-panel trail-panel-points${pointsExpanded ? ' open' : ''}`}
                    >
                        <button
                            type="button"
                            className="points-head"
                            aria-expanded={pointsExpanded}
                            disabled={panelsFit}
                            onClick={() => setShowPoints(true)}
                        >
                            <span className="points-title">{t('trail_points')}</span>
                            <span className="trail-panel-chevron" />
                        </button>
                        <div ref={pointsBodyRef} className="trail-panel-body">
                            <div ref={pointsContentRef} className="trail-points">
                                <ul>
                                    {points.map((point) => {
                                        const active = isPointActive(point.id);
                                        const comingSoon = point.marker.comingSoon === true;
                                        const comingSoonContent = (
                                            <>
                                                <span className="trail-point-title">{l(point.marker.title)}</span>
                                                <span className="trail-point-badge">{t('map_coming_soon')}</span>
                                            </>
                                        );

                                        return (
                                            <li key={point.id}>
                                                {comingSoon ? (
                                                    isComingSoonPreview() ? (
                                                        <Link to={`/${point.path}`} className="trail-point-coming-soon">
                                                            {comingSoonContent}
                                                        </Link>
                                                    ) : (
                                                        <span
                                                            className="trail-point-locked trail-point-coming-soon"
                                                            aria-disabled="true"
                                                            title={l(point.marker.title)}
                                                        >
                                                            {comingSoonContent}
                                                        </span>
                                                    )
                                                ) : active ? (
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