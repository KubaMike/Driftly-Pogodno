import type { PointSiteConfig } from './types';
import { basenyPogoni } from './BasenyPogoni';

export const pointSites: PointSiteConfig[] = [basenyPogoni];

export function getPointSiteByPath(path: string): PointSiteConfig | undefined {
    return pointSites.find((point) => point.path === path);
}

export function getPointSiteById(id: number): PointSiteConfig | undefined {
    return pointSites.find((point) => point.id === id);
}