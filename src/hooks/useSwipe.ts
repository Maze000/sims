import { useState, useEffect } from 'react';

interface SwipeOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  minSwipeDistance?: number;
}

export const useSwipe = (options: SwipeOptions) => {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);
  const minSwipeDistance = options.minSwipeDistance || 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const absDistanceX = Math.abs(distanceX);
    const absDistanceY = Math.abs(distanceY);

    // Determine if horizontal or vertical swipe
    if (absDistanceX > absDistanceY) {
      // Horizontal swipe
      if (absDistanceX > minSwipeDistance) {
        if (distanceX > 0) {
          options.onSwipeLeft?.();
        } else {
          options.onSwipeRight?.();
        }
      }
    } else {
      // Vertical swipe
      if (absDistanceY > minSwipeDistance) {
        if (distanceY > 0) {
          options.onSwipeUp?.();
        } else {
          options.onSwipeDown?.();
        }
      }
    }
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
};

export default useSwipe;
