import { AboutHero } from '@/components/about/about-hero'
import { CompanyStory } from '@/components/about/company-story'
import { WhyChooseUs } from '@/components/about/why-choose-us'
import { ExperienceStats } from '@/components/about/experience-stats'
import { TravelPhilosophy } from '@/components/about/travel-philosophy'
import { FeaturedDestinations } from '@/components/about/featured-destinations'
import { TestimonialsPreview } from '@/components/about/testimonials-preview'
import { AboutCTA } from '@/components/about/about-cta'
import { destinations } from '@/data/destinations'
import { testimonials } from '@/data/testimonials'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Beyond Sea Travels | Luxury Sri Lanka Travel Experiences',
  description:
    'Learn about Beyond Sea Travels and our passion for creating authentic and personalized Sri Lankan travel experiences. Discover our mission, values, and commitment to excellence.',
  keywords: [
    'about us',
    'Sri Lanka travel',
    'luxury travel operator',
    'authentic experiences',
    'travel company',
  ],
  openGraph: {
    title: 'About Beyond Sea Travels | Luxury Sri Lanka Travel Experiences',
    description:
      'Crafting unforgettable travel experiences across Sri Lanka with authenticity, comfort, and local expertise.',
    type: 'website',
    url: 'https://beyondseafravels.com/about',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'About Beyond Sea Travels',
      },
    ],
  },
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <AboutHero />
      <CompanyStory />
      <ExperienceStats />
      <WhyChooseUs />
      <TravelPhilosophy />
      <FeaturedDestinations destinations={destinations} />
      <TestimonialsPreview testimonials={testimonials} />
      <AboutCTA />
    </main>
  )
}
