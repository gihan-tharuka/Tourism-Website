'use client'

import { useCallback, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { TourCard } from '@/components/home/tour-card'
import { TourSearch, type TourSearchState } from '@/components/search/tour-search'
import { ToursFilterPanel } from '@/components/tours/tours-filter-panel'
import { WhatsAppHelpCTA } from '@/components/tours/whatsapp-help-cta'
import { ToursHero } from '@/components/tours/tours-hero'
import { getWhatsAppInquiryLink } from '@/services/whatsapp.service'
import type { Tour } from '@/types/tour'

interface ToursPageContentProps {
  tours: Tour[]
  featuredTours: Tour[]
}

export function ToursPageContent({ tours, featuredTours }: ToursPageContentProps) {
  const [country, setCountry] = useState('All')
  const [duration, setDuration] = useState<number | null>(null)
  const [searchState, setSearchState] = useState<TourSearchState>({
    query: '',
    results: [],
    isSearching: false,
    error: null,
  })

  const isSearchActive = Boolean(searchState.query)

  const filteredTours = useMemo(() => {
    const sourceTours = isSearchActive ? searchState.results : tours

    return sourceTours.filter((tour) => {
      const countryMatch = country === 'All' || tour.country === country
      const durationMatch = duration === null || tour.durationDays === duration
      return countryMatch && durationMatch
    })
  }, [country, duration, isSearchActive, searchState.results, tours])

  const resetFilters = () => {
    setCountry('All')
    setDuration(null)
  }

  const handleSearchStateChange = useCallback((state: TourSearchState) => {
    setSearchState(state)
  }, [])

  return (
    <div className="relative overflow-hidden">
      <ToursHero />
      <Container>
        <div className="py-12 lg:py-16">
          <ToursFilterPanel
            country={country}
            duration={duration}
            onCountryChange={setCountry}
            onDurationChange={setDuration}
            onReset={resetFilters}
          />
          <div className="mt-6">
            <TourSearch onStateChange={handleSearchStateChange} />
          </div>
        </div>

        <section className="py-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.36em] text-amber-200/80">Tour collection</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">
                {isSearchActive ? `Search results for "${searchState.query}"` : 'Find the perfect luxury itinerary.'}
              </h2>
            </div>
            <p className="text-sm text-slate-400">
              {searchState.isSearching
                ? 'Searching tours...'
                : `${filteredTours.length} tour${filteredTours.length === 1 ? '' : 's'} available`}
            </p>
          </div>
          {searchState.error ? (
            <div className="mt-6 rounded-[1.5rem] border border-red-300/20 bg-red-950/30 p-5 text-sm text-red-100">
              {searchState.error}
            </div>
          ) : null}
        </section>

        {!isSearchActive && featuredTours.length > 0 ? (
          <div className="py-10">
            <SectionHeading
              eyebrow="Most Popular Tours"
              title="Browse our most requested tour packages."
              align="left"
            />
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {featuredTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} href={`/tours/${tour.slug}`} />
              ))}
            </div>
          </div>
        ) : null}

        {searchState.isSearching ? (
          <section className="py-10">
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-[34rem] animate-pulse rounded-[2rem] border border-white/10 bg-white/5"
                />
              ))}
            </div>
          </section>
        ) : filteredTours.length > 0 ? (
          <section className="py-10">
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} href={`/tours/${tour.slug}`} />
              ))}
            </div>
          </section>
        ) : (
          <section className="py-16">
            <div className="rounded-[2rem] border border-white/10 bg-slate-950/85 p-12 text-center shadow-[0_20px_80px_rgba(15,23,42,0.25)]">
              <p className="text-sm uppercase tracking-[0.36em] text-amber-200/80">
                {isSearchActive ? 'No search results' : 'No tours found'}
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-white">
                {isSearchActive ? 'Try a different search or adjust your filters.' : 'We can help you find the right journey.'}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300">
                {isSearchActive
                  ? 'No tours match your search and selected filters right now. Try keywords like Sri, beach, Ella, safari, or reset your filters.'
                  : 'There are no tours matching your selected country and duration. Reset filters or contact us directly for a custom recommendation.'}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button variant="primary" onClick={resetFilters}>
                  Reset filters
                </Button>
                <a
                  href={getWhatsAppInquiryLink('Hello Beyond Sea Travels, I need help choosing the best tour package for my group.')}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-full bg-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-white transition hover:bg-white/20"
                >
                  Contact on WhatsApp
                </a>
              </div>
            </div>
          </section>
        )}
      </Container>

      <WhatsAppHelpCTA />
    </div>
  )
}
