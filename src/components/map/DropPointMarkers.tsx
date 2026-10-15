import L from 'leaflet';
import { useEffect, useReducer } from 'react';
import { CircleMarker, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { districtAt } from '../../data/districts';
import { dropPoints } from '../../data/dropPoints';
import {
    isComingSoonPreview,
    isPointActive,
    subscribeComingSoonPreview,
    subscribeUnlockAll
} from '../../hooks/usePointUnlock';
import { useLanguage } from '../../i18n/LanguageContext';
import type { PointSiteConfig } from '../../points/types';

const dropIconCache = new Map<string, L.DivIcon>();

function getDropIcon(color: string, hollow: boolean, dotColor: string): L.DivIcon {
    const cacheKey = `${color}:${hollow}:${dotColor}`;
    const cachedIcon = dropIconCache.get(cacheKey);
    if (cachedIcon) {
        return cachedIcon;
    }

    const icon = L.divIcon({
        className: hollow ? 'drop-point-icon drop-point-icon--hollow' : 'drop-point-icon',
        html: hollow
            ? `<svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M12.5 0C5.596 0 0 5.596 0 12.5C0 21.667 12.5 41 12.5 41S25 21.667 25 12.5C25 5.596 19.404 0 12.5 0Z" fill="#fff" fill-opacity="0.7" stroke="${color}" stroke-width="2" stroke-dasharray="5 4" />
            <circle cx="12.5" cy="12.5" r="4" fill="${dotColor}" />
        </svg>`
            : `<svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M12.5 0C5.596 0 0 5.596 0 12.5C0 21.667 12.5 41 12.5 41S25 21.667 25 12.5C25 5.596 19.404 0 12.5 0Z" fill="${color}" stroke="#fff" stroke-width="1.5" />
            <circle cx="12.5" cy="12.5" r="4" fill="#fff" />
        </svg>`,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
    });

    dropIconCache.set(cacheKey, icon);
    return icon;
}

interface MarkerPopupProps {
    title: string;
    hasLink: boolean;
    url: string;
    caption?: string;
}

function MarkerPopup({ title, hasLink, url, caption }: MarkerPopupProps) {
    const { t } = useLanguage();
    return (
        <Popup>
            <b>{title}</b>
            {caption && (
                <>
                    <br />
                    <i>{caption}</i>
                </>
            )}
            {hasLink && (
                <>
                    <br />
                    <Link to={`/${url}`}>{t('map_link_text')}</Link>
                </>
            )}
        </Popup>
    );
}

function DropPointMarker({ point }: { point: PointSiteConfig }) {
    const { l, t } = useLanguage();
    const comingSoon = point.marker.comingSoon === true;
    const active = isPointActive(point.id);
    const color = point.marker.color ?? '#000000';
    const districtColor = districtAt(point.coords)?.color ?? color;

    if (comingSoon) {
        const preview = isComingSoonPreview();
        return (
            <Marker position={point.coords} icon={getDropIcon(color, true, districtColor)}>
                <MarkerPopup
                    title={l(point.marker.title)}
                    hasLink={preview}
                    url={point.path}
                    caption={t('map_coming_soon')}
                />
            </Marker>
        );
    }

    const title = active ? l(point.marker.title) : l(point.marker.lockedTitle);
    const hasLink = active;

    if (active) {
        return (
            <CircleMarker
                center={point.coords}
                radius={8}
                pathOptions={{
                    fillColor: color,
                    color: '#fff',
                    weight: 2,
                    opacity: 1,
                    fillOpacity: 0.8
                }}
            >
                <MarkerPopup title={title} hasLink={hasLink} url={point.path} />
            </CircleMarker>
        );
    }

    return (
        <Marker position={point.coords} icon={getDropIcon(color, false, color)}>
            <MarkerPopup title={title} hasLink={hasLink} url={point.path} />
        </Marker>
    );
}

export function DropPointMarkers() {
    const [, forceRender] = useReducer((x: number) => x + 1, 0);

    useEffect(() => subscribeUnlockAll(forceRender), []);
    useEffect(() => subscribeComingSoonPreview(forceRender), []);

    return (
        <>
            {dropPoints.map((point) => (
                <DropPointMarker key={point.id} point={point} />
            ))}
        </>
    );
}