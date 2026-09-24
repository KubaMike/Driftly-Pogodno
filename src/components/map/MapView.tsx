import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import type { CSSProperties } from 'react';
import { MAP_CENTER, MAP_ZOOM } from '../../data/dropPoints';
import { DropPointMarkers } from './DropPointMarkers';
import { LocateControl } from './LocateControl';

const mapStyle: CSSProperties = {
    height: '100%',
    width: '100%'
};

export function MapView() {
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
            <DropPointMarkers />
            <LocateControl />
        </MapContainer>
    );
}