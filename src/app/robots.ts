import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://thefader.co.il'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/private/',
          '*.json',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
