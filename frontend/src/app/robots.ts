import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'
import { absoluteUrl } from '@/lib/seo'
import { isHomepageOnly } from '@/lib/navigation'

export default function robots(): MetadataRoute.Robots {
  // Homepage-only preview: the other pages are still on the old design, so keep
  // crawlers on the home page until the redesign lands.
  if (isHomepageOnly()) {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: ['/'],
      },
      sitemap: absoluteUrl('/sitemap.xml'),
      host: SITE_URL,
    }
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: absoluteUrl('/sitemap.xml'),
    host: SITE_URL,
  }
}
