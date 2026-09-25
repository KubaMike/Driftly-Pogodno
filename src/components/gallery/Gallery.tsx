import { useEffect, useState } from 'react';
import { Lightbox } from './Lightbox';

export interface ResolvedGalleryItem {
    src: string;
    alt: string;
    caption: string;
}

interface GalleryProps {
    images: ResolvedGalleryItem[];
    subsite?: boolean;
}

function wrap(length: number, index: number): number | null {
    if (length === 0) {
        return null;
    }

    return ((index % length) + length) % length;
}

export function Gallery({ images, subsite = false }: GalleryProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    useEffect(() => {
        if (activeIndex === null) {
            return;
        }

        if (activeIndex < 0 || activeIndex >= images.length) {
            setActiveIndex(null);
            return;
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setActiveIndex(null);
            } else if (e.key === 'ArrowLeft') {
                setActiveIndex(wrap(images.length, activeIndex - 1));
            } else if (e.key === 'ArrowRight') {
                setActiveIndex(wrap(images.length, activeIndex + 1));
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [activeIndex, images.length]);

    const currentIndex =
        activeIndex !== null && activeIndex >= 0 && activeIndex < images.length ? activeIndex : null;

    return (
        <>
            <div className={`gallery${subsite ? ' subsite-gallery' : ''}`}>
                {images.map((image, index) => (
                    <div
                        key={image.src}
                        className="gallery-item"
                        onClick={() => setActiveIndex(wrap(images.length, index))}
                    >
                        <img src={image.src} alt={image.alt} />
                    </div>
                ))}
            </div>
            {currentIndex !== null && (
                <Lightbox
                    images={images}
                    index={currentIndex}
                    onNavigate={(index) => setActiveIndex(wrap(images.length, index))}
                    onClose={() => setActiveIndex(null)}
                />
            )}
        </>
    );
}