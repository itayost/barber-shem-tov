// components/gallery/GalleryFooter.tsx
import React from 'react';
import Button from '@/components/common/Button';

interface GalleryFooterProps {
  message?: string;
  buttonText?: string;
  buttonLink?: string;
}

const GalleryFooter: React.FC<GalleryFooterProps> = ({
  message = 'אנו מאמינים שהאווירה חשובה לא פחות מהשירות עצמו. נשמח לארח אתכם לחוות זאת ממקור ראשון.',
  buttonText = 'הזמן את הביקור שלך',
  buttonLink = '/contact'
}) => {
  return (
    <div className="mt-16 text-center">
      <p className="text-lightgrey mb-8">
        {message}
      </p>
      <Button href={buttonLink} variant="primary">
        {buttonText}
      </Button>
    </div>
  );
};

export default GalleryFooter;