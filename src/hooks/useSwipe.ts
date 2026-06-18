import { useRef } from "react";

/**
 * Minimal touch-swipe hook matching ReviewCarousel's original behavior:
 * - tracks the first touch start position
 * - on touch end, ignores mostly-vertical swipes
 * - fires onSwipeRight when dx > threshold, onSwipeLeft when dx < -threshold
 *
 * Returns handlers to spread onto the swipeable element.
 */
const useSwipe = (
  onSwipeLeft: () => void,
  onSwipeRight: () => void,
  threshold = 40
) => {
  const start = useRef<{ x: number; y: number } | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches?.[0];
    if (!t) return;
    start.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const origin = start.current;
    if (!origin) return;
    const t = e.changedTouches?.[0];
    if (!t) return;
    const dx = t.clientX - origin.x;
    const dy = t.clientY - origin.y;
    if (Math.abs(dy) > Math.abs(dx)) return;
    if (dx > threshold) onSwipeRight();
    if (dx < -threshold) onSwipeLeft();
  };

  return { onTouchStart, onTouchEnd };
};

export default useSwipe;
