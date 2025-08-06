import { generatePageMetadata } from '@/components/SEO/generatePageMetadata'

export const metadata = generatePageMetadata({
  title: 'The Fader - אקדמיה מקצועית לספרות | למד ספרות בטירת הכרמל',
  description: 'האקדמיה המובילה לספרות בצפון. קורסים מקצועיים לספרים מתחילים ומתקדמים, הכשרה מעשית עם 20+ לקוחות, ציוד מקצועי וליווי לקריירה. הצטרף לבוגרים המצליחים שלנו!',
  keywords: [
    'אקדמיה לספרות',
    'קורס ספרות',
    'לימודי ספרות',
    'קורס ברבר',
    'לימודי ברבר',
    'קורס עיצוב שיער',
    'ספרות מקצועית',
    'טירת הכרמל',
    'בית ספר לספרות',
    'The Fader',
    'בר שם טוב',
    'קורס פייד',
    'הכשרת ספרים'
  ],
  canonical: 'https://thefader.co.il',
  pageName: '',
  openGraph: {
    title: 'The Fader - האקדמיה המובילה לספרות בצפון',
    description: 'הצטרפו לאקדמיה המקצועית ביותר לספרות. קורסים מקיפים עם התנסות על 20+ לקוחות, ציוד מתקדם וליווי אישי לקריירה מצליחה. מעל 100 בוגרים מצליחים!',
    images: ['https://thefader.co.il/images/og/home-og.webp']
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Fader - אקדמיה מקצועית לספרות',
    description: 'למד ספרות מקצועית באקדמיה המובילה בצפון. קורסים מקיפים, התנסות מעשית וליווי לקריירה. הירשמו עכשיו!'
  }
})