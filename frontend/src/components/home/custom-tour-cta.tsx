'use client'

import Image from 'next/image'
import { ArrowRight, Check, MessageCircle } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { SiteLink } from '@/components/ui/site-link'
import { Reveal } from '@/components/ui/reveal'
import { getWhatsAppInquiryLink } from '@/services/whatsapp.service'

const bullets = [
  'Itineraries tailored to your dates and pace',
  'Private transfers, guides and curated stays',
  'Fast, personal replies on WhatsApp',
]

export function CustomTourCTA() {
  const message =
    'Hello IslandSea Travels, I am interested in planning a custom luxury itinerary. Please share more details.'
  const whatsappLink = getWhatsAppInquiryLink(message)

  return (
    <section className="relative isolate overflow-hidden bg-deep py-20 text-deep-foreground lg:py-28">
      <Image
        src="/images/cinematic.webp"
        alt=""
        fill
        sizes="100vw"
        aria-hidden="true"
        className="absolute inset-0 -z-10 object-cover opacity-45"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-deep/95 via-deep/75 to-deep/35" />

      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <Reveal className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent">
              Build your journey
            </p>
            <h2 className="font-display text-3xl font-semibold leading-tight text-white text-balance sm:text-4xl">
              A private journey designed only for you.
            </h2>
            <p className="max-w-xl text-base leading-8 text-deep-foreground/80">
              Share your dates, interests and pace. We will craft a premium route with private
              transfers, curated stays and memorable local encounters.
            </p>
            <ul className="space-y-3">
              {bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 text-sm text-deep-foreground/90">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/25 text-white">
                    <Check size={13} strokeWidth={3} aria-hidden="true" />
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal
            delay={0.1}
            className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur"
          >
            <SiteLink
              href="/custom-tour"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-colors hover:bg-[#0b6b74] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-deep"
            >
              Build your custom tour
              <ArrowRight size={18} aria-hidden="true" />
            </SiteLink>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-deep"
            >
              <MessageCircle size={18} aria-hidden="true" />
              Chat on WhatsApp
            </a>
            <p className="flex items-center justify-center gap-2 text-xs text-deep-foreground/70">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Typically replies in minutes
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
