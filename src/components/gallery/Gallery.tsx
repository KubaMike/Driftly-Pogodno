import { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import type { GalleryImage } from '../../types';
import { Lightbox } from './Lightbox';

interface GalleryProps {
    images: GalleryImage[];
    subsite?: boolean;
}

function wrap(length: number, index: number): number {
    if (index < 0) {
        return length - 1;
    }
    if (index >= length) {
        return 0;
    }
    return index;
}

export function Gallery({ images, subsite = false }: GalleryProps) {
    const { t } = useLanguage();
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const resolved = useMemo(
        () =>
            images.map((image) => ({
                src: image.src,
                caption: t(image.captionKey)
            })),
        [images, t]
    );

    useEffect(() => {
        if (activeIndex === null) {
            return;
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setActiveIndex(null);
            } else if (e.key === 'ArrowLeft') {
                setActiveIndex((index) => wrap(resolved.length, (index ?? 0) - 1));
            } else if (e.key === 'ArrowRight') {
                setActiveIndex((index) => wrap(resolved.length, (index ?? 0) + 1));
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [activeIndex, resolved.length]);

    return (
        <>
            <div className={`gallery${subsite ? ' subsite-gallery' : ''}`}>
                {images.map((image, index) => (
                    <div
                        key={image.src}
                        className="gallery-item"
                        onClick={() => setActiveIndex(index)}
                    >
                        <img src={image.src} alt={t(image.altKey)} />
                    </div>
                ))}
            </div>
            {activeIndex !== null && (
                <Lightbox
                    images={resolved}
                    index={activeIndex}
                    onNavigate={setActiveIndex}
                    onClose={() => setActiveIndex(null)}
                />
            )}
        </>
    );
}