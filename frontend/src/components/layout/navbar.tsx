'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Tours', href: '/tours' },
  { label: 'Custom Tour', href: '/custom-tour' },
  { label: 'Transfers', href: '/transfers' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 backdrop-blur-xl">
      <Container>
        <div className="flex h-20 items-center justify-between gap-4">
          <Link href="/" className="inline-flex max-w-[220px] items-center gap-3 text-base font-semibold uppercase tracking-[0.16em] text-amber-300 transition hover:text-amber-200 sm:max-w-none sm:text-lg sm:tracking-[0.28em]">
            Beyond Sea Travels
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm uppercase tracking-[0.22em] text-slate-300 transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-slate-950 transition hover:bg-amber-200 md:inline-flex"
            >
              Inquiry
            </Link>
            <button
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((prev) => !prev)}
              className={cn(
                'inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-slate-900/80 text-slate-100 transition hover:bg-slate-900/95 md:hidden',
                open && 'bg-slate-800/95',
              )}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </Container>

      {open ? (
        <div className="border-t border-white/5 bg-slate-950/98 pb-6 md:hidden">
          <Container>
            <div className="flex flex-col gap-4 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-3xl border border-white/5 bg-white/5 px-5 py-3 text-sm uppercase tracking-[0.22em] text-slate-100 transition hover:border-white/10 hover:bg-white/10"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-950 transition hover:bg-amber-200"
              >
                Start Inquiry
              </Link>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  )
}
