// src/components/SEO/generatePageMetadata.ts

import { Metadata } from 'next'

interface SEOProps {
  title: string
  description: string
  keywords?: string[]
  openGraph?: {
    title?: string
    description?: string
    images?: string[]
  }
  twitter?: {
    title?: string
    description?: string
    card?: 'summary' | 'summary_large_image' | 'app' | 'player'
  }
  canonical?: string
  pageName?: string
  noindex?: boolean
}

export const generatePageMetadata = ({
  title,
  description,
  keywords,
  openGraph,
  twitter,
  canonical,
  pageName = '',
  noindex = false,
}: SEOProps): Metadata => {
  const siteName = 'The Fader - אקדמיה לספרות'
  const baseUrl = 'https://thefader.co.il'
  const fullTitle = title.includes('The Fader') ? title : `${title} | ${siteName}`
  
  // Default OG image path
  const defaultOgImage = `${baseUrl}/images/og/${pageName || 'default'}-og.webp`
  
  return {
    // Basic metadata
    title: fullTitle,
    description,
    keywords: keywords?.join(', '),
    metadataBase: new URL(baseUrl),
    
    // Open Graph
    openGraph: {
      title: openGraph?.title || fullTitle,
      description: openGraph?.description || description,
      url: canonical || `${baseUrl}${pageName ? `/${pageName}` : ''}`,
      siteName,
      images: openGraph?.images || [
        {
          url: defaultOgImage,
          width: 1200,
          height: 630,
          alt: `${siteName} - ${title}`,
        }
      ],
      locale: 'he_IL',
      type: 'website',
    },
    
    // Twitter Card
    twitter: {
      card: twitter?.card || 'summary_large_image',
      title: twitter?.title || fullTitle,
      description: twitter?.description || description,
      creator: '@TheFaderBarber',
      site: '@TheFaderBarber',
      images: openGraph?.images || [defaultOgImage],
    },
    
    // Canonical URL
    alternates: {
      canonical: canonical || `${baseUrl}${pageName ? `/${pageName}` : ''}`,
    },
    
    // Robots
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}