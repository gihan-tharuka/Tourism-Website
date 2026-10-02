import type { MetadataRoute } from 'next'
import { getTours } from '@/services/tour.service'
import { absoluteUrl } from '@/lib/seo'
import { isHomepageOnly } from '@/lib/navigation'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const homeRoute: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl('/'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]

  // Homepage-only preview: the other pages are still on the old design, so keep
  // them out of the sitemap until the redesign lands.
  if (isHomepageOnly()) {
    return homeRoute
  }

  const tours = await getTours()

  const staticRoutes: MetadataRoute.Sitemap = [
    ...homeRoute,
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
