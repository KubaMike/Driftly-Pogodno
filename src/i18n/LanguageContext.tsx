import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { Lang, TranslationKey } from '../types';
import { DEFAULT_LANG, getTranslation, LANGS } from './translations';

const STORAGE_KEY = 'driftly_lang';

interface LanguageContextValue {
    lang: Lang;
    setLang: (lang: Lang) => void;
    t: (key: TranslationKey) => string;
    isLang: (lang: Lang) => boolean;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

function isLang(value: string | null): value is Lang {
    return value !== null && (LANGS as string[]).includes(value);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [lang, setLangState] = useState<Lang>(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return isLang(stored) ? stored : DEFAULT_LANG;
    });

    useEffect(() => {
        document.documentElement.lang = lang;
    }, [lang]);

    const setLang = useCallback((next: Lang) => {
        setLangState(next);
        localStorage.setItem(STORAGE_KEY, next);
    }, []);

    const t = useCallback((key: TranslationKey) => getTranslation(key, lang), [lang]);

    const value = useMemo(
        () => ({ lang, setLang, t, isLang }),
        [lang, setLang, t]
    );

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
    const ctx = useContext(LanguageContext);
    if (!ctx) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return ctx;
}