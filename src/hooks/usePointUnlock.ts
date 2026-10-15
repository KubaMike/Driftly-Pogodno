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

const PREVIEW_KEY = 'point_0_comingSoonPreview';

const previewListeners = new Set<() => void>();

let previewCache = readFlag(PREVIEW_KEY);

export function isComingSoonPreview(): boolean {
    return previewCache;
}

export function setComingSoonPreview(enabled: boolean): void {
    previewCache = enabled;
    try {
        if (enabled) {
            localStorage.setItem(PREVIEW_KEY, 'true');
        } else {
            localStorage.removeItem(PREVIEW_KEY);
        }
    } catch {
        // ignore storage errors (e.g. private mode)
    }
    previewListeners.forEach((listener) => listener());
}

export function subscribeComingSoonPreview(listener: () => void): () => void {
    previewListeners.add(listener);
    return () => {
        previewListeners.delete(listener);
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