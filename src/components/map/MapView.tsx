import { MapContainer, TileLayer, ZoomControl, useMap } from 'react-leaflet';
import type { CSSProperties } from 'react';
import { useEffect } from 'react';
import L from 'leaflet';
import { MAP_CENTER, MAP_ZOOM } from '../../data/dropPoints';
import { DropPointMarkers } from './DropPointMarkers';
import { LocateControl } from './LocateControl';
import { TrailLines } from './TrailLines';

const mapStyle: CSSProperties = {
    height: '100%',
    width: '100%'
};

interface MapViewProps {
    trailId?: string;
    waypoints?: [number, number][];
}

function FitBounds({ waypoints }: { waypoints: [number, number][] }) {
    const map = useMap();

    useEffect(() => {
        if (waypoints.length === 0) {
            return;
        }
        map.fitBounds(L.latLngBounds(waypoints), { padding: [48, 48] });
    }, [map, waypoints]);

    return null;
}

export function MapView({ trailId, waypoints = [] }: MapViewProps) {
    return (
        <MapContainer
            id="map"
            center={MAP_CENTER}
            zoom={MAP_ZOOM}
            zoomControl={false}
            style={mapStyle}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ZoomControl position="bottomright" />
            {trailId && <TrailLines trailId={trailId} />}
            {waypoints.length > 0 && <FitBounds waypoints={waypoints} />}
            <DropPointMarkers />
            <LocateControl />
        </MapContainer>
    );
}