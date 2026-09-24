import type { TranslationKey } from './i18n/translations';

export type { TranslationKey };

export type Lang = 'pl' | 'de' | 'en' | 'ua';

export interface GalleryImage {
    src: string;
    altKey: TranslationKey;
    captionKey: TranslationKey;
}