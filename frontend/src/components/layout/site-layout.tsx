import { ReactNode } from 'react'
import { SiteHeader } from '@/components/layout/navbar'
import { SiteFooter } from '@/components/layout/footer'

interface SiteLayoutProps {
  children: ReactNode
}

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="relative flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
