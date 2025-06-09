'use client';

import Image from 'next/image';
import { transitions } from '@/styles';

interface SocialLinksProps {
  social: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
  };
}

const SocialLinks = ({ social }: SocialLinksProps) => {
  return (
    <>
      {social.instagram && (
        <a 
          href={social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
          aria-label="אינסטגרם"
          style={{ transition: `all ${transitions.fast} ease` }}
        >
          <Image 
            src="/icons/Instagram.svg" 
            alt="Instagram" 
            width={20} 
            height={20} 
            className="social-link-icon" 
          />
        </a>
      )}
      {social.facebook && (
        <a 
          href={social.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
          aria-label="פייסבוק"
          style={{ transition: `all ${transitions.fast} ease` }}
        >
          <Image 
            src="/icons/Facebook.svg" 
            alt="Facebook" 
            width={20} 
            height={20} 
            className="social-link-icon" 
          />
        </a>
      )}
      {social.tiktok && (
        <a 
          href={social.tiktok}
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
          aria-label="טיקטוק"
          style={{ transition: `all ${transitions.fast} ease` }}
        >
          <Image 
            src="/icons/Tiktok.svg" 
            alt="Tiktok" 
            width={20} 
            height={20} 
            className="social-link-icon" 
          />
        </a>
      )}
    </>
  );
};

export default SocialLinks;