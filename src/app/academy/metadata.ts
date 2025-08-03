// src/app/academy/metadata.ts

import { generatePageMetadata } from '@/components/SEO/generatePageMetadata'

export const metadata = generatePageMetadata({
  title: 'האקדמיה לספרות | קורסים מקצועיים והכשרת ספרים',
  description: 'האקדמיה המובילה להכשרת ספרים מקצועיים. למעלה מ-100 בוגרים מצליחים, 92% השמה בתעסוקה, תוכניות לימוד מקיפות עם התנסות מעשית על 20+ לקוחות אמיתיים. הצטרף למהפכה בעולם הספרות.',
  keywords: [
    'אקדמיה לספרות',
    'בית ספר לספרות',
    'הכשרת ספרים',
    'קורס ספרות מקצועי',
    'לימודי ברבר',
    'הסמכת ספרים',
    'תעודת ספר',
    'קורס ספרות טירת הכרמל',
    'בר שם טוב',
    'לימודי עיצוב שיער גברים'
  ],
  canonical: 'https://thefader.co.il/academy',
  pageName: 'academy',
  openGraph: {
    title: 'האקדמיה לספרות The Fader | הכשרה מקצועית לספרים',
    description: 'גלה את האקדמיה שמכשירה את הדור הבא של הספרים המובילים. תוכניות לימוד מקיפות, מדריכים מנוסים וליווי אישי לקריירה מצליחה.',
  }
})