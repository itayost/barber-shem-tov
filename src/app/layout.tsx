// src/app/layout.tsx
import { Heebo } from 'next/font/google';
import { Suspense } from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/navigation';
import Footer from '@/components/common/Footer';
import WhatsAppFloat from '@/components/common/WhatsAppFloat';
import NavigationLoadingProvider from '@/components/providers/NavigationLoadingProvider';

// Font setup
const heebo = Heebo({
  subsets: ['hebrew'],
  weight: ['100', '300'],
  variable: '--font-heebo',
  display: 'swap',
  preload: true,
  adjustFontFallback: false,
});

const heeboSecondary = Heebo({
  subsets: ['hebrew'], 
  weight: ['400', '500', '700'],
  variable: '--font-heebo-secondary',
  display: 'swap',
  preload: false,
});

// Base metadata that will be extended by pages
export const metadata: Metadata = {
  metadataBase: new URL('https://thefader.co.il'),
  title: {
    default: 'The Fader - אקדמיה מקצועית לספרות | למד ספרות בטירת הכרמל',
    template: '%s | The Fader - אקדמיה לספרות'
  },
  description: 'האקדמיה המובילה לספרות בצפון. קורסים מקצועיים לספרים מתחילים ומתקדמים, הכשרה מעשית עם 20+ לקוחות, ציוד מקצועי וליווי לקריירה.',
  keywords: 'אקדמיה לספרות, קורס ספרות, לימודי ספרות, קורס ברבר, טירת הכרמל',
  authors: [{ name: 'The Fader Academy' }],
  creator: 'The Fader',
  publisher: 'The Fader',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
    shortcut: '/shortcut-icon.png'
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'he_IL',
    url: 'https://thefader.co.il',
    siteName: 'The Fader - אקדמיה לספרות',
    images: [{
      url: '/images/logos/og.png',
      width: 1200,
      height: 630,
      alt: 'The Fader - אקדמיה לספרות'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@TheFaderBarber',
    creator: '@TheFaderBarber',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = {
  themeColor: '#1A1A1A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

// Critical CSS for hero section
// Critical CSS for hero section to improve LCP
function CriticalHeroStyles() {
  return (
    <style dangerouslySetInnerHTML={{
      __html: `
        /* Critical fonts */
        @font-face {
          font-family: 'Heebo';
          font-weight: 100;
          font-display: swap;
          src: url('/_next/static/media/heebo-thin.woff2') format('woff2');
        }
        
        @font-face {
          font-family: 'Heebo';
          font-weight: 300;
          font-display: swap;
          src: url('/_next/static/media/heebo-light.woff2') format('woff2');
        }
        
        /* Critical layout */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        html {
          direction: rtl;
        }
        
        body {
          background-color: #1a1a1a;
          color: #f5f5f5;
          font-family: 'Heebo', system-ui, sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        
        /* Hero critical styles */
        .hero-heading-critical {
          font-family: 'Heebo', system-ui, sans-serif;
          font-weight: 100;
          color: #f5f5f5;
          line-height: 1.25;
          margin-bottom: 1.5rem;
          font-size: clamp(1.875rem, 8vw, 4.5rem);
          letter-spacing: -0.025em;
          text-align: center;
        }
        
        .hero-section-critical {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          width: 100%;
        }
        
        .hero-content-critical {
          position: relative;
          z-index: 10;
          text-align: center;
          padding: 1rem;
          max-width: 64rem;
          margin: 0 auto;
          width: 100%;
        }

        .hero-bg-critical {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .hero-bg-critical img {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }
        
        /* Button critical styles */
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem 2rem;
          font-weight: 500;
          transition: all 0.3s ease;
          text-decoration: none;
          cursor: pointer;
          border: 1px solid transparent;
        }
        
        .btn-primary {
          background-color: #c9a66b;
          color: #1a1a1a;
          border-color: #c9a66b;
        }
        
        .btn-primary:hover {
          background-color: #d9bc8c;
          border-color: #d9bc8c;
        }
        
        /* Hide non-critical elements initially */
        .lazy-load {
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .lazy-load.loaded {
          opacity: 1;
        }
      `,
    }}
    />
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center">
      <div className="w-16 h-16 border-2 border-gold border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} ${heeboSecondary.variable}`}>
      <head>
          {/* Preconnect to optimize font loading */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          
          {/* Preload critical resources */}
          <link 
            rel="preload" 
            href="/images/hero/homeHero1.jpg" 
            as="image"
            type="image/jpeg"
          />
          
          {/* Module preload for critical JS */}
          <link 
            rel="modulepreload" 
            href="/_next/static/chunks/critical.js" 
          />

        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Favicon and Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="shortcut icon" href="/shortcut-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Resource hints for better performance */}
      </head>
      
      <body className="bg-charcoal text-offwhite font-heebo">
        <CriticalHeroStyles />
        
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:right-0 focus:z-50 focus:p-4 focus:bg-charcoal focus:text-gold">
          דלג לתוכן העיקרי
        </a>
        
        <Suspense fallback={<LoadingFallback />}>
          <NavigationLoadingProvider>
            <Navbar />
            
            <main id="main-content" className="min-h-screen">
              {children}
            </main>
            
            <Footer />
            
            <WhatsAppFloat />
          </NavigationLoadingProvider>
        </Suspense>
        

      </body>
    </html>
  );
}