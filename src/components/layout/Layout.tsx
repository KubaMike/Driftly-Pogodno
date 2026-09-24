import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

export function Layout({ children }: { children: ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const hamburgerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sidebarOpen) {
            return;
        }

        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node;
            if (
                sidebarRef.current &&
                hamburgerRef.current &&
                !sidebarRef.current.contains(target) &&
                !hamburgerRef.current.contains(target)
            ) {
                setSidebarOpen(false);
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setSidebarOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('click', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [sidebarOpen]);

    return (
        <>
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} innerRef={sidebarRef} />
            <TopBar onMenuClick={() => setSidebarOpen(true)} hamburgerRef={hamburgerRef} />
            {children}
        </>
    );
}