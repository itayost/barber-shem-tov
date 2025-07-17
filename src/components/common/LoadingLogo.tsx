// src/components/common/LoadingLogo.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface LoadingLogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
}

const LoadingLogo: React.FC<LoadingLogoProps> = ({ 
  size = 'medium', 
  showText = true 
}) => {
  const sizeMap = {
    small: 60,
    medium: 100,
    large: 150,
  };

  const logoSize = sizeMap[size];

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px]">
      {/* Logo with pulsing animation */}
      <motion.div
        className="relative"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Image
          src="/images/logos/logo.png"
          alt="The Fader Logo"
          width={logoSize}
          height={logoSize}
          className="object-contain"
          priority
        />
        
        {/* Golden glow effect */}
        <motion.div
          className="absolute inset-0 bg-gold/20 blur-xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Loading text */}
      {showText && (
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-gold font-bold text-xl mb-2">The Fader</h3>
          <div className="flex items-center gap-1">
            <span className="text-lightgrey text-sm">טוען</span>
            <motion.span
              className="flex gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-1 h-1 bg-gold rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.span>
          </div>
        </motion.div>
      )}

      {/* Optional progress bar */}
      <motion.div
        className="mt-6 w-32 h-1 bg-charcoal-light rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-gold/50 to-gold"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            width: '50%',
          }}
        />
      </motion.div>
    </div>
  );
};

export default LoadingLogo;