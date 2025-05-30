import { useEffect, useRef } from 'react';
import { KeenSliderInstance } from 'keen-slider/react';

export function useSliderAutoplay(
  instanceRef: React.MutableRefObject<KeenSliderInstance | null>,
  delay = 5000
) {
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const slider = instanceRef.current;
    if (!slider) return;

    timer.current = setInterval(() => {
      slider.next();
    }, delay);

    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [instanceRef, delay]);
}
