import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { GalleryPage } from './pages/GalleryPage';
import { HomePage } from './pages/HomePage';
import { MapPage } from './pages/MapPage';
import { PointSitePage } from './pages/PointSitePage';
import { TrailPage } from './pages/TrailPage';

export function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/map" element={<MapPage />} />
                <Route path="/trail/:trailId" element={<TrailPage />} />
                <Route path="/:pointPath" element={<PointSitePage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Layout>
    );
}