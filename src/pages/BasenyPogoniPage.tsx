import { Gallery } from '../components/gallery/Gallery';
import { usePageTitle } from '../hooks/usePageTitle';
import { useBasenyUnlock } from '../hooks/usePointUnlock';
import { useLanguage } from '../i18n/LanguageContext';
import type { GalleryImage, TranslationKey } from '../types';

const subsiteImages: GalleryImage[] = [
    {
        src: 'Photos/basen_pogon_szczecin.jpg',
        altKey: 'basen_szczecin_alt',
        captionKey: 'basen_szczecin_alt'
    },
    {
        src: 'Photos/basen_pogon_wejscie.jpg',
        altKey: 'basen_wejscie_alt',
        captionKey: 'basen_wejscie_alt'
    },
    {
        src: 'Photos/basen_pogon_60s.jpg',
        altKey: 'basen_60s_alt',
        captionKey: 'basen_60s_alt'
    },
    {
        src: 'Photos/basen_pogon_1965.jpg',
        altKey: 'basen_1965_alt',
        captionKey: 'basen_1965_alt'
    }
];

const sections: { heading: TranslationKey; body: TranslationKey }[] = [
    { heading: 'beginnings', body: 'beginnings_desc' },
    { heading: 'infrastructure', body: 'infrastructure_desc' },
    { heading: 'fate', body: 'fate_desc' }
];

export function BasenyPogoniPage() {
    const { t } = useLanguage();
    usePageTitle(t('stadium_title'));
    useBasenyUnlock();

    return (
        <main className="wrap baseny-page">
            <section className="card home-card">
                <div className="visual">
                    <img
                        src="Photos/basen_pogon_ludzie.jpg"
                        alt={t('basenyPogoni_title')}
                        className="hero-img"
                    />
                </div>
                <div className="info">
                    <div className="name">{t('basenyPogoni_title')}</div>
                    <p className="desc">{t('basenyPogoni_intro')}</p>
                </div>
            </section>

            <hr />

            <section className="history-content">
                <h2>{t('history_title')}</h2>
                <audio
                    controls
                    preload="metadata"
                    src="audiodescriptions/Basen przy stadionie Pogoni.mp3"
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
                        Twoja przeglądarka nie obsługuje elementu audio.{' '}
                        <a href="audiodescriptions/Basen przy stadionie Pogoni.mp3">
                            Pobierz plik audio
                        </a>
                    </p>
                </audio>

                <p className="historical-note">{t('historical_note')}</p>

                <h3>{t('forgotten_pearl')}</h3>
                <p>{t('forgotten_pearl_desc')}</p>

                {sections.map(({ heading, body }) => (
                    <Article key={heading} headingKey={heading} bodyKey={body} />
                ))}

                <p className="history-conclusion">{t('conclusion')}</p>
            </section>

            <hr />

            <h2>{t('gallery_title')}</h2>

            <Gallery images={subsiteImages} subsite />

            <hr />

            <h2 className="memories-title">{t('memories_title')}</h2>

            <section className="memories-content">
                <ul className="memories-list">
                    <li>{t('basenyPogoni_memory_1')}</li>
                    <li>{t('basenyPogoni_memory_2')}</li>
                    <li>{t('basenyPogoni_memory_3')}</li>
                    <li>{t('basenyPogoni_memory_4')}</li>
                    <li>{t('basenyPogoni_memory_5')}</li>
                    <li>{t('basenyPogoni_memory_6')}</li>
                    <li>{t('basenyPogoni_memory_7')}</li>
                    <li>{t('basenyPogoni_memory_8')}</li>
                </ul>
            </section>
        </main>
    );
}

function Article({
    headingKey,
    bodyKey
}: {
    headingKey: TranslationKey;
    bodyKey: TranslationKey;
}) {
    const { t } = useLanguage();

    return (
        <>
            <h4>{t(headingKey)}</h4>
            <p>{t(bodyKey)}</p>
        </>
    );
}