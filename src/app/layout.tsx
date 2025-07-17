// src/app/layout.tsx
import { Heebo } from 'next/font/google';
import { Suspense } from 'react';
import './globals.css';
import { Navbar } from '@/components/navigation';
import Footer from '@/components/common/Footer';
import WhatsAppFloat from '@/components/common/WhatsAppFloat';
import NavigationLoadingProvider from '@/components/providers/NavigationLoadingProvider';
import LoadingLogo from '@/components/common/LoadingLogo';

// Optimized Hebrew font setup - only load essential weights for LCP
const heebo = Heebo({
  subsets: ['hebrew'],
  weight: ['100', '300'], // Only thin and light for critical content
  variable: '--font-heebo',
  display: 'swap',
  preload: true, // Enable automatic preloading
  adjustFontFallback: false, // Reduce layout shift
});

// Secondary font weights loaded separately for non-critical content
const heeboSecondary = Heebo({
  subsets: ['hebrew'], 
  weight: ['400', '500', '700'],
  variable: '--font-heebo-secondary',
  display: 'swap',
  preload: false, // Don't preload these
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
        url: '/images/logos/og.png',
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
    images: ['/images/logos/og.png'],
    creator: '@TheFaderBarber',
    site: '@TheFaderBarber',
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
};

// Moving themeColor to viewport as per Next.js recommendation
export const viewport = {
  themeColor: '#1A1A1A', // Using deep charcoal color from the style guide
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

// Critical CSS for hero section to improve LCP
function CriticalHeroStyles() {
  return (
    <style dangerouslySetInnerHTML={{
      __html: `
        .hero-heading-critical {
          font-family: var(--font-heebo), system-ui, sans-serif;
          font-weight: 100;
          color: #f5f5f5;
          line-height: 1.25;
          margin-bottom: 1.5rem;
          font-size: clamp(1.875rem, 8vw, 4.5rem);
          letter-spacing: -0.025em;
          text-align: center;
        }
        
        .hero-section-critical {
          min-height: 100svh;
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

        .hero-overlay-critical {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.7) 100%);
        }
      `
    }} />
  );
}

// Optimized loading fallback component
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
        {/* Critical font preloading - only thin and light for LCP */}
        <link 
          rel="preload" 
          href="/_next/static/media/heebo-thin.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="" 
        />
        <link 
          rel="preload" 
          href="/_next/static/media/heebo-light.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="" 
        />

        {/* Preload critical hero images */}
        <link rel="preload" as="image" href="/images/hero/home-hero.webp" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Remove Google Fonts preconnect since we're using local fonts */}
        
        <meta name="apple-mobile-web-app-title" content="The Fader" />
        
        {/* Resource hints for better performance */}
        <link rel="prefetch" href="/images/gallery/gallery-1.webp" />
      </head>
      
      <body className="bg-charcoal text-offwhite font-heebo">
        {/* Inline critical CSS */}
        <CriticalHeroStyles />
        
        {/* Skip to content link for accessibility */}
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
            
            {/* Load WhatsApp float after main content */}
            <WhatsAppFloat />
          </NavigationLoadingProvider>
        </Suspense>
        
        {/* Load secondary fonts after page load */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('load', function() {
                setTimeout(function() {
                  const link = document.createElement('link');
                  link.rel = 'preload';
                  link.as = 'font';
                  link.type = 'font/woff2';
                  link.crossOrigin = '';
                  link.href = '/_next/static/media/heebo-regular.woff2';
                  document.head.appendChild(link);
                }, 1000);
              });
            `,
          }}
        />
      </body>
    </html>
  );
}