// src/components/home/GalleryPreview.tsx
'use client';

import React from 'react';
import { LuxurySection, LuxuryButton, EditorialGrid, EditorialCard } from '@/components/luxury';

const GalleryPreview: React.FC = () => {
  return (
    <LuxurySection
      label="גלריה"
      title="עבודות"
      accent="נבחרות"
      subtitle="הצצה לעבודות המרשימות של תלמידינו ובוגרינו"
      size="large"
      bgColor="black"
    >
      <EditorialGrid columns={3} gap="tight" className="mt-16">
        {[1, 2, 3, 4, 5, 6].map(num => (
          <EditorialCard
            key={num}
            image={`/images/gallery/work-${num}.jpg`}
            title=""
            aspectRatio="1/1"
            showBorder={false}
            hoverEffect="zoom"
            href="/gallery"
          />
        ))}
      </EditorialGrid>

      <div className="text-center mt-12">
        <LuxuryButton variant="outline" href="/gallery">
          צפה בגלריה המלאה
        </LuxuryButton>
      </div>
    </LuxurySection>
  );
};

export default GalleryPreview;
