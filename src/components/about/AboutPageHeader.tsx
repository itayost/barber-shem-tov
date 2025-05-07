// File: src/components/about/AboutPageHeader.tsx
import React from 'react';

const AboutPageHeader = () => {
  return (
    <section className="pt-32 pb-16 bg-charcoal">
      <div className="container mx-auto px-6 text-center">
        <h1 className="font-heebo text-h2 md:text-h1 mb-6">אודות</h1>
        <p className="max-w-2xl mx-auto text-lightgrey">
          המקום בו טכניקה מדויקת פוגשת שירות קשוב, מציע יותר
          מסתם תספורת - מפלט מהשגרה.
        </p>
      </div>
    </section>
  );
};

export default AboutPageHeader;