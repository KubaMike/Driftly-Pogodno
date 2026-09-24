import { useEffect } from 'react';

export function useScrollLock() {
    useEffect(() => {
        const html = document.documentElement;
        const prevHtmlOverflow = html.style.overflow;
        const prevBodyOverflow = document.body.style.overflow;

        html.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';

        return () => {
            html.style.overflow = prevHtmlOverflow;
            document.body.style.overflow = prevBodyOverflow;
        };
    }, []);
}