// src/components/common/OptimizedImage.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
  quality?: number;
}

// Blur placeholder generator
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str);

export default function OptimizedImage({
  src,
  alt,
  width = 800,
  height = 600,
  priority = false,
  className = '',
  sizes,
  quality = 75,
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  // Generate optimized sizes based on viewport
  const optimizedSizes =
    sizes ||
    `
    (max-width: 640px) 100vw,
    (max-width: 1024px) 50vw,
    33vw
  `;

  // Use WebP/AVIF if available
  useEffect(() => {
    const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    const avifSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.avif');

    // Check AVIF support
    const checkAvif = new Promise(resolve => {
      const avif = new window.Image();
      avif.onload = () => resolve(true);
      avif.onerror = () => resolve(false);
      avif.src =
        'data:image/avif;base64,AAAAFGZ0eXBhdmlmAAAAAG1pZjEAAACgbWV0YQAAAAAAAAAOcGl0bQAAAAAAAQAAAB5pbG9jAAAAAEQAAAEAAQAAAAEAAAC8AAAAGwAAACNpaW5mAAAAAAABAAAAFWluZmUCAAAAAAEAAGF2MDEAAAAARWlwcnAAAAAoaXBjbwAAABRpc3BlAAAAAAAAAAQAAAAEAAAADGF2MUOBAAAAAAAAFWlwbWEAAAAAAAAAAQABAgECAAAAI21kYXQSAAoIP8R8hAQ0BUAyDWeeUy0JG+QAACANEkA=';
    });

    checkAvif.then(supportsAvif => {
      if (supportsAvif) {
        setImageSrc(avifSrc);
      } else {
        // Fallback to WebP
        const webp = new window.Image();
        webp.onload = () => setImageSrc(webpSrc);
        webp.onerror = () => setImageSrc(src);
        webp.src = webpSrc;
      }
    });
  }, [src]);

  return (
    <div className={`relative ${className}`}>
      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        sizes={optimizedSizes}
        quality={quality}
        priority={priority}
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(width, height))}`}
        className={`${isLoading ? 'scale-105 blur-lg' : 'scale-100 blur-0'} transition-all duration-700`}
        onLoadingComplete={() => setIsLoading(false)}
        loading={priority ? 'eager' : 'lazy'}
      />
    </div>
  );
}
