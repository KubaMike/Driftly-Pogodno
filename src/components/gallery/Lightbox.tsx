interface LightboxImage {
    src: string;
    caption: string;
}

interface LightboxProps {
    images: LightboxImage[];
    index: number;
    onNavigate: (index: number) => void;
    onClose: () => void;
}

export function Lightbox({ images, index, onNavigate, onClose }: LightboxProps) {
    const image = images[index];

    return (
        <div id="lightbox" style={{ display: 'flex' }} onClick={onClose}>
            <span className="close-button" onClick={onClose}>✕</span>
            <a
                className="prev"
                onClick={(e) => {
                    e.stopPropagation();
                    onNavigate(index - 1);
                }}
            >
                &#10094;
            </a>
            <img
                id="lightbox-img"
                src={image.src}
                alt=""
                onClick={(e) => e.stopPropagation()}
            />
            <a
                className="next"
                onClick={(e) => {
                    e.stopPropagation();
                    onNavigate(index + 1);
                }}
            >
                &#10095;
            </a>
            <div id="caption">{image.caption}</div>
        </div>
    );
}