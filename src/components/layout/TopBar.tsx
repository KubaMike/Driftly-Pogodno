import { Link } from 'react-router-dom';
import type { RefObject } from 'react';

interface TopBarProps {
    onMenuClick: () => void;
    hamburgerRef?: RefObject<HTMLDivElement>;
}

export function TopBar({ onMenuClick, hamburgerRef }: TopBarProps) {
    return (
        <div className="top-bar">
            <div className="menu-logo">
                <div className="hamburger" onClick={onMenuClick} ref={hamburgerRef}>
                    <div className="lines"><span></span><span></span><span></span></div>
                </div>
                <Link to="/" className="brand-logo">Driftly</Link>
            </div>
            <div className="top-bar-nav">
                <Link to="/map" id="map-link-top"><i className="fas fa-map-marker-alt"></i></Link>
            </div>
        </div>
    );
}