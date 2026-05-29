import type { MetadataRoute } from 'next'
import { getTours } from '@/services/tour.service'
import { absoluteUrl } from '@/lib/seo'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const tours = await getTours()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl('/'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: absoluteUrl('/tours'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: absoluteUrl('/custom-tour'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: absoluteUrl('/transfers'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: absoluteUrl('/about'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: absoluteUrl('/contact'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
  ]

  const tourRoutes: MetadataRoute.Sitemap = tours.map((tour) => ({
    url: absoluteUrl(`/tours/${tour.slug}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: tour.isFeatured ? 0.85 : 0.8,
    images: [absoluteUrl(tour.image)],
  }))

  return [...staticRoutes, ...tourRoutes]
}
