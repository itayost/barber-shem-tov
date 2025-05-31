// src/components/common/Carousel.tsx
import React, { ReactNode, useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { useSliderAutoplay } from '@/hooks/useSliderAutoplay';

interface CarouselProps {
  children: ReactNode[];
  autoplayDelay?: number;
  responsive?: boolean;
  slidesPerView?: number | 'auto';
  spacing?: number;
  showDots?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({ 
  children, 
  autoplayDelay = 4000,
  responsive = false,
  slidesPerView = 1,
  spacing = 16,
  showDots = true
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Responsive breakpoints for testimonials
  const responsiveConfig = responsive ? {
    "(min-width: 640px)": {
      slides: { perView: 2, spacing: spacing }
    },
    "(min-width: 1024px)": {
      slides: { perView: 3, spacing: spacing }
    },
    "(min-width: 1280px)": {
      slides: { perView: 3, spacing: spacing }
    },
    "(min-width: 1536px)": {
      slides: { perView: 4, spacing: spacing }
    }
  } : undefined;

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: 'snap',
    rubberband: false,
    slides: { 
      perView: responsive ? 1 : slidesPerView, 
      spacing: spacing 
    },
    ...(responsiveConfig && { breakpoints: responsiveConfig }),
    slideChanged: (slider) => {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  useSliderAutoplay(instanceRef, autoplayDelay);

  const totalSlides = children.length;

  return (
    <div className="relative">
      <div ref={sliderRef} className="keen-slider">
        {children.map((child, idx) => (
          <div key={idx} className="keen-slider__slide">
            {child}
          </div>
        ))}
      </div>

      {/* Slide Indicators */}
      {showDots && totalSlides > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {children.map((_, idx) => (
            <button
              key={idx}
              onClick={() => instanceRef.current?.moveToIdx(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                idx === currentSlide 
                  ? 'bg-gold scale-125' 
                  : 'bg-gold/30 hover:bg-gold/60'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;