import { useMemo } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Gallery } from '../components/gallery/Gallery';
import { usePageTitle } from '../hooks/usePageTitle';
import { usePointUnlock } from '../hooks/usePointUnlock';
import { useLanguage } from '../i18n/LanguageContext';
import { getPointSiteByPath } from '../points/registry';
import type { PointSiteConfig } from '../points/types';

export function PointSitePage() {
    const { pointPath } = useParams<{ pointPath: string }>();
    const config = pointPath ? getPointSiteByPath(pointPath) : undefined;

    if (!config) {
        return <Navigate to="/" replace />;
    }

    return <PointSiteContent config={config} />;
}

function PointSiteContent({ config }: { config: PointSiteConfig }) {
    const { t, l } = useLanguage();
    usePageTitle(`${l(config.pageTitle)} - Driftly-Pogodno`);
    usePointUnlock(config.id, config.path);

    const galleryHeadline = config.galleryHeadline ? l(config.galleryHeadline) : t('gallery_title');
    const memoriesHeadline = config.memoriesHeadline
        ? l(config.memoriesHeadline)
        : t('memories_title');

    const galleryItems = useMemo(
        () =>
            config.gallery.map((item) => ({
                src: item.src,
                alt: l(item.caption),
                caption: l(item.caption)
            })),
        [config.gallery, l]
    );

    return (
        <main className="wrap baseny-page">
            <section className="card home-card">
                <div className="visual">
                    <img src={config.hero.image} alt={l(config.hero.title)} className="hero-img" />
                </div>
                <div className="info">
                    <div className="name">{l(config.hero.title)}</div>
                    <p className="desc">{l(config.hero.intro)}</p>
                </div>
            </section>

            <hr />

            <section className="history-content">
                <h2>{l(config.historyHeadline)}</h2>

                {config.audio && (
                    <audio
                        controls
                        preload="metadata"
                        src={config.audio}
                        style={{
                            width: '100%',
                            maxWidth: '400px',
                            margin: '20px auto',
                            display: 'block',
                            borderRadius: '8px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                    >
                        <p>
                            {t('audio_unsupported')}{' '}
                            <a href={config.audio}>{t('audio_download')}</a>
                        </p>
                    </audio>
                )}

                <p className="historical-note">{l(config.note)}</p>

                {config.lead?.headline && <h3>{l(config.lead.headline)}</h3>}
                {config.lead?.body && <p>{l(config.lead.body)}</p>}

                {config.sections.map((section, index) => (
                    <Section
                        key={index}
                        heading={l(section.heading)}
                        body={l(section.body)}
                    />
                ))}

                <p className="history-conclusion">{l(config.conclusion)}</p>
            </section>

            <hr />

            <h2>{galleryHeadline}</h2>

            <Gallery images={galleryItems} subsite />

            <hr />

            <h2 className="memories-title">{memoriesHeadline}</h2>

            <section className="memories-content">
                <ul className="memories-list">
                    {config.memories.map((memory, index) => (
                        <li key={index}>{l(memory)}</li>
                    ))}
                </ul>
            </section>
        </main>
    );
}

function Section({ heading, body }: { heading: string; body: string }) {
    return (
        <>
            <h4>{heading}</h4>
            <p>{body}</p>
        </>
    );
}