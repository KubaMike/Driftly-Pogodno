import L from 'leaflet';
import { CircleMarker, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { dropPoints } from '../../data/dropPoints';
import { useLanguage } from '../../i18n/LanguageContext';
import type { DropPoint } from '../../types';
import { isPointActive } from '../../hooks/usePointUnlock';

const defaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

interface MarkerPopupProps {
    title: string;
    hasLink: boolean;
    url: string;
}

function MarkerPopup({ title, hasLink, url }: MarkerPopupProps) {
    const { t } = useLanguage();
    return (
        <Popup>
            <b>{title}</b>
            {hasLink && (
                <>
                    <br />
                    <Link to={`/${url}`}>{t('map_link_text')}</Link>
                </>
            )}
        </Popup>
    );
}

function DropPointMarker({ point }: { point: DropPoint }) {
    const { t } = useLanguage();
    const isPointZero = point.id === 0;
    const active = isPointActive(0);
    const showUnlocked = isPointZero && active;
    const title = isPointZero && !active ? t('map_point_0_unlock') : t(point.titleKey);
    const hasLink = !(isPointZero && !active);
    const url = point.url;

    if (showUnlocked) {
        return (
            <CircleMarker
                center={point.coords}
                radius={8}
                pathOptions={{
                    fillColor: '#32cd32',
                    color: '#fff',
                    weight: 2,
                    opacity: 1,
                    fillOpacity: 0.8
                }}
            >
                <MarkerPopup title={title} hasLink={hasLink} url={url} />
            </CircleMarker>
        );
    }

    return (
        <Marker position={point.coords} icon={defaultIcon}>
            <MarkerPopup title={title} hasLink={hasLink} url={url} />
        </Marker>
    );
}

export function DropPointMarkers() {
    return (
        <>
            {dropPoints.map((point) => (
                <DropPointMarker key={point.id} point={point} />
            ))}
        </>
    );
}