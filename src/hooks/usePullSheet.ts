import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties, PointerEvent as ReactPointerEvent } from 'react';

const SHEET_QUERY = '(max-width: 768px)';
const SHEET_OPEN_HEIGHT = 0.78;
const PEEK_PX = 32;
const OPEN_THRESHOLD = 0.5;

export function usePullSheet() {
    const [open, setOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(
        () => typeof window !== 'undefined' && window.matchMedia(SHEET_QUERY).matches
    );
    const [dragging, setDragging] = useState(false);
    const [dragTranslate, setDragTranslate] = useState<number | null>(null);

    const draggingRef = useRef(false);
    const startYRef = useRef(0);
    const startTranslateRef = useRef(0);
    const startedOpenRef = useRef(false);
    const closedOffsetRef = useRef(0);
    const dragTranslateRef = useRef(0);
    const maxMoveRef = useRef(0);

    useEffect(() => {
        const mql = window.matchMedia(SHEET_QUERY);
        const onChange = () => setIsMobile(mql.matches);
        mql.addEventListener('change', onChange);
        return () => mql.removeEventListener('change', onChange);
    }, []);

    const onHandlePointerDown = useCallback(
        (e: ReactPointerEvent<HTMLDivElement>) => {
            if (!isMobile) {
                return;
            }
            const closedOffset = Math.max(
                0,
                Math.round(window.innerHeight * SHEET_OPEN_HEIGHT - PEEK_PX)
            );
            closedOffsetRef.current = closedOffset;
            startYRef.current = e.clientY;
            startedOpenRef.current = open;
            startTranslateRef.current = open ? 0 : closedOffset;
            dragTranslateRef.current = startTranslateRef.current;
            maxMoveRef.current = 0;
            draggingRef.current = true;
            setDragging(true);
            setDragTranslate(startTranslateRef.current);
            e.currentTarget.setPointerCapture?.(e.pointerId);
        },
        [isMobile, open]
    );

    const onHandlePointerMove = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
        if (!draggingRef.current) {
            return;
        }
        const delta = e.clientY - startYRef.current;
        maxMoveRef.current = Math.max(maxMoveRef.current, Math.abs(delta));
        const clamped = Math.min(
            Math.max(startTranslateRef.current + delta, 0),
            closedOffsetRef.current
        );
        dragTranslateRef.current = clamped;
        setDragTranslate(clamped);
    }, []);

    const finishDrag = useCallback(() => {
        draggingRef.current = false;
        setDragging(false);
        setDragTranslate(null);
    }, []);

    const onHandlePointerUp = useCallback(
        (e: ReactPointerEvent<HTMLDivElement>) => {
            if (!draggingRef.current) {
                return;
            }
            e.currentTarget.releasePointerCapture?.(e.pointerId);
            if (maxMoveRef.current < 6) {
                setOpen((prev) => !prev);
            } else {
                setOpen(dragTranslateRef.current < closedOffsetRef.current * OPEN_THRESHOLD);
            }
            finishDrag();
        },
        [finishDrag]
    );

    const onHandlePointerCancel = useCallback(
        (e: ReactPointerEvent<HTMLDivElement>) => {
            e.currentTarget.releasePointerCapture?.(e.pointerId);
            finishDrag();
        },
        [finishDrag]
    );

    const sheetStyle: CSSProperties | undefined = isMobile
        ? {
              transform:
                  dragTranslate !== null
                      ? startedOpenRef.current
                        ? `translateY(${dragTranslate}px)`
                        : `translate(-50%, ${dragTranslate}px)`
                      : open
                        ? 'translateY(0%)'
                        : 'translate(-50%, calc(100% - 32px))'
          }
        : undefined;

    return {
        isMobile,
        open,
        dragging,
        sheetStyle,
        handleProps: {
            onPointerDown: onHandlePointerDown,
            onPointerMove: onHandlePointerMove,
            onPointerUp: onHandlePointerUp,
            onPointerCancel: onHandlePointerCancel
        }
    };
}