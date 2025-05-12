// File: src/components/contact/ContactPageHeader.tsx
import React from 'react';

interface ContactPageHeaderProps {
  formSubject?: 'service' | 'course';
}

const ContactPageHeader: React.FC<ContactPageHeaderProps> = ({ formSubject = 'service' }) => {
  return (
    <section className="pt-32 pb-16 bg-charcoal">
      <div className="container mx-auto px-6 text-center">
        <h1 className="font-heebo text-h2 md:text-h1 mb-6">
          {formSubject === 'service' 
            ? 'צור קשר והזמנת תור' 
            : 'צור קשר והרשמה לאקדמיה'}
        </h1>
        <p className="max-w-2xl mx-auto text-lightgrey">
          {formSubject === 'service' 
            ? 'נשמח לארח אתכם במיקום שלנו בטירת הכרמל. הזמינו תור בטלפון היום או בקשו תור באמצעות הטופס שלהלן.' 
            : 'מעוניינים במידע נוסף על קורסי האקדמיה שלנו? השאירו את פרטיכם בטופס ואנו ניצור קשר בהקדם כדי לענות על כל שאלותיכם.'}
        </p>
      </div>
    </section>
  );
};

export default ContactPageHeader;