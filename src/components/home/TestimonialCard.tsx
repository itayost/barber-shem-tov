// components/home/TestimonialCard.tsx
'use client';

import React from 'react';
import Image from 'next/image';

interface TestimonialCardProps {
  id: number;
  name: string;
  text: string;
  rating: number;
  course: string;
  instructor: string;
  image: string;
  year: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  text,
  rating,
  course,
  instructor,
  image,
  year
}) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-lg ${i < rating ? 'text-gold' : 'text-gray-600'}`}>
        ★
      </span>
    ));
  };

  return (
    <div className="bg-charcoal border border-gold/10 overflow-hidden h-full flex flex-col">
      {/* Big Image Header */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            if (target.parentElement) {
              target.parentElement.innerHTML = `
                <div class="w-full h-full bg-gradient-to-br from-gold/10 to-brown/10 flex items-center justify-center">
                  <div class="text-center">
                    <div class="w-24 h-24 mx-auto rounded-full bg-gold/20 flex items-center justify-center text-gold text-4xl font-bold">
                      ${name.charAt(0)}
                    </div>
                    <div class="text-gold mt-3">${name}</div>
                  </div>
                </div>
              `;
            }
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />
        
        {/* Quote Icon */}
        <div className="absolute top-4 right-4 text-gold/30 text-5xl font-serif">
          &ldquo;
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Rating */}
        <div className="flex gap-1 mb-4">
          {renderStars(rating)}
        </div>

        {/* Testimonial Text */}
        <blockquote className="text-lightgrey text-base leading-relaxed mb-6 italic flex-grow">
          &ldquo;{text}&rdquo;
        </blockquote>

        {/* Author Info */}
        <div className="border-t border-gold/20 pt-4 mt-auto">
          <h4 className="text-xl font-bold text-offwhite mb-1">
            {name}
          </h4>
          <p className="text-gold text-sm mb-1">
            בוגר {year} • {course}
          </p>
          <p className="text-lightgrey/60 text-sm">
            מדריך: {instructor}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;