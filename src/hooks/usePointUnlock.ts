import { useCallback, useEffect } from 'react';

export function isPointActive(point: number): boolean {
    return localStorage.getItem(`point_${point}`) === 'true';
}

export function unlockPoint(point: number): void {
    localStorage.setItem(`point_${point}`, 'true');
}

export function usePointUnlock(point: number, path: string): void {
    const unlock = useCallback(() => unlockPoint(point), [point]);

    useEffect(() => {
        if (window.location.pathname.includes(path) && !isPointActive(point)) {
            unlock();
        }
    }, [path, point, unlock]);
}