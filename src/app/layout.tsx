// src/app/layout.tsx - Updated to prevent animation flash
import { Heebo } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/navigation';
import Footer from '@/components/common/Footer';
import WhatsAppFloat from '@/components/common/WhatsAppFloat';

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
  
  openGraph: {
    title: 'The Fader | ספר מודרני ויוקרתי בטירת הכרמל',
    description: 'חווית הספרות המובילה של הצפון, שבה אומנות מסורתית פוגשת סגנון עכשווי.',
    url: 'https://barber-shem-tov.vercel.app',
    siteName: 'The Fader Barbershop',
    locale: 'he_IL',
    type: 'website',
    images: [{
      url: '/images/logos/og.png',
      width: 1200,
      height: 630,
      alt: 'The Fader - מספרה בטירת הכרמל',
    }],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'The Fader | ספר מודרני ויוקרתי בטירת הכרמל',
    description: 'חווית הספרות המובילה של הצפון. הזמינו תור עוד היום.',
    images: ['/images/logos/og.png'],
    creator: '@TheFaderBarber',
    site: '@TheFaderBarber',
  },
  
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
  
  alternates: {
    canonical: 'https://barber-shem-tov.vercel.app',
    languages: {
      'he-IL': 'https://barber-shem-tov.vercel.app',
    },
  },
  
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
    shortcut: '/shortcut-icon.png'
  },
  
  manifest: '/site.webmanifest',
};

export const viewport = {
  themeColor: '#1A1A1A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl" className={heebo.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <meta name="apple-mobile-web-app-title" content="The Fader" />
        
        {/* Critical: Prevent FOUC and animation flash */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Prevent flash of unstyled content */
            html { 
              visibility: hidden; 
              opacity: 0; 
            }
            
            /* Prevent Framer Motion SSR flash */
            [data-framer-component-type] {
              opacity: 1 !important;
              transform: none !important;
            }
          `
        }} />
        
        <script dangerouslySetInnerHTML={{
          __html: `
            // Make page visible after styles load
            document.addEventListener('DOMContentLoaded', function() {
              document.documentElement.style.visibility = 'visible';
              document.documentElement.style.opacity = '1';
              document.documentElement.style.transition = 'opacity 0.3s ease-out';
            });
            
            // Fallback for slow connections
            setTimeout(function() {
              document.documentElement.style.visibility = 'visible';
              document.documentElement.style.opacity = '1';
            }, 100);
          `
        }} />
      </head>
      
      <body className="bg-charcoal text-offwhite font-heebo antialiased">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:right-0 focus:z-50 focus:p-4 focus:bg-charcoal focus:text-gold">
          דלג לתוכן העיקרי
        </a>
        
        <Navbar />
        
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}