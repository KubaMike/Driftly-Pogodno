import { Gallery } from '../components/gallery/Gallery';
import { usePageTitle } from '../hooks/usePageTitle';
import { useLanguage } from '../i18n/LanguageContext';
import type { GalleryImage } from '../types';

const galleryImages: GalleryImage[] = [
    {
        src: 'Photos/gallery-photos/niemiecka_mapa-stadion.jpg',
        altKey: 'gallery_alt_1',
        captionKey: 'gallery_caption_1'
    },
    {
        src: 'Photos/gallery-photos/bloki.jpg',
        altKey: 'gallery_alt_2',
        captionKey: 'gallery_caption_2'
    },
    {
        src: 'Photos/gallery-photos/panorama_miasta-pogodno.jpg',
        altKey: 'gallery_alt_3',
        captionKey: 'gallery_caption_3'
    },
    {
        src: 'Photos/gallery-photos/płot.jpg',
        altKey: 'gallery_alt_4',
        captionKey: 'gallery_caption_4'
    },
    {
        src: 'Photos/gallery-photos/rosyjska_mapa-pogodno.jpg',
        altKey: 'gallery_alt_5',
        captionKey: 'gallery_caption_5'
    },
    {
        src: 'Photos/gallery-photos/zdobienie_gwiazda.jpg',
        altKey: 'gallery_alt_6',
        captionKey: 'gallery_caption_6'
    }
];

export function GalleryPage() {
    const { t } = useLanguage();
    usePageTitle(`${t('gallery_title')} - Driftly-Pogodno`);

    return (
        <main className="wrap">
            <Gallery images={galleryImages} />
        </main>
    );
}