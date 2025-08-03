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
  canonical?: string
  pageName?: string
  noindex?: boolean
}

export const generatePageMetadata = ({
  title,
  description,
  keywords,
  openGraph,
  canonical,
  pageName = '',
  noindex = false,
}: SEOProps): Metadata => {
  const siteName = 'The Fader - אקדמיה לספרות'
  const baseUrl = 'https://thefader.co.il'
  const fullTitle = title.includes('The Fader') ? title : `${title} | ${siteName}`
  
  return {
    title: fullTitle,
    description,
    keywords: keywords?.join(', '),
    metadataBase: new URL(baseUrl),
    
    openGraph: {
      title: openGraph?.title || fullTitle,
      description: openGraph?.description || description,
      url: canonical || `${baseUrl}${pageName ? `/${pageName}` : ''}`,
      siteName,
      images: openGraph?.images || [`${baseUrl}/images/og/${pageName || 'home'}-og.jpg`],
      locale: 'he_IL',
      type: 'website',
    },
    
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: openGraph?.images || [`${baseUrl}/images/og/${pageName || 'home'}-og.jpg`],
      creator: '@TheFaderBarber',
    },
    
    alternates: {
      canonical: canonical || `${baseUrl}${pageName ? `/${pageName}` : ''}`,
    },
    
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