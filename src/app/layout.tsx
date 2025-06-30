// src/app/layout.tsx
import { Heebo } from 'next/font/google';
import './globals.css';
import LuxuryNavbar from '@/components/luxury/LuxuryNavbar';
import LuxuryFooter from '@/components/luxury/LuxuryFooter';
import WhatsAppFloat from '@/components/common/WhatsAppFloat';

// Hebrew font setup - using lighter weights for luxury feel
const heebo = Heebo({
  subsets: ['hebrew'],
  weight: ['100', '300', '400'], // Only thin and light weights
  variable: '--font-heebo',
  display: 'swap',
});

export const metadata = {
  title: 'The Fader | אקדמיה לספרות יוקרתית',
  description:
    'חווית הלמידה המובילה בתחום הספרות המקצועית. הצטרפו לאקדמיה שמעצבת את אמני הספרות של המחר.',
  metadataBase: new URL('https://barber-shem-tov.vercel.app'),

  openGraph: {
    title: 'The Fader | אקדמיה לספרות יוקרתית',
    description: 'חווית הלמידה המובילה בתחום הספרות המקצועית',
    url: 'https://barber-shem-tov.vercel.app',
    siteName: 'The Fader Academy',
    locale: 'he_IL',
    type: 'website',
    images: [
      {
        url: '/images/og/luxury-og.jpg',
        width: 1200,
        height: 630,
        alt: 'The Fader Academy - Luxury Barbering Education',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'The Fader | אקדמיה לספרות יוקרתית',
    description: 'חווית הלמידה המובילה בתחום הספרות המקצועית',
    images: ['/images/og/luxury-og.jpg'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  alternates: {
    canonical: 'https://barber-shem-tov.vercel.app',
    languages: {
      'he-IL': 'https://barber-shem-tov.vercel.app',
    },
  },
};

export const viewport = {
  themeColor: '#000000', // Pure black for luxury
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable}`}>
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        {/* Luxury favicon set */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        <meta name="apple-mobile-web-app-title" content="The Fader" />
        <meta name="application-name" content="The Fader Academy" />
      </head>

      <body className="bg-black text-offwhite font-heebo font-light antialiased">
        {/* Skip to content for accessibility */}
        <a
          href="#main-content"
          className="
            sr-only focus:not-sr-only focus:absolute
            focus:top-4 focus:right-4 focus:z-50
            focus:px-6 focus:py-3
            focus:bg-gold focus:text-black
            focus:text-sm focus:uppercase focus:tracking-wider
          "
        >
          דלג לתוכן הראשי
        </a>

        {/* Luxury Navigation */}
        <LuxuryNavbar />

        {/* Main Content with proper spacing for fixed nav */}
        <main id="main-content" className="min-h-screen pt-20 md:pt-24">
          {children}
        </main>

        {/* Luxury Footer */}
        <LuxuryFooter />

        {/* WhatsApp Float - Update this component's styling separately */}
        <WhatsAppFloat />

        {/* Global Loading Indicator (optional) */}
        <div
          id="global-loading"
          className="
            fixed top-0 left-0 right-0 h-1 bg-black z-[60]
            opacity-0 pointer-events-none transition-opacity duration-300
          "
        >
          <div className="h-full bg-gold animate-pulse" />
        </div>
      </body>
    </html>
  );
}
