// src/components/common/Carousel.tsx
import React, { ReactNode, useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { useSliderAutoplay } from '@/hooks/useSliderAutoplay';

interface CarouselProps {
  children: ReactNode[];
  autoplayDelay?: number;
}

const Carousel: React.FC<CarouselProps> = ({ children, autoplayDelay = 4000 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: 'snap',
    rubberband: false,
    slides: { perView: 1 },
    slideChanged: (slider) => {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  useSliderAutoplay(instanceRef, autoplayDelay);

  return (
    <>
      <div ref={sliderRef} className="keen-slider">
        {children.map((child, idx) => (
          <div key={idx} className="keen-slider__slide w-full px-4">
            {child}
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4 gap-2">
        {children.map((_, idx) => (
          <button
            key={idx}
            onClick={() => instanceRef.current?.moveToIdx(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              idx === currentSlide ? 'bg-gold ring-2 ring-gold' : 'bg-gold/30'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </>
  );
};

export default Carousel;