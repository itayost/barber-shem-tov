'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  isScrolled: boolean;
  src: string;
  alt: string;
  href?: string;
}

const Logo = ({ isScrolled, src, alt, href = "/" }: LogoProps) => {
  // Animation variants based on scroll state
  const logoVariants = {
    normal: { scale: 1 },
    scrolled: { scale: 0.85 }
  };

  // Calculate responsive dimensions
  const logoHeight = isScrolled ? 'h-12' : 'h-16';
  const imageWidth = isScrolled ? 180 : 240;
  const imageHeight = isScrolled ? 64 : 64;
  
  return (
    <motion.div 
      className="flex-shrink-0 flex items-center"
      initial="normal"
      animate={isScrolled ? "scrolled" : "normal"}
      variants={logoVariants}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <Link 
        href={href} 
        className="relative z-10 inline-block focus:outline-none focus-visible" 
        aria-label={`${alt} - Return to homepage`}
      >
        <div className={`transition-all duration-300 ${logoHeight} overflow-hidden`}>
          <Image 
            src={src}
            alt={alt}
            width={imageWidth}
            height={imageHeight}
            className="h-full w-auto object-contain hover-scale transition-all duration-300"
            priority
            quality={90}
          />
        </div>
      </Link>
    </motion.div>
  );
};

export default Logo;