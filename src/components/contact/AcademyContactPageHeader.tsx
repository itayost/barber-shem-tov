// File: src/components/contact/AcademyContactPageHeader.tsx
import React from 'react';

interface AcademyContactPageHeaderProps {
  inquiryType: 'course' | 'info';
}

const AcademyContactPageHeader: React.FC<AcademyContactPageHeaderProps> = ({ inquiryType }) => {
  // Different content based on inquiry type
  const content = {
    course: {
      title: 'הרשמה לקורסים',
      description: 'מלא את הטופס כדי להתחיל את המסע המקצועי שלך בעולם הספרות. הצוות המקצועי שלנו יצור איתך קשר בהקדם לתאום פגישת ייעוץ אישית.',
    },
    info: {
      title: 'צור קשר עם האקדמיה',
      description: 'מעוניין במידע נוסף על האקדמיה שלנו? השאר את פרטיך ואחד מהיועצים המקצועיים שלנו יחזור אליך בהקדם עם כל המידע שאתה צריך.',
    }
  };

  return (
    <section className="pt-32 pb-16 bg-charcoal">
      <div className="container mx-auto px-6 text-center">
        <div className="inline-block text-gold text-sm font-medium px-4 py-1 border border-gold border-opacity-30 mb-4">
          {inquiryType === 'course' ? 'תחילת הרשמה' : 'שאלות ומידע'}
        </div>
        
        <h1 className="font-heebo text-h2 md:text-h1 mb-6">
          {content[inquiryType].title}
        </h1>
        
        <p className="max-w-2xl mx-auto text-lightgrey">
          {content[inquiryType].description}
        </p>
      </div>
    </section>
  );
};

export default AcademyContactPageHeader;