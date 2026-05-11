import { FeaturedTours } from '@/components/home/featured-tours'
import { HeroSection } from '@/components/home/hero-section'
import { DestinationsShowcase } from '@/components/home/destinations-showcase'
import { WhyChooseUs } from '@/components/home/why-choose-us'
import { TravelExperience } from '@/components/home/travel-experience'
import { Testimonials } from '@/components/home/testimonials'
import { CustomTourCTA } from '@/components/home/custom-tour-cta'
import { WhatsAppCTA } from '@/components/home/whatsapp-cta'
import { getFeaturedTours } from '@/services/tour.service'
import { getDestinations } from '@/services/destination.service'
import { getTestimonials } from '@/services/testimonial.service'

export const metadata = {
  title: 'Beyond Sea Travels — Luxury Sri Lanka Tours',
  description:
    'Discover premium Sri Lanka travel experiences with luxury tours, private transfers, custom itineraries and expert local guides.',
}

export default async function Home() {
  const [tours, destinations, testimonials] = await Promise.all([
    getFeaturedTours(),
    getDestinations(),
    getTestimonials(),
  ])

  return (
    <main className="overflow-hidden">
      <HeroSection />
      <FeaturedTours tours={tours} destinations={destinations} />
      <DestinationsShowcase destinations={destinations} />
      <WhyChooseUs />
      <TravelExperience />
      <Testimonials testimonials={testimonials} />
      <CustomTourCTA />
      <WhatsAppCTA />
    </main>
  )
}
