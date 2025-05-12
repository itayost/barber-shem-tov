// File: src/components/academy/AcademyCtaSection.tsx
import React from 'react';
import Button from '@/components/common/Button';

interface AcademyCtaSectionProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

const AcademyCtaSection: React.FC<AcademyCtaSectionProps> = ({
  title = 'מוכן להתחיל את הקריירה שלך בספרות?',
  description = 'צור איתנו קשר היום כדי לדון באפשרויות הקורסים שלנו ולמצוא את המסלול המתאים ביותר למטרות שלך. הצוות שלנו מוכן לענות על כל השאלות שלך ולעזור לך להתחיל.',
  buttonText = 'פנה לייעוץ אישי',
  buttonLink = '/contact?subject=academy',
}) => {
  return (
    <section className="py-section-mobile md:py-section bg-brown bg-opacity-10 relative" dir="rtl">
      {/* Background pattern/overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-pattern"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heebo text-h3 mb-6">{title}</h2>
          <p className="text-lightgrey mb-10">{description}</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href={buttonLink} variant="primary">
              {buttonText}
            </Button>
            <Button href="/gallery" variant="secondary">
              צפה בעבודות הסטודנטים
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcademyCtaSection;