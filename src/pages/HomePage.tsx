import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { usePageTitle } from '../hooks/usePageTitle';

export function HomePage() {
    const { t } = useLanguage();
    usePageTitle('Driftly-Pogodno');

    return (
        <main className="wrap">
            <section className="card home-card">
                <div className="visual">
                    <img src="Photos/hero.jpg" alt="hero" className="hero-img" />
                </div>
                <div className="info">
                    <div className="name">{t('site_name')}</div>
                    <p className="desc">{t('intro')}</p>
                    <div className="cta-row">
                        <Link className="btn primary" to="/gallery">
                            {t('btn_explore')}
                        </Link>
                    </div>
                </div>
            </section>

            <hr />

            <section className="trails-preview">
                <h2>{t('tab_trails')}</h2>
                <p>{t('trails_info')}</p>
            </section>
        </main>
    );
}