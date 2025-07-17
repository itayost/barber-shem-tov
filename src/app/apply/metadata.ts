// src/app/apply/metadata.ts

import { generatePageMetadata } from '@/components/SEO/generatePageMetadata'

export const metadata = generatePageMetadata({
  title: 'הרשמה לקורס ספרות | טופס הרשמה מהירה',
  description: 'הירשמו עכשיו לקורס ספרות באקדמיה של The Fader! טופס הרשמה קצר, מענה תוך 24 שעות. מספר המקומות מוגבל - הבטיחו את מקומכם היום. ייעוץ חינם: 052-8691415',
  keywords: [
    'הרשמה לקורס ספרות',
    'טופס הרשמה ספרות',
    'הרשמה אונליין ספרות',
    'רישום לקורס ברבר',
    'הרשמה לאקדמיה לספרות',
    'טופס רישום קורס',
    'הרשמה מהירה',
    'רישום לקורס עיצוב שיער',
    'טופס קשר ספרות',
    'הרשמה קורס ספרות טירת הכרמל'
  ],
  canonical: 'https://thefader.co.il/apply',
  pageName: 'apply',
  openGraph: {
    title: 'הרשמה לקורס ספרות The Fader | מקומות אחרונים!',
    description: 'הצטרפו לקורס הספרות המוביל בצפון! הרשמה מהירה בטופס קצר, מענה תוך 24 שעות. התחילו את הקריירה החדשה שלכם עוד היום!',
  }
})