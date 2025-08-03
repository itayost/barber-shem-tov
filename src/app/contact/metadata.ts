// src/app/contact/metadata.ts

import { generatePageMetadata } from '@/components/SEO/generatePageMetadata'

export const metadata = generatePageMetadata({
  title: 'צור קשר | האקדמיה לספרות The Fader טירת הכרמל',
  description: 'צרו קשר לייעוץ והרשמה לקורסי ספרות. טלפון: 052-8691415 | כתובת: העצמאות 4, טירת הכרמל | שעות: ראשון-חמישי 9:00-19:00, שישי 9:00-14:00. מענה מהיר בוואטסאפ!',
  keywords: [
    'צור קשר אקדמיה לספרות',
    'הרשמה לקורס ספרות',
    'טלפון אקדמיה לספרות',
    'כתובת אקדמיה לספרות',
    'העצמאות 4 טירת הכרמל',
    'שעות פתיחה מספרה',
    'וואטסאפ ספרות',
    'ייעוץ קורס ספרות',
    'The Fader טירת הכרמל',
    'איך להגיע'
  ],
  canonical: 'https://thefader.co.il/contact',
  pageName: 'contact',
  openGraph: {
    title: 'צור קשר - The Fader | ייעוץ והרשמה לקורסים',
    description: 'התקשרו עכשיו: 052-8691415 | וואטסאפ זמין | העצמאות 4, טירת הכרמל',
  }
})