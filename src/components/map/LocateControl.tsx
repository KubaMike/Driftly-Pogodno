import L from 'leaflet';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

export function LocateControl() {
    const map = useMap();

    useEffect(() => {
        let watchId: number | null = null;
        let userMarker: L.CircleMarker | null = null;
        let control: L.Control | null = null;

        const clearWatchAndMarker = () => {
            if (watchId !== null) {
                navigator.geolocation.clearWatch(watchId);
                watchId = null;
            }
            if (userMarker) {
                map.removeLayer(userMarker);
                userMarker = null;
            }
        };

        const onButtonClick = (e: Event) => {
            e.preventDefault();

            if (watchId !== null) {
                return;
            }

            if ('geolocation' in navigator) {
                watchId = navigator.geolocation.watchPosition(
                    (position) => {
                        const lat = position.coords.latitude;
                        const lng = position.coords.longitude;

                        if (userMarker) {
                            userMarker.setLatLng([lat, lng]);
                        } else {
                            userMarker = L.circleMarker([lat, lng], {
                                radius: 8,
                                fillColor: '#3388ff',
                                color: '#fff',
                                weight: 2,
                                opacity: 1,
                                fillOpacity: 0.8
                            }).addTo(map);
                            map.setView([lat, lng], 15);
                        }
                    },
                    (error) => {
                        console.error('Error getting location:', error);
                        alert('Could not get your location.');
                        clearWatchAndMarker();
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 5000,
                        maximumAge: 0
                    }
                );
            } else {
                alert('Geolocation is not supported by your browser.');
            }
        };

        const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
        const button = L.DomUtil.create('a', 'leaflet-bar-part', container);
        button.href = '#';
        button.title = 'Locate Me';
        button.innerHTML = '<i class="fas fa-crosshairs"></i>';

        L.DomEvent.disableClickPropagation(container);
        L.DomEvent.on(button, 'click', onButtonClick);

        const LocateControlClass = L.Control.extend({
            options: {
                position: 'bottomright'
            },
            onAdd: () => container,
            onRemove: () => {
                L.DomEvent.off(button, 'click', onButtonClick);
                clearWatchAndMarker();
            }
        });

        control = new LocateControlClass({ position: 'bottomright' });
        control.addTo(map);

        return () => {
            if (control) {
                control.remove();
                control = null;
            }
        };
    }, [map]);

    return null;
}