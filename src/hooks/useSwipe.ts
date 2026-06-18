import { useRef } from "react";

/**
 * Minimal swipe hook (touch + mouse-drag):
 * - tracks the start position (touch or mouse)
 * - ignores mostly-vertical swipes
 * - fires onSwipeRight when dx > threshold, onSwipeLeft when dx < -threshold
 *
 * Returns handlers to spread onto the swipeable element. Components that only
 * want touch can destructure just onTouchStart/onTouchEnd.
 */
const useSwipe = (
  onSwipeLeft: () => void,
  onSwipeRight: () => void,
  threshold = 40
) => {
  const start = useRef<{ x: number; y: number } | null>(null);

  const fire = (x: number, y: number) => {
    const origin = start.current;
    start.current = null;
    if (!origin) return;
    const dx = x - origin.x;
    const dy = y - origin.y;
    if (Math.abs(dy) > Math.abs(dx)) return;
    if (dx > threshold) onSwipeRight();
    if (dx < -threshold) onSwipeLeft();
  };

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches?.[0];
    if (t) start.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const t = e.changedTouches?.[0];
    if (t) fire(t.clientX, t.clientY);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    start.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseUp = (e: React.MouseEvent) => {
    fire(e.clientX, e.clientY);
  };

  return { onTouchStart, onTouchEnd, onMouseDown, onMouseUp };
};

export default useSwipe;
