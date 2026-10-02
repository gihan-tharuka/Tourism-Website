import Link from 'next/link'
import type { ComponentProps } from 'react'
import { resolveHref } from '@/lib/navigation'

type SiteLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string
}

/**
 * Drop-in replacement for `next/link` that respects homepage-only preview mode.
 *
 * While the redesign is partial, internal hrefs are resolved to home-page
 * anchors so navigation stays inside `/`. With the flag off it renders exactly
 * like `next/link`. External hrefs (WhatsApp, mailto:, tel:) are never touched.
 *
 * @example
 * <SiteLink href="/tours" className="underline">View all tours</SiteLink>
 */
export function SiteLink({ href, children, ...props }: SiteLinkProps) {
  return (
    <Link href={resolveHref(href)} {...props}>
      {children}
    </Link>
  )
}
