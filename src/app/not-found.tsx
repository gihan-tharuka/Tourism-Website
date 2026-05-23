import Link from 'next/link'
import { Compass, Home, Map, MessageCircle } from 'lucide-react'
import { Container } from '@/components/ui/container'

const links = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/tours', label: 'Tours', icon: Map },
  { href: '/custom-tour', label: 'Custom Tour', icon: Compass },
  { href: '/contact', label: 'Contact', icon: MessageCircle },
]

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 py-20 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.12),_transparent_24%)]" />
      <Container className="relative flex min-h-[70vh] items-center">
        <section className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.36em] text-amber-200">
            Journey not found
          </p>
          <h1 className="mt-6 text-4xl font-semibold leading-tight text-white sm:text-6xl">
            This route has drifted off the itinerary.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Let us guide you back to curated Sri Lanka tours, private transfers, and custom journeys designed around your travel style.
          </p>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {links.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:border-amber-200 hover:bg-white/10"
              >
                <Icon size={18} aria-hidden="true" />
                {label}
              </Link>
            ))}
          </div>
        </section>
      </Container>
    </main>
  )
}
