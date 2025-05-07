import { Heebo } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

// Hebrew font setup
const heebo = Heebo({
  subsets: ['hebrew'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-heebo',
  display: 'swap',
});

export const metadata = {
  title: 'The Fader | ספר מודרני ויוקרתי בטירת הכרמל',
  description: 'חווית הספרות המובילה של הצפון, שבה אומנות מסורתית פוגשת סגנון עכשווי. הזמינו תור עוד היום.',
  metadataBase: new URL('https://barber-shem-tov.vercel.app'),
  
  // Enhanced Open Graph metadata
  openGraph: {
    title: 'The Fader | ספר מודרני ויוקרתי בטירת הכרמל',
    description: 'חווית הספרות המובילה של הצפון, שבה אומנות מסורתית פוגשת סגנון עכשווי.',
    url: 'https://barber-shem-tov.vercel.app',
    siteName: 'The Fader Barbershop',
    locale: 'he_IL',
    type: 'website',
    images: [
      {
        url: '/images/hero-barbershop.jpg',
        width: 1200,
        height: 630,
        alt: 'The Fader - מספרה בטירת הכרמל',
      },
    ],
  },
  
  // Enhanced Twitter Card metadata
  twitter: {
    card: 'summary_large_image',
    title: 'The Fader | ספר מודרני ויוקרתי בטירת הכרמל',
    description: 'חווית הספרות המובילה של הצפון. הזמינו תור עוד היום.',
    images: ['/images/hero-barbershop.jpg'],
    creator: '@TheFaderBarber', // Add your Twitter handle if available
    site: '@TheFaderBarber',    // Add your Twitter handle if available
  },
  
  // Enhanced robots metadata
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  
  // Alternate and canonical URLs
  alternates: {
    canonical: 'https://barber-shem-tov.vercel.app',
    languages: {
      'he-IL': 'https://barber-shem-tov.vercel.app',
      // Add additional language URLs if you have them
    },
  },
  
  // App icons
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
    shortcut: '/shortcut-icon.png'
  },
  
  // Web app manifest
  manifest: '/site.webmanifest',
  
  // Theme color
  themeColor: '#1A1A1A', // Using your deep charcoal color from the style guide
  
  // Additional verification (uncomment and fill in if you have these)
  // verification: {
  //   google: 'your-google-verification-id',
  //   yandex: 'your-yandex-verification-id',
  // },
  
  // App info (if applicable)
  // appleWebApp: {
  //   title: 'The Fader Barbershop',
  //   statusBarStyle: 'black-translucent',
  //   capable: true,
  // },
  
  // Format detection (disable automatic phone/email detection if you prefer)
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable}`}>
      <body className="bg-charcoal text-offwhite font-heebo">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}