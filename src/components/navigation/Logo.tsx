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
  
  return (
    <motion.div 
      className="navbar-logo flex items-center h-full"
      initial="normal"
      animate={isScrolled ? "scrolled" : "normal"}
      variants={logoVariants}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        duration: 0.3
      }}
    >
      <Link 
        href={href} 
        className="focus-ring block" 
        aria-label={`${alt} - Return to homepage`}
      >
        <Image 
          src={src}
          alt={alt}
          width={200}
          height={50}
          className="h-10 md:h-12 w-auto object-contain"
          priority
          quality={90}
        />
      </Link>
    </motion.div>
  );
};

export default Logo;