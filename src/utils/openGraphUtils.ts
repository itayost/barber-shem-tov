import { Metadata } from 'next';

// Get the appropriate OG image based on page type
export function getPageOgImage(pageName: string): string {
  switch(pageName) {
    case 'home':
      return '/images/og/home-og.jpg';
    case 'services':
      return '/images/og/services-og.jpg';
    case 'about':
      return '/images/og/about-og.jpg';
    case 'gallery':
      return '/images/og/gallery-og.jpg';
    case 'contact':
      return '/images/og/contact-og.jpg';
    default:
      return '/images/og/home-og.jpg';
  }
}

// Generate consistent metadata for all pages
export function generateMetadata(
  pageName: string,
  title: string,
  description: string
): Metadata {
  const ogImage = getPageOgImage(pageName);
  const baseUrl = 'https://barber-shem-tov.vercel.app';
  const pageUrl = pageName === 'home' ? baseUrl : `${baseUrl}/${pageName}`;
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: 'The Fader מספרה בטירת הכרמל',
      locale: 'he_IL',
      type: 'website',
      images: [{
        url: ogImage,
        width: 1200,
        height: 630,
        alt: `The Fader - ${title}`,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}