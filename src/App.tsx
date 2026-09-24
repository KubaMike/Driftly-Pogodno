import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { BasenyPogoniPage } from './pages/BasenyPogoniPage';
import { GalleryPage } from './pages/GalleryPage';
import { HomePage } from './pages/HomePage';
import { MapPage } from './pages/MapPage';
import { BASENY_PATH } from './hooks/usePointUnlock';

export function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/map" element={<MapPage />} />
                <Route path={`/${BASENY_PATH}`} element={<BasenyPogoniPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Layout>
    );
}