import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { LanguageProvider } from './i18n/LanguageContext';
import { setComingSoonPreview } from './hooks/usePointUnlock';
import './style.css';

const basename = import.meta.env.VITE_ROUTER_BASENAME || '/';

if (import.meta.env.DEV) {
    Object.assign(window, { setComingSoonPreview });
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter basename={basename}>
            <LanguageProvider>
                <App />
            </LanguageProvider>
        </BrowserRouter>
    </StrictMode>
);