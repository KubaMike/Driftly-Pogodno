import type { TrailConfig } from './types';

export const trails: TrailConfig[] = [
    {
        id: 'test-trail',
        title: {
            pl: 'Szlak testowy Pogodna',
            de: 'Testweg Pogodno',
            en: 'Test trail of Pogodno',
            ua: 'Тестова стежка Погодно'
        },
        description: {
            pl: 'Przykładowy szlak prowadzący od stadionu Pogoni do dawnych basenów kąpieliska MKS Pogoń.',
            de: 'Ein Beispielweg vom Pogoń-Stadion zu den ehemaligen Pools des Freibads MKS Pogoń.',
            en: 'A sample trail leading from the Pogoń stadium to the former MKS Pogoń pool area.',
            ua: 'Приклад стежки від стадіону Погоні до колишніх басейнів MKS Pogoń.'
        },
        waypoints: [
            [53.447, 14.531],
            [53.443, 14.526],
            [53.439, 14.523],
            [53.435, 14.52],
            [53.439, 14.517],
            [53.443, 14.519],
            [53.447, 14.531]
        ],
        pathOptions: {
            color: '#008000',
            weight: 4,
            opacity: 0.9
        },
        places: [0]
    }
];

export function getTrailById(id: string): TrailConfig | undefined {
    return trails.find((trail) => trail.id === id);
}