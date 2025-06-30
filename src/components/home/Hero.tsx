'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { ChevronDown, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { LuxuryButton, LuxuryHeading, LuxuryLabel, VerticalText } from '@/components/luxury';

interface LuxuryHeroProps {
  title: string | React.ReactNode;
  subtitle?: string;
  label?: string;
  backgroundImage?: string;
  backgroundImages?: string[]; // For slideshow
  backgroundVideo?: string; // New: Video background support
  backgroundVideos?: string[]; // New: Multiple videos
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  verticalText?: string;
  overlay?: 'light' | 'medium' | 'heavy' | 'gradient';
  height?: 'full' | 'large' | 'medium';
  showScrollIndicator?: boolean;
  autoPlayInterval?: number;
  enableParallax?: boolean;
  enableAIGreeting?: boolean;
  splitScreen?: boolean; // New: Dior-style split screen
  mouseEffect?: boolean; // New: Interactive mouse effects
}

const LuxuryHero: React.FC<LuxuryHeroProps> = ({
  title,
  subtitle,
  label,
  backgroundImage,
  backgroundImages,
  backgroundVideo,
  backgroundVideos,
  ctaText,
  ctaHref,
  secondaryCtaText,
  secondaryCtaHref,
  verticalText,
  overlay = 'medium',
  height = 'full',
  showScrollIndicator = true,
  autoPlayInterval = 5000,
  enableParallax = true,
  enableAIGreeting = true,
  splitScreen = false,
  mouseEffect = true,
}) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [greeting, setGreeting] = useState('');
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Combine all media sources
  const images = backgroundImages || (backgroundImage ? [backgroundImage] : []);
  const videos = backgroundVideos || (backgroundVideo ? [backgroundVideo] : []);
  const allMedia = [
    ...videos.map(v => ({ type: 'video', src: v })),
    ...images.map(i => ({ type: 'image', src: i })),
  ];
  const hasMultipleMedia = allMedia.length > 1;
  const currentMedia = allMedia[currentMediaIndex];

  // Parallax setup
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.2]);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  // AI-powered greeting based on time of day and season
  useEffect(() => {
    if (!enableAIGreeting) return;

    const hour = new Date().getHours();
    const month = new Date().getMonth();

    // Season detection
    const season =
      month >= 3 && month <= 5
        ? 'אביב'
        : month >= 6 && month <= 8
          ? 'קיץ'
          : month >= 9 && month <= 11
            ? 'סתיו'
            : 'חורף';

    // Time-based greeting
    if (hour >= 5 && hour < 12) {
      setGreeting(`בוקר טוב | ${season} 2025`);
    } else if (hour >= 12 && hour < 17) {
      setGreeting(`צהריים טובים | ${season} 2025`);
    } else if (hour >= 17 && hour < 20) {
      setGreeting(`ערב טוב | ${season} 2025`);
    } else {
      setGreeting(`לילה טוב | ${season} 2025`);
    }
  }, [enableAIGreeting]);

  // Auto-play media slideshow
  useEffect(() => {
    if (!hasMultipleMedia || !isPlaying) return;

    const interval = setInterval(() => {
      setCurrentMediaIndex(prev => (prev + 1) % allMedia.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [hasMultipleMedia, allMedia.length, autoPlayInterval, isPlaying]);

  // Mouse move handler for parallax
  useEffect(() => {
    if (!mouseEffect) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const x = (e.clientX - rect.left - centerX) / centerX;
      const y = (e.clientY - rect.top - centerY) / centerY;

      setMousePosition({ x, y });
      mouseX.set(x * 20);
      mouseY.set(y * 20);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseEffect, mouseX, mouseY]);

  const heightClasses = {
    full: 'min-h-screen',
    large: 'min-h-[85vh]',
    medium: 'min-h-[70vh]',
  };

  const overlayStyles = {
    light: 'bg-black/20',
    medium: 'bg-black/40',
    heavy: 'bg-black/60',
    gradient: 'bg-gradient-to-b from-black/60 via-black/20 to-black/60',
  };

  return (
    <section
      ref={containerRef}
      className={`relative ${heightClasses[height]} flex items-center overflow-hidden`}
      dir="rtl"
    >
      {/* Background Media with Parallax */}
      <AnimatePresence mode="wait">
        {allMedia.map(
          (media, index) =>
            index === currentMediaIndex && (
              <motion.div
                key={`${media.type}-${media.src}`}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute inset-0"
                style={enableParallax ? { y: parallaxY, scale } : {}}
              >
                {media.type === 'video' ? (
                  <div className="relative w-full h-full">
                    <video
                      ref={videoRef}
                      src={media.src}
                      autoPlay
                      loop
                      muted={isMuted}
                      playsInline
                      className="w-full h-full object-cover"
                      style={
                        mouseEffect
                          ? {
                              transform: `translate(${smoothMouseX.get()}px, ${smoothMouseY.get()}px) scale(1.1)`,
                            }
                          : {}
                      }
                    />
                    {/* Video Controls */}
                    <div className="absolute bottom-6 end-6 flex gap-2 z-20">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsMuted(!isMuted)}
                        className="w-10 h-10 bg-black/50 backdrop-blur-sm border border-gold/30 flex items-center justify-center text-gold hover:bg-black/70 transition-colors"
                      >
                        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setIsPlaying(!isPlaying);
                          if (videoRef.current) {
                            isPlaying ? videoRef.current.pause() : videoRef.current.play();
                          }
                        }}
                        className="w-10 h-10 bg-black/50 backdrop-blur-sm border border-gold/30 flex items-center justify-center text-gold hover:bg-black/70 transition-colors"
                      >
                        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                      </motion.button>
                    </div>
                  </div>
                ) : (
                  <motion.img
                    src={media.src}
                    alt=""
                    className="w-full h-full object-cover"
                    loading={index === 0 ? 'eager' : 'lazy'}
                    style={
                      mouseEffect
                        ? {
                            transform: `translate(${smoothMouseX.get()}px, ${smoothMouseY.get()}px) scale(1.1)`,
                          }
                        : {}
                    }
                  />
                )}
              </motion.div>
            )
        )}
      </AnimatePresence>

      {/* Advanced Overlay System */}
      <div className={`absolute inset-0 ${overlayStyles[overlay]}`} />

      {/* Gradient Overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/20 to-black/40" />

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay">
        <div className="absolute inset-0 bg-noise" />
      </div>

      {/* Split Screen Effect (Dior-inspired) */}
      {splitScreen && (
        <motion.div
          className="absolute inset-y-0 start-1/2 w-px bg-gold/20"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
      )}

      {/* Vertical Text */}
      {verticalText && (
        <VerticalText position="left" className="hidden lg:block z-10">
          {verticalText}
        </VerticalText>
      )}

      {/* Media Indicators */}
      {hasMultipleMedia && (
        <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {allMedia.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentMediaIndex(index)}
              className="relative h-px overflow-hidden transition-all duration-500"
              style={{ width: index === currentMediaIndex ? '60px' : '40px' }}
              whileHover={{ scale: 1.1 }}
            >
              <div className="absolute inset-0 bg-white/30" />
              <motion.div
                className="absolute inset-0 bg-gold"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: index === currentMediaIndex ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              />
            </motion.button>
          ))}
        </div>
      )}

      {/* Content Container with Enhanced Animations */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex items-center min-h-[80vh]"
        style={enableParallax ? { opacity } : {}}
      >
        <div className={`${splitScreen ? 'max-w-2xl' : 'max-w-4xl'} w-full py-20`}>
          {/* AI Greeting */}
          {enableAIGreeting && greeting && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-6"
            >
              <span className="text-xs tracking-[0.3em] text-gold/70 uppercase">{greeting}</span>
            </motion.div>
          )}

          {/* Label */}
          {label && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <LuxuryLabel size="sm" className="mb-6 md:mb-8 animate-shimmer">
                {label}
              </LuxuryLabel>
            </motion.div>
          )}

          {/* Title with Split Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="overflow-hidden"
          >
            <LuxuryHeading
              as="h1"
              size="display"
              className="mb-4 md:mb-6 text-shadow-luxury-lg"
              animate={false}
            >
              {typeof title === 'string' ? (
                <motion.span className="block">
                  {title.split(' ').map((word, index) => (
                    <motion.span
                      key={index}
                      className="inline-block me-[0.3em]"
                      initial={{ y: 100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.8,
                        delay: 0.6 + index * 0.1,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.span>
              ) : (
                title
              )}
            </LuxuryHeading>
          </motion.div>

          {/* Subtitle with Typewriter Effect */}
          {subtitle && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="overflow-hidden"
            >
              <motion.p
                className="text-xl md:text-2xl lg:text-3xl font-light text-lightgrey mb-8 md:mb-12 max-w-2xl leading-relaxed"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                {subtitle}
              </motion.p>
            </motion.div>
          )}

          {/* Enhanced CTAs with Stagger */}
          {(ctaText || secondaryCtaText) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 mb-20"
            >
              {ctaText && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                >
                  <LuxuryButton
                    variant="primary"
                    size="large"
                    href={ctaHref}
                    className="min-w-[220px] group"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {ctaText}
                      <motion.span
                        className="inline-block"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        ←
                      </motion.span>
                    </span>
                  </LuxuryButton>
                </motion.div>
              )}
              {secondaryCtaText && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                >
                  <LuxuryButton
                    variant="outline"
                    size="large"
                    href={secondaryCtaHref}
                    className="min-w-[220px] backdrop-blur-sm"
                  >
                    {secondaryCtaText}
                  </LuxuryButton>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Enhanced Scroll Indicator */}
      {showScrollIndicator && !hasMultipleMedia && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.button
            className="relative flex flex-col items-center gap-2 cursor-pointer group"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            whileHover={{ y: 5 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-xs tracking-[0.3em] text-gold/70 uppercase">גלול</span>
            <div className="relative w-[1px] h-12 overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 w-full bg-gradient-to-b from-transparent via-gold to-transparent"
                animate={{
                  y: [-20, 20],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{ height: '200%' }}
              />
            </div>
            <span className="sr-only">גלול למטה</span>
          </motion.button>
        </motion.div>
      )}

      {/* Corner Accents */}
      <div className="absolute top-0 start-0 w-20 h-20 border-t border-s border-gold/20" />
      <div className="absolute top-0 end-0 w-20 h-20 border-t border-e border-gold/20" />
      <div className="absolute bottom-0 start-0 w-20 h-20 border-b border-s border-gold/20" />
      <div className="absolute bottom-0 end-0 w-20 h-20 border-b border-e border-gold/20" />
    </section>
  );
};

export default LuxuryHero;
