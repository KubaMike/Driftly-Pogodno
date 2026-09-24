import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { usePageTitle } from '../hooks/usePageTitle';
import { trails } from '../trails/registry';

export function HomePage() {
    const { t, l } = useLanguage();
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
                <div className="trail-list">
                    {trails.map((trail) => (
                        <div key={trail.id} className="trail-card">
                            <div className="trail-card-info">
                                <h3>{l(trail.title)}</h3>
                                <p>{l(trail.description)}</p>
                            </div>
                            <Link className="btn primary" to={`/trail/${trail.id}`}>
                                {t('trail_view_on_map')}
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}