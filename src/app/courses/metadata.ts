// src/app/courses/metadata.ts

import { generatePageMetadata } from '@/components/SEO/generatePageMetadata'

export const metadata = generatePageMetadata({
  title: 'קורסי ספרות מקצועיים | קורס ספרות בסיסי ומתקדם',
  description: 'קורס ספרות בסיסי 8-9 שבועות כולל ערכת כלים. מאסטרקלאס למתקדמים - סדנת יומיים אינטנסיבית.  למידה מעשית, תעודה מוכרת וליווי לקריירה.',
  keywords: [
    'קורס ספרות',
    'קורס ספרות בסיסי',
    'קורס ברבר',
    'מאסטרקלאס ספרות',
    'קורס עיצוב שיער',
    'לימודי ספרות מחיר',
    'קורס ספרות 8 שבועות',
    'השתלמות ספרים',
    'קורס פייד',
    'לימודי ציורי ראש',
    'קורס ספרות טירת הכרמל'
  ],
  canonical: 'https://thefader.co.il/courses',
  pageName: 'courses',
  openGraph: {
    title: 'קורסי ספרות The Fader | מבצע הרשמה מוקדמת',
    description: 'הצטרף לקורס הספרות המוביל בצפון! קורס בסיסי מקיף או מאסטרקלאס למתקדמים. מקומות מוגבלים - הירשמו עכשיו!',
  }
})