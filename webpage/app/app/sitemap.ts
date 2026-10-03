import type { MetadataRoute } from 'next'

const siteUrl = 'https://absoludata.com'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about/',
    '/services/',
    '/blog/',
    '/contact/',
  ]

  return routes.map(route => ({
    url: `${siteUrl}${route}`,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.7,
  }))
}