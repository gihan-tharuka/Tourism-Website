import type { Metadata } from 'next'
import { DEFAULT_META_DESCRIPTION, SITE_URL } from '@/lib/constants'

export const generateSeoMetadata = ({
  title,
  description = DEFAULT_META_DESCRIPTION,
  pathname = '/',
}: {
  title: string
  description?: string
  pathname?: string
}): Metadata => {
  return {
    title,
    description,
    metadataBase: new URL(SITE_URL || 'https://example.com'),
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${pathname}`,
      type: 'website',
    },
  }
}
