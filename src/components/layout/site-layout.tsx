import { ReactNode } from 'react'
import { SiteHeader } from '@/components/layout/navbar'
import { SiteFooter } from '@/components/layout/footer'

interface SiteLayoutProps {
  children: ReactNode
}

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(circle_at_top,_rgba(248,197,83,0.18),_transparent_28%)]" />
      <div className="pointer-events-none absolute right-0 top-10 -z-10 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
      <SiteHeader />
      <main className="relative flex-1 pb-20">{children}</main>
      <SiteFooter />
    </div>
  )
}
