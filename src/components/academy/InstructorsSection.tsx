// File: src/components/academy/InstructorsSection.tsx
import React from 'react';
import Image from 'next/image';

interface Instructor {
  id: string;
  name: string;
  title: string;
  bio: string;
  image?: string;
}

interface InstructorsSectionProps {
  instructors: Instructor[];
}

const InstructorsSection: React.FC<InstructorsSectionProps> = ({ instructors = [] }) => {
  return (
    <section className="py-section-mobile md:py-section bg-brown bg-opacity-5" dir="rtl">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heebo text-h3 mb-6">המדריכים שלנו</h2>
          <p className="max-w-2xl mx-auto text-lightgrey">
            הצוות שלנו מורכב ממקצוענים מובילים בתעשייה עם שנים של ניסיון. 
            הם לא רק ספרים מעולים, אלא גם מורים מסורים שאוהבים להעביר את הידע שלהם לדור הבא.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {instructors && instructors.length > 0 ? (
            instructors.map((instructor) => (
              <InstructorCard key={instructor.id} instructor={instructor} />
            ))
          ) : (
            <div className="col-span-3 text-center">
              <p className="text-lightgrey">מידע על המדריכים יתווסף בקרוב.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// Instructor Card Component
interface InstructorCardProps {
  instructor: Instructor;
}

const InstructorCard: React.FC<InstructorCardProps> = ({ instructor }) => {
  return (
    <div className="text-center">
      {/* Instructor image */}
      <div className="relative w-56 h-56 mx-auto rounded-full overflow-hidden mb-6 border-2 border-gold border-opacity-20">
        {instructor.image ? (
          <Image
            src={instructor.image}
            alt={instructor.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-brown bg-opacity-20 flex items-center justify-center">
            <span className="text-gold text-h4">{instructor.name.charAt(0)}</span>
          </div>
        )}
      </div>
      
      {/* Instructor info */}
      <h3 className="font-heebo text-h4 mb-2">{instructor.name}</h3>
      <p className="text-gold mb-4">{instructor.title}</p>
      <p className="text-lightgrey">{instructor.bio}</p>
    </div>
  );
};

export default InstructorsSection;