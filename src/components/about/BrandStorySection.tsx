// File: src/components/about/BrandStorySection.tsx
import React from 'react';
import Image from 'next/image';

interface BrandStoryProps {
  imageSrc?: string;
  foundingYear?: string;
  paragraphs?: string[];
}

const BrandStorySection: React.FC<BrandStoryProps> = ({ 
  imageSrc = '/images/barbershop-interior.jpg', // Default image path in public folder
  foundingYear = '2023',
  paragraphs = [
    'נוסדנו בשנת 2023, המספרה שלנו מביאה גישה מעודנת לטיפוח גברים בתל אביב. יצרנו מרחב שבו טכניקות ספרות מסורתיות משתלבות בצורה חלקה עם סגנון ונוחות עכשוויים.',
    'החזון שלנו משלב את תחושת הקהילה של מספרות קלאסיות עם החוויה המרוממת של יוקרה מודרנית. כל פרט - מכיסאות העור המותאמים אישית ועד מוצרי הטיפוח שנבחרו בקפידה - נבחר כדי לשפר את הזמן שלכם איתנו.',
    'כשאתם מבקרים, צפו ליותר מסתם שירות. מהרגע שאתם נכנסים, תתקבלו במרחב שעוצב עבור נוחות ותחכום כאחד. קחו רגע להירגע עם משקה חינם לפני תחילת התור שלכם.'
  ]
}) => {
  // Insert the founding year into the first paragraph if needed
  const processedParagraphs = paragraphs.map((paragraph, index) => {
    if (index === 0 && foundingYear && !paragraph.includes(foundingYear)) {
      return paragraph.replace('נוסדנו בשנת', `נוסדנו בשנת ${foundingYear},`);
    }
    return paragraph;
  });

  return (
    <section className="py-section-mobile md:py-section bg-charcoal overflow-hidden" dir="rtl">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-10">
            <h2 className="font-heebo text-h3 text-gold mb-6">
              הסיפור שלנו
            </h2>
            
            {processedParagraphs.map((paragraph, index) => (
              <p 
                key={`paragraph-${index}`}
                className={`text-lightgrey ${index < processedParagraphs.length - 1 ? 'mb-6' : ''}`}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="order-first lg:order-last relative">
            {/* Gold border decoration */}
            <div className="absolute -top-3 -right-3 w-full h-full border-2 border-gold opacity-40"></div>
            
            <div className="relative aspect-square overflow-hidden">
              <Image 
                src={imageSrc}
                alt="פנים המספרה"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStorySection;