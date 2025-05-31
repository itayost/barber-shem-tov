// components/home/ImageCourseCard.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Button from '@/components/common/Button';

interface ImageCourseCardProps {
  type: string; // "Diploma | Full time"
  title: string; // "Hairstylist"
  subtitle: string; // "MAJOR PROGRAM"
  duration: string; // "40 Weeks | Hairstyling & Barbering"
  imageUrl: string;
  enrollLink?: string;
  index?: number;
}

const ImageCourseCard: React.FC<ImageCourseCardProps> = ({
  type,
  title,
  subtitle,
  duration,
  imageUrl,
  enrollLink = '/contact',
  index = 0
}) => {
  return (
    <motion.div
      className="relative overflow-hidden group min-h-[600px] bg-charcoal flex items-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70 group-hover:bg-black/60 transition-colors duration-500" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-8 py-12 text-center">
        {/* Spacer */}
        <div className="h-12" />

        {/* Type Badge */}
        <motion.p 
          className="text-gold text-sm uppercase tracking-wider mb-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {type}
        </motion.p>

        {/* Animated Title/Subtitle */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-offwhite mb-2">
            {title}
          </h2>
          <p className="text-xl md:text-2xl text-gold/80 uppercase tracking-wide">
            {subtitle}
          </p>
        </motion.div>

        {/* Duration */}
        <motion.p 
          className="text-lightgrey text-lg mb-12 font-medium"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {duration}
        </motion.p>

        {/* Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {/* Enroll Button */}
          <Button
            href={enrollLink}
            variant="primary"
            size="large"
            className="min-w-[160px]"
          >
            הרשמה
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ImageCourseCard;