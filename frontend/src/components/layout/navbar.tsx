'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Compass, MessageCircle, Menu, X } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { cn } from '@/lib/utils'
import { getWhatsAppInquiryLink } from '@/services/whatsapp.service'

const navLinks = [
  { label: 'Tours', href: '/tours' },
  { label: 'Custom Tour', href: '/custom-tour' },
  { label: 'Transfers', href: '/transfers' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

const whatsappHref = getWhatsAppInquiryLink(
  'Hello IslandSea Travels, I would like help planning a trip.',
)

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const isHome = pathname === '/'
  const transparent = isHome && !scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        transparent
          ? 'border-b border-transparent bg-transparent'
          : 'glass-light border-b border-border/70 shadow-soft',
      )}
    >
      <Container>
        <div
          className={cn(
            'flex items-center justify-between gap-4 transition-all duration-300',
            scrolled ? 'h-16' : 'h-20',
          )}
        >
          <Link href="/" className="group inline-flex items-center gap-2.5" aria-label="IslandSea Travels home">
            <span
              className={cn(
                'inline-flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-300',
                transparent
                  ? 'bg-white/15 text-white ring-1 ring-white/25 backdrop-blur'
                  : 'bg-primary text-primary-foreground shadow-sm',
              )}
            >
              <Compass size={20} />
            </span>
            <span className="flex flex-col leading-none">
              <span
                className={cn(
                  'font-display text-lg font-semibold tracking-tight transition-colors duration-300',
                  transparent ? 'text-white' : 'text-foreground',
                )}
              >
                Island<span className={transparent ? 'text-white/80' : 'text-primary'}>Sea</span>
              </span>
              <span
                className={cn(
                  'mt-0.5 text-[10px] font-medium uppercase tracking-[0.34em] transition-colors duration-300',
                  transparent ? 'text-white/70' : 'text-muted-foreground',
                )}
              >
                Travels
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'group relative px-4 py-2 text-sm font-medium transition-colors duration-300',
                    transparent
                      ? 'text-white/85 hover:text-white'
                      : active
                        ? 'text-primary'
                        : 'text-foreground/75 hover:text-primary',
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      'absolute inset-x-4 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full transition-transform duration-300 group-hover:scale-x-100',
                      transparent ? 'bg-white' : 'bg-primary',
                      active && 'scale-x-100',
                    )}
                    aria-hidden="true"
                  />
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className={cn(
                'hidden h-11 w-11 items-center justify-center rounded-full border transition-colors duration-300 lg:inline-flex',
                transparent
                  ? 'border-white/25 bg-white/10 text-white hover:bg-white/20'
                  : 'border-border bg-white text-primary hover:border-primary/40',
              )}
            >
              <MessageCircle size={18} />
            </a>
            <Link
              href="/contact"
              className={cn(
                'hidden items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition duration-300 md:inline-flex',
                transparent
                  ? 'bg-white text-foreground hover:bg-white/90'
                  : 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-[#0b6b74]',
              )}
            >
              Plan Your Trip
            </Link>
            <button
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((prev) => !prev)}
              className={cn(
                'inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-300 md:hidden',
                transparent
                  ? 'border-white/25 bg-white/10 text-white hover:bg-white/20'
                  : 'border-border bg-white text-foreground hover:border-primary/40',
              )}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </Container>

      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-deep/40 backdrop-blur-sm md:hidden"
            />
            <motion.div
              key="drawer"
              id="mobile-nav"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              className="fixed inset-y-0 right-0 z-50 flex w-[82%] max-w-sm flex-col bg-background shadow-float md:hidden"
            >
              <div className="flex h-20 items-center justify-between border-b border-border px-6">
                <span className="font-display text-lg font-semibold text-foreground">Menu</span>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-foreground hover:border-primary/40"
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="flex flex-1 flex-col gap-2 overflow-y-auto px-6 py-6">
                {navLinks.map((link, index) => {
                  const active = pathname === link.href || pathname.startsWith(`${link.href}/`)
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.06 * index + 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          'flex items-center justify-between rounded-2xl border px-5 py-4 text-base font-medium transition-colors',
                          active
                            ? 'border-primary/30 bg-primary/5 text-primary'
                            : 'border-border bg-white text-foreground hover:border-primary/30 hover:text-primary',
                        )}
                      >
                        {link.label}
                        <span className="text-muted-foreground">&rarr;</span>
                      </Link>
                    </motion.div>
                  )
                })}
              </nav>

              <div className="space-y-3 border-t border-border px-6 py-6">
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:bg-[#0b6b74]"
                >
                  Plan Your Trip
                </Link>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-white px-6 py-4 text-sm font-semibold text-foreground transition hover:border-primary/40 hover:text-primary"
                >
                  <MessageCircle size={18} />
                  Chat on WhatsApp
                </a>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
