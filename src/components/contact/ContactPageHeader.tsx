// File: src/components/contact/ContactPageHeader.tsx
import React from 'react';

const ContactPageHeader = () => {
  return (
    <section className="pt-32 pb-16 bg-charcoal">
      <div className="container mx-auto px-6 text-center">
        <h1 className="font-heebo text-h2 md:text-h1 mb-6">צור קשר והזמנת תור</h1>
        <p className="max-w-2xl mx-auto text-lightgrey">
          נשמח לארח אתכם במיקום שלנו בשדרות רוטשילד. הזמינו תור בטלפון היום או
          בקשו תור באמצעות הטופס שלהלן. הזמנה מקוונת תהיה זמינה בקרוב.
        </p>
      </div>
    </section>
  );
};

export default ContactPageHeader;