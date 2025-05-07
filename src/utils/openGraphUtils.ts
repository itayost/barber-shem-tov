import { Metadata } from 'next';

// Get the appropriate OG image based on page type
export function getPageOgImage(pageName: string): string {
  switch(pageName) {
    case 'home':
      return '/images/hero-barbershop.jpg';
    case 'services':
      return '/images/gallery/work/מקצועיות.jpg';
    case 'about':
      return '/images/team/bar.jpg';
    case 'gallery':
      return '/images/gallery/work/מקצועיות.jpg';
    case 'contact':
      return '/images/barbershop-interior.jpg';
    default:
      return '/images/hero-barbershop.jpg';
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