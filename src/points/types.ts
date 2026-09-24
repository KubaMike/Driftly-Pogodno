import type { Lang } from '../types';

export type LocalizedText = Record<Lang, string>;

export interface PointHero {
    image: string;
    title: LocalizedText;
    intro: LocalizedText;
}

export interface PointSection {
    heading: LocalizedText;
    body: LocalizedText;
}

export interface PointGalleryItem {
    src: string;
    caption: LocalizedText;
}

export interface PointMarkerConfig {
    title: LocalizedText;
    lockedTitle: LocalizedText;
}

export interface PointSiteConfig {
    id: number;
    path: string;
    coords: [number, number];
    pageTitle: LocalizedText;
    marker: PointMarkerConfig;
    hero: PointHero;
    historyHeadline: LocalizedText;
    note: LocalizedText;
    lead?: {
        headline?: LocalizedText;
        body?: LocalizedText;
    };
    sections: PointSection[];
    conclusion: LocalizedText;
    audio?: string;
    galleryHeadline?: LocalizedText;
    gallery: PointGalleryItem[];
    memoriesHeadline?: LocalizedText;
    memories: LocalizedText[];
}