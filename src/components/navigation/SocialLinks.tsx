'use client';

import Image from 'next/image';

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
          className="text-lightgrey hover:text-gold transition-colors duration-200 p-2"
          aria-label="אינסטגרם"
        >
          <Image src="/icons/Instagram.svg" alt="Instagram" width={20} height={20} className="w-5 h-5" />
        </a>
      )}
      {social.facebook && (
        <a 
          href={social.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lightgrey hover:text-gold transition-colors duration-200 p-2"
          aria-label="פייסבוק"
        >
          <Image src="/icons/Facebook.svg" alt="Facebook" width={20} height={20} className="w-5 h-5" />
        </a>
      )}
      {social.tiktok && (
        <a 
          href={social.tiktok}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lightgrey hover:text-gold transition-colors duration-200 p-2"
          aria-label="טיקטוק"
        >
          <Image src="/icons/Tiktok.svg" alt="Tiktok" width={20} height={20} className="w-5 h-5" />
        </a>
      )}
    </>
  );
};

export default SocialLinks;