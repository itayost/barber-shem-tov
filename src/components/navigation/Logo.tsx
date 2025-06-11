'use client';

import { motion, useSpring } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

interface LogoProps {
  isScrolled: boolean;
  src: string;
  alt: string;
  href?: string;
}

// Luxury animation constants
const LUXURY_SPRING = { type: "spring", stiffness: 300, damping: 30 };
const LUXURY_EASING = [0.25, 0.1, 0.25, 1];

const Logo = ({ isScrolled, src, alt, href = "/" }: LogoProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Spring animations for smooth transitions
  const scale = useSpring(1, LUXURY_SPRING);
  const brightness = useSpring(1, { stiffness: 400, damping: 30 });
  
  // Animation variants based on scroll state
  
  return (
    <motion.div 
      className="navbar-logo flex items-center h-full"
      initial="normal"
      animate={isScrolled ? "scrolled" : "normal"}
      whileHover="hover"
      onHoverStart={() => {
        setIsHovered(true);
        scale.set(1.02);
        brightness.set(1.15);
      }}
      onHoverEnd={() => {
        setIsHovered(false);
        scale.set(isScrolled ? 0.9 : 1);
        brightness.set(1);
      }}
    >
      <Link 
        href={href} 
        className="relative block focus:outline-none focus:ring-2 focus:ring-gold/50 focus:ring-offset-2 focus:ring-offset-charcoal rounded-sm" 
        aria-label={`${alt} - חזרה לדף הבית`}
      >
        {/* Glow effect container */}
        <motion.div
          className="relative"
          style={{ scale }}
          transition={LUXURY_SPRING}
        >
          {/* Logo Image */}
          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ 
              opacity: imageLoaded ? 1 : 0, 
              filter: imageLoaded ? 'blur(0px)' : 'blur(10px)'
            }}
            transition={{ duration: 0.6, ease: LUXURY_EASING }}
            className="relative"
          >

            <Image 
              src={src}
              alt={alt}
              width={200}
              height={50}
              sizes="(max-width: 768px) 150px, 200px"
              className="h-10 md:h-12 w-auto object-contain select-none"
              priority
              quality={90}
              onLoad={() => setImageLoaded(true)}
              style={{
                filter: `brightness(${brightness.get()})`,
                transition: 'filter 0.3s ease'
              }}
            />
          </motion.div>
          
          {/* Subtle shine effect on hover */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12" />
          </motion.div>
          
          {/* Golden glow on hover */}
          <motion.div
            className="absolute -inset-4 bg-gold/10 blur-xl rounded-full pointer-events-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: isHovered ? 0.5 : 0,
              scale: isHovered ? 1.2 : 0.8
            }}
            transition={{ duration: 0.4, ease: LUXURY_EASING }}
          />
        </motion.div>
        
        {/* Premium underline accent */}
        <motion.div
          className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ 
            scaleX: isHovered ? 1 : 0,
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.3, ease: LUXURY_EASING }}
        />
      </Link>
    </motion.div>
  );
};

export default Logo;