import { useCallback, useEffect } from 'react';

const UNLOCK_ALL_KEY = 'point_0_unlockAll';

const unlockAllListeners = new Set<() => void>();

function readFlag(key: string): boolean {
    try {
        return localStorage.getItem(key) === 'true';
    } catch {
        return false;
    }
}

let unlockAllCache = readFlag(UNLOCK_ALL_KEY);

function notifyUnlockAllListeners(): void {
    unlockAllListeners.forEach((listener) => listener());
}

export function isUnlockAllEnabled(): boolean {
    return unlockAllCache;
}

export function setUnlockAll(enabled: boolean): void {
    unlockAllCache = enabled;
    try {
        if (enabled) {
            localStorage.setItem(UNLOCK_ALL_KEY, 'true');
        } else {
            localStorage.removeItem(UNLOCK_ALL_KEY);
        }
    } catch {
        // ignore storage errors (e.g. private mode)
    }
    notifyUnlockAllListeners();
}

export function subscribeUnlockAll(listener: () => void): () => void {
    unlockAllListeners.add(listener);
    return () => {
        unlockAllListeners.delete(listener);
    };
}

export function isPointActive(point: number): boolean {
    return unlockAllCache || readFlag(`point_${point}`);
}

export function unlockPoint(point: number): void {
    try {
        localStorage.setItem(`point_${point}`, 'true');
    } catch {
        // ignore storage errors
    }
}

export function usePointUnlock(point: number, path: string): void {
    const unlock = useCallback(() => unlockPoint(point), [point]);

    useEffect(() => {
        const segment = window.location.pathname.split('/').filter(Boolean).pop();
        if (segment === path && !isPointActive(point)) {
            unlock();
        }
    }, [path, point, unlock]);
}