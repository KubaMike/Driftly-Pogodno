import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { RefObject } from 'react';
import {
    isUnlockAllEnabled,
    setUnlockAll,
    subscribeUnlockAll
} from '../../hooks/usePointUnlock';
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
            <DebugUnlockToggle />
        </div>
    );
}

function DebugUnlockToggle() {
    const [enabled, setEnabled] = useState(isUnlockAllEnabled());

    useEffect(() => subscribeUnlockAll(() => setEnabled(isUnlockAllEnabled())), []);

    return (
        <div className="lang centered-lang">
            <label className="debug-unlock" htmlFor="debug-unlock">
                <input
                    id="debug-unlock"
                    type="checkbox"
                    checked={enabled}
                    onChange={(e) => setUnlockAll(e.target.checked)}
                />
                Unlock all (test)
            </label>
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