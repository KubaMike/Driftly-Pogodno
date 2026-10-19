import type { PointSiteConfig } from './types';
import { wieniawskiegoZeitler } from './WieniawskiegoZeitler';

/**
 * Żółty Dom przy Wieniawskiego to budynek przy ul. Wieniawskiego 28 —
 * powszechnie znany też jako Willa Zeitlera. Ten wpis zachowuje historyczne
 * id i ścieżkę QR (c3bef7e932.html), żeby istniejące kody QR nadal działały,
 * a serwuje pełną treść Willi Zeitlera. Rejestruj tylko ten wpis — nie dodawaj
 * `wieniawskiegoZeitler` do registry, aby nie powielać markera na mapie.
 */
export const wieniawskiegoZoltyDom: PointSiteConfig = {
    ...wieniawskiegoZeitler,
    id: 43,
    path: 'c3bef7e932.html',
    coords: [53.4392552, 14.5105634]
};
