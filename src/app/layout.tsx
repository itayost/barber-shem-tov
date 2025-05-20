// File: src/app/layout.tsx
import { Heebo } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/navigation'; // Updated import path
import Footer from '@/components/common/Footer';

// Hebrew font setup
const heebo = Heebo({
  subsets: ['hebrew'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-heebo',
  display: 'swap',
});

// Global style variables - these ensure all the CSS variables are properly defined
// and available throughout the application, especially for components that need them
const globalStyles = `
  :root {
    /* Font sizes - defining these here ensures consistency */
    --font-size-xs: 0.75rem;   /* 12px */
    --font-size-sm: 0.875rem;  /* 14px */
    --font-size-md: 1rem;      /* 16px */
    --font-size-lg: 1.125rem;  /* 18px */
    --font-size-xl: 1.25rem;   /* 20px */
    --font-size-2xl: 1.5rem;   /* 24px */
    --font-size-3xl: 1.875rem; /* 30px */
    --font-size-4xl: 2.25rem;  /* 36px */
    --font-size-5xl: 3rem;     /* 48px */
    
    /* Extended color palette */
    --color-gold-light: #D9BC8C;
    --color-gold-dark: #A6845C;
    --color-charcoal-light: #2A2A2A;
    --color-charcoal-dark: #111111;
    
    /* Spacing system */
    --space-3xs: 0.25rem;  /* 4px */
    --space-2xs: 0.5rem;   /* 8px */
    --space-xs: 0.75rem;   /* 12px */
    --space-sm: 1rem;      /* 16px */
    --space-md: 1.5rem;    /* 24px */
    --space-lg: 2rem;      /* 32px */
    --space-xl: 3rem;      /* 48px */
    --space-2xl: 4rem;     /* 64px */
    
    /* Shadows for enhanced depth */
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.1);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
    --shadow-gold: 0 5px 15px rgba(201, 166, 107, 0.2);
    
    /* Animation durations */
    --transition-fast: 0.2s;
    --transition-normal: 0.3s;
    --transition-slow: 0.5s;
  }

  /* Enhanced scrollbar for a more luxurious look */
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background-color: var(--color-charcoal-dark);
  }
  
  ::-webkit-scrollbar-thumb {
    background-color: var(--color-gold);
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background-color: var(--color-gold-light);
  }
  
  /* Smooth scrolling behavior */
  html {
    scroll-behavior: smooth;
  }
  
  /* Accessibility improvement for focus states */
  *:focus-visible {
    outline: 2px solid var(--color-gold);
    outline-offset: 2px;
  }
  
  /* Selection style */
  ::selection {
    background-color: var(--color-gold);
    color: var(--color-charcoal);
  }
  
  /* Animation for mobile menu */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Floating animation for background elements */
  @keyframes floatElement {
    0%, 100% {
      transform: translateY(0);
      opacity: 0.1;
    }
    50% {
      transform: translateY(-10px);
      opacity: 0.3;
    }
  }
`;

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable}`}>
      <head>
        {/* Inject global CSS variables */}
        <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
        
        {/* Preconnect to third-party domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      
      <body className="bg-charcoal text-offwhite font-heebo">
        {/* Skip to content link for accessibility */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:right-0 focus:z-50 focus:p-4 focus:bg-charcoal focus:text-gold">
          דלג לתוכן העיקרי
        </a>
        
        <Navbar />
        
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        
        <Footer />
        
        {/* The BackToTopButton component will be imported and used in a client component elsewhere */}
      </body>
    </html>
  );
}