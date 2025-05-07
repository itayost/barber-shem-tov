// File: src/components/home/HeroBackground.tsx
import React from 'react';

interface HeroBackgroundProps {
  imagePath: string;
}

const HeroBackground: React.FC<HeroBackgroundProps> = ({ imagePath }) => {
  return (
    <div className="absolute inset-0 z-0">
      <div 
        className="h-full w-full bg-cover bg-center"
        style={{ 
          backgroundImage: `url("${imagePath}")`, 
          backgroundPosition: 'center 25%'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
    </div>
  );
};

export default HeroBackground;