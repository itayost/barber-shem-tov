// components/gallery/GalleryPageHeader.tsx
import React from 'react';

interface GalleryPageHeaderProps {
  title?: string;
  description?: string;
}

const GalleryPageHeader: React.FC<GalleryPageHeaderProps> = ({
  title = 'גלריה',
  description = 'הציצו למרחב המעוצב שלנו. יצרנו סביבה שבה אלמנטים מסורתיים של מספרה פוגשים עיצוב מודרני, המספקים גם נוחות וגם תחכום במהלך הביקור שלכם.'
}) => {
  return (
    <section className="pt-32 pb-16 bg-charcoal">
      <div className="container mx-auto px-6 text-center">
        <h1 className="font-heebo text-h2 md:text-h1 mb-6">{title}</h1>
        <p className="max-w-2xl mx-auto text-lightgrey">
          {description}
        </p>
      </div>
    </section>
  );
};

export default GalleryPageHeader;