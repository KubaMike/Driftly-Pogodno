import { BASENY_PATH } from '../hooks/usePointUnlock';
import type { DropPoint } from '../types';

export const MAP_CENTER: [number, number] = [53.447, 14.536];
export const MAP_ZOOM = 13;

export const dropPoints: DropPoint[] = [
    { id: 0, coords: [53.435, 14.52], titleKey: 'map_point_0_title', url: BASENY_PATH }
    // { id: 1, coords: [53.45, 14.54], titleKey: 'map_point_1_title', url: 'index.html' },
    // { id: 2, coords: [53.44, 14.53], titleKey: 'map_point_2_title', url: 'gallery.html' }
];