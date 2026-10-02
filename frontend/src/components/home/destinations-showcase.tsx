'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Destination } from '@/types/destination'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { SectionHeading } from '@/components/ui/section-heading'
import { Reveal, staggerDelay } from '@/components/ui/reveal'
import { cn } from '@/lib/utils'

interface DestinationsShowcaseProps {
  destinations: Destination[]
}

export function DestinationsShowcase({ destinations }: DestinationsShowcaseProps) {
  if (!destinations.length) {
    return null
  }

  return (
    <Section tone="white">
      <Container>
        <SectionHeading
          eyebrow="Destination highlights"
          title="Discover Sri Lanka’s most iconic places, styled for luxury travel."
          description="From ancient rock fortresses to peaceful coastal escapes, each destination is designed to inspire your next private journey."
          align="left"
          action={
            <Link
              href="/tours"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-[#0b6b74] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              View all destinations
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          }
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:auto-rows-[15rem] lg:grid-cols-3">
          {destinations.map((destination, index) => {
            const isFeature = index === 0

            return (
              <Reveal
                key={destination.id}
                delay={staggerDelay(index)}
                className={cn('h-full', isFeature && 'lg:col-span-2 lg:row-span-2')}
              >
                <Link
                  href={`/tours?destination=${encodeURIComponent(destination.name)}`}
                  className="group relative flex h-full min-h-[18rem] flex-col justify-end overflow-hidden rounded-[2rem] border border-border shadow-soft transition duration-300 hover:shadow-float focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    sizes={
                      isFeature
                        ? '(max-width: 1024px) 100vw, 66vw'
                        : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                    }
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep/85 via-deep/30 to-transparent" />
                  <div className="relative p-6">
                    <h3
                      className={cn(
                        'font-display font-semibold text-white',
                        isFeature ? 'text-3xl sm:text-4xl' : 'text-2xl',
                      )}
                    >
                      {destination.name}
                    </h3>
                    <div className="mt-3 grid grid-rows-[0fr] opacity-0 transition-all duration-300 group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-visible:grid-rows-[1fr] group-focus-visible:opacity-100 max-lg:grid-rows-[1fr] max-lg:opacity-100">
                      <div className="overflow-hidden">
                        <div className="rounded-2xl bg-white/15 p-4 backdrop-blur-sm">
                          <p className="line-clamp-2 max-w-md text-sm leading-6 text-white/90">
                            {destination.description}
                          </p>
                          <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-white">
                            Explore
                            <ArrowRight size={16} aria-hidden="true" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
