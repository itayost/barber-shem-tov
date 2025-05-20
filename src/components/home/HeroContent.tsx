import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { academyInfo } from '@/lib/data';
import Button from '@/components/common/Button';

interface HeroContentProps {
  isLoaded: boolean;
}

const HeroContent: React.FC<HeroContentProps> = ({ isLoaded }) => {
  // Simple staggered animation
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      className="container-custom"
      variants={container}
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
    >
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
        {/* Logo */}
        <motion.div 
          variants={item}
          className="mb-8"
        >
          <div className="relative w-56 h-28">
            <Image
              src="/images/logos/logo.png"
              alt={academyInfo.name}
              fill
              priority
              sizes="(max-width: 640px) 100vw, 14rem"
              className="object-contain"
            />
          </div>
        </motion.div>
        
        
        {/* Subheader */}
        <motion.p 
          variants={item}
          className="text-lightgrey text-lg md:text-xl mb-12 max-w-xl"
        >
          המקום המוביל להכשרת ספרים מקצועיים בישראל
        </motion.p>
        
        {/* Two buttons */}
        <motion.div 
          variants={item}
          className="flex flex-col sm:flex-row gap-6"
        >
          <Button 
            href="/courses" 
            variant="primary"
            className="px-8 py-4 text-base"
          >
            הקורסים שלנו
          </Button>
          
          <Button 
            href="/contact?subject=academy" 
            variant="secondary"
            className="px-8 py-4 text-base"
          >
            דבר איתנו
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroContent;