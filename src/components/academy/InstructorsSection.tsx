import React from 'react';
import Image from 'next/image';
import { instructors as InstructorType } from '@/lib/data';
import Button from '../common/Button';

interface InstructorsSectionProps {
  instructors: typeof InstructorType;
}

const InstructorsSection: React.FC<InstructorsSectionProps> = ({ instructors }) => {
  return (
    <section className="py-section-mobile md:py-section bg-brown bg-opacity-5 relative overflow-hidden" dir="rtl">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-pattern"></div>
      </div>
      
      <div className="container-custom relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-block text-gold text-small font-medium px-4 py-1 border border-gold border-opacity-30 mb-4">
            הצוות המקצועי
          </div>
          <h2 className="section-title">הכירו את <span className="text-gold">המדריכים שלנו</span></h2>
          <p className="max-w-2xl mx-auto text-lightgrey" style={{ lineHeight: 'var(--hebrew-line-height)' }}>
            הצוות שלנו מורכב ממומחים מובילים בתעשייה, בעלי ניסיון עשיר וידע מקצועי
            שמקדישים את עצמם להצלחת התלמידים שלנו
          </p>
        </div>
        
        {/* Instructors grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {instructors.map((instructor) => (
            <div key={instructor.id} className="luxury-card overflow-hidden transition-all duration-300 hover:-translate-y-2 flex flex-col h-full">
              {/* Instructor image */}
              <div className="relative h-80 overflow-hidden">
                {instructor.image ? (
                  <Image
                    src={instructor.image}
                    alt={instructor.name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-brown/30 flex items-center justify-center">
                    <span className="text-gold text-h3">{instructor.name.charAt(0)}</span>
                  </div>
                )}
              </div>
              
              {/* Instructor info */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-heebo text-h4 mb-2">{instructor.name}</h3>
                <p className="text-gold text-small mb-4">{instructor.title}</p>
                
                <p className="text-lightgrey mb-6 flex-grow" style={{ lineHeight: 'var(--hebrew-line-height)' }}>
                  {instructor.bio.length > 150 
                    ? `${instructor.bio.substring(0, 150)}...` 
                    : instructor.bio}
                </p>
                
                {/* Expertise tags */}
                {instructor.expertise && instructor.expertise.length > 0 && (
                  <div className="mb-5">
                    <p className="text-lightgrey mb-2 text-small">תחומי מומחיות:</p>
                    <div className="flex flex-wrap gap-2">
                      {instructor.expertise.slice(0, 4).map((expertise, index) => (
                        <span 
                          key={index}
                          className="bg-charcoal text-gold px-3 py-1 text-small rounded-sm"
                        >
                          {expertise}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <Button
                  href={`/academy/instructors/${instructor.id}`}
                  variant="tertiary"
                  className="self-end mt-auto"
                >
                  פרופיל מלא
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstructorsSection;