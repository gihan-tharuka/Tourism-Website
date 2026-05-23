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
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
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
  pathname: '/about',
  image: '/images/sigiriya.webp',
})

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
