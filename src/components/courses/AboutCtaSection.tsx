// File: src/components/about/AboutCtaSection.tsx
import React from 'react';
import Button from '@/components/common/Button';

interface AboutCtaSectionProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

const AboutCtaSection: React.FC<AboutCtaSectionProps> = ({
  title = 'חווה זאת בעצמך',
  description = 'אנו מאמינים שהאווירה חשובה לא פחות מהשירות עצמו. נשמח לארח אתכם לחוות זאת ממקור ראשון.',
  buttonText = 'הזמן את הביקור שלך',
  buttonLink = '/contact'
}) => {
  return (
    <section className="py-section-mobile md:py-section bg-brown bg-opacity-10" dir="rtl">
      <div className="container mx-auto px-6 text-center">
        <h2 className="font-heebo text-h3 mb-6">{title}</h2>
        <p className="max-w-2xl mx-auto text-lightgrey mb-8">
          {description}
        </p>
        <Button href={buttonLink} variant="primary">
          {buttonText}
        </Button>
      </div>
    </section>
  );
};

export default AboutCtaSection;