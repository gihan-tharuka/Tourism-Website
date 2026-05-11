import Link from 'next/link'
import { Container } from '@/components/ui/container'

const footerLinks = [
  { label: 'Home', href: '/' },
  { label: 'Tours', href: '/tours' },
  { label: 'Custom Tour', href: '/custom-tour' },
  { label: 'Transfers', href: '/transfers' },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/95 text-slate-300">
      <Container>
        <div className="grid gap-12 py-16 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.36em] text-amber-200/80">Beyond Sea Travels</p>
            <p className="max-w-md text-sm leading-7 text-slate-400">
              Designing private Sri Lanka journeys that feel cinematic, elevated and effortless — with luxury transfers, curated guides and seamless planning.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-100">Quick Links</h3>
            <div className="mt-6 flex flex-col gap-3 text-sm text-slate-400">
              {footerLinks.map((link) => (
                <Link key={link.href} href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-100">Contact</h3>
            <div className="mt-6 space-y-3 text-sm text-slate-400">
              <p>info@beyondseatravels.com</p>
              <p>+94 77 123 4567</p>
              <p>Colombo, Sri Lanka</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Beyond Sea Travels. Crafted for premium travel experiences.
        </div>
      </Container>
    </footer>
  )
}
