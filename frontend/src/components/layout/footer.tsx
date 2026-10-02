import Link from 'next/link'
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { BackToTop } from '@/components/ui/back-to-top'
import { getWhatsAppInquiryLink } from '@/services/whatsapp.service'

const exploreLinks = [
  { label: 'Home', href: '/' },
  { label: 'Tours', href: '/tours' },
  { label: 'Custom Tour', href: '/custom-tour' },
  { label: 'Transfers', href: '/transfers' },
]

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

const contactEmail = 'islandsea.travels@gmail.com'
const contactPhone = '+94 76 025 3208'

export function SiteFooter() {
  const whatsappLink = getWhatsAppInquiryLink(
    'Hello IslandSea Travels, I would like help planning my trip.',
  )

  return (
    <footer className="border-t border-white/10 bg-deep text-deep-foreground">
      <Container>
        <div className="grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:py-20">
          <div className="space-y-5">
            <Link href="/" className="inline-flex items-center">
              <span className="font-display text-lg font-semibold text-white">
                IslandSea Travels
              </span>
            </Link>
            <p className="max-w-sm text-sm leading-7 text-deep-foreground/70">
              Designing private Sri Lanka journeys that feel cinematic, elevated and effortless —
              with luxury transfers, curated guides and seamless planning.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-white">Explore</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-deep-foreground/70 transition-colors hover:text-white hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-white">Company</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-deep-foreground/70 transition-colors hover:text-white hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-white">Contact</h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <a
                  href={`mailto:${contactEmail}`}
                  className="inline-flex items-center gap-3 text-deep-foreground/70 transition-colors hover:text-white"
                >
                  <Mail size={16} className="text-primary" aria-hidden="true" />
                  {contactEmail}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contactPhone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-3 text-deep-foreground/70 transition-colors hover:text-white"
                >
                  <Phone size={16} className="text-primary" aria-hidden="true" />
                  {contactPhone}
                </a>
              </li>
              <li className="inline-flex items-center gap-3 text-deep-foreground/70">
                <MapPin size={16} className="text-primary" aria-hidden="true" />
                Colombo, Sri Lanka
              </li>
              <li>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 text-deep-foreground/70 transition-colors hover:text-white"
                >
                  <MessageCircle size={16} className="text-primary" aria-hidden="true" />
                  Chat on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 sm:flex-row">
          <p className="text-xs text-deep-foreground/60">
            © {new Date().getFullYear()} IslandSea Travels. Crafted for premium travel experiences.
          </p>
          <BackToTop />
        </div>
      </Container>
    </footer>
  )
}
