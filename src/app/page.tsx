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
import { createPageMetadata } from '@/lib/seo'

export const metadata = createPageMetadata({
  title: 'Luxury Sri Lanka Tours',
  description:
    'Discover premium Sri Lanka travel experiences with luxury tours, private transfers, custom itineraries and expert local guides.',
  pathname: '/',
  keywords: ['luxury Sri Lanka tours', 'Sri Lanka private guides', 'Sri Lanka custom tours'],
})

export default async function Home() {
  const [tours, destinations, testimonials] = await Promise.all([
    getFeaturedTours(),
    getDestinations(),
    getTestimonials(),
  ])

  return (
    <main className="overflow-hidden">
      <HeroSection />
      <FeaturedTours tours={tours} />
      <DestinationsShowcase destinations={destinations} />
      <WhyChooseUs />
      <TravelExperience />
      <Testimonials testimonials={testimonials} />
      <CustomTourCTA />
      <WhatsAppCTA />
    </main>
  )
}
