import { Link } from 'react-router-dom';
import type { RefObject } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

interface SidebarProps {
    open: boolean;
    onClose: () => void;
    innerRef?: RefObject<HTMLDivElement>;
}

export function Sidebar({ open, onClose, innerRef }: SidebarProps) {
    const { t } = useLanguage();

    return (
        <div className={`sidebar${open ? ' open' : ''}`} id="sidebar" ref={innerRef}>
            <div className="close-btn" onClick={onClose}>✕</div>
            <h3>{t('sidebar_title')}</h3>
            <div className="menu-separator"></div>
            <div className="nav">
                <Link to="/gallery" onClick={onClose}>
                    <i className="fas fa-images"></i> {t('nav_gallery')}
                </Link>
                <Link to="/map" onClick={onClose}>
                    <i className="fas fa-map-marker-alt"></i> <span>{t('nav_map')}</span>
                </Link>
            </div>
            <LanguageSelect />
        </div>
    );
}

function LanguageSelect() {
    const { lang, setLang, t } = useLanguage();

    return (
        <div className="lang centered-lang">
            <label htmlFor="lang-select">{t('lang_label')}</label>
            <select
                id="lang-select"
                value={lang}
                onChange={(e) => setLang(e.target.value as typeof lang)}
            >
                <option value="pl">Polski</option>
                <option value="de">Deutsch</option>
                <option value="en">English</option>
                <option value="ua">Українська</option>
            </select>
        </div>
    );
}