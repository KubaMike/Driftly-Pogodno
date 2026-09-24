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
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    useEffect(() => {
        if (activeIndex === null) {
            return;
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setActiveIndex(null);
            } else if (e.key === 'ArrowLeft') {
                setActiveIndex((index) => wrap(images.length, (index ?? 0) - 1));
            } else if (e.key === 'ArrowRight') {
                setActiveIndex((index) => wrap(images.length, (index ?? 0) + 1));
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [activeIndex, images.length]);

    return (
        <>
            <div className={`gallery${subsite ? ' subsite-gallery' : ''}`}>
                {images.map((image, index) => (
                    <div
                        key={image.src}
                        className="gallery-item"
                        onClick={() => setActiveIndex(index)}
                    >
                        <img src={image.src} alt={image.alt} />
                    </div>
                ))}
            </div>
            {activeIndex !== null && (
                <Lightbox
                    images={images}
                    index={activeIndex}
                    onNavigate={setActiveIndex}
                    onClose={() => setActiveIndex(null)}
                />
            )}
        </>
    );
}