import type { LocalizedText } from '../points/types';

export interface TrailConfig {
    id: string;
    title: LocalizedText;
    description: LocalizedText;
    longDescription: LocalizedText;
    waypoints: [number, number][];
    pathOptions: {
        color: string;
        weight: number;
        opacity: number;
        dashArray?: string;
    };
    places: number[];
    requiredPointIds?: number[];
}