// src/app/gallery/metadata.ts

import { generatePageMetadata } from '@/components/SEO/generatePageMetadata'

export const metadata = generatePageMetadata({
  title: 'גלריית עבודות | תמונות לפני ואחרי תספורות וקורסים',
  description: 'גלריית עבודות מרשימה של תלמידי האקדמיה ותספורות מהמספרה. צפו בתוצאות מדהימות של פיידים, ציורי ראש, עיצובי זקן ועבודות הבוגרים שלנו. השראה לתספורת הבאה שלכם!',
  keywords: [
    'תספורות גברים',
    'גלריית תספורות',
    'פייד תמונות',
    'ציורי ראש',
    'עיצוב זקן',
    'תספורות מודרניות',
    'עבודות תלמידים',
    'לפני ואחרי תספורת',
    'תספורות 2024',
    'ברבר טירת הכרמל',
    'השראה לתספורת'
  ],
  canonical: 'https://thefader.co.il/gallery',
  pageName: 'gallery',
  openGraph: {
    title: 'גלריית עבודות The Fader | תספורות ועבודות תלמידים',
    description: 'השראה לתספורת הבאה! צפו בעבודות המדהימות של הספרים והתלמידים שלנו - פיידים מושלמים, ציורי ראש יצירתיים ועיצובי זקן מקצועיים.',
    images: ['/images/og/gallery-og.jpg'] // כדאי ליצור תמונת קולאז' מיוחדת לגלריה
  }
})