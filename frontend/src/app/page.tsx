import { FeaturedTours } from '@/components/home/featured-tours'
import { HeroSection } from '@/components/home/hero-section'
import { DestinationsShowcase } from '@/components/home/destinations-showcase'
import { WhyChooseUs } from '@/components/home/why-choose-us'
import { TravelExperience } from '@/components/home/travel-experience'
import { CustomTourCTA } from '@/components/home/custom-tour-cta'
import { getFeaturedTours } from '@/services/tour.service'
import { getDestinations } from '@/services/destination.service'
import { createPageMetadata } from '@/lib/seo'
import { HOME_ANCHORS } from '@/lib/navigation'

export const metadata = createPageMetadata({
  title: 'Luxury Sri Lanka Tours',
  description:
    'Discover premium Sri Lanka travel experiences with luxury tours, private transfers, custom itineraries and expert local guides.',
  pathname: '/',
  keywords: ['luxury Sri Lanka tours', 'Sri Lanka private guides', 'Sri Lanka custom tours'],
})

export default async function Home() {
  const [tours, destinations] = await Promise.all([
    getFeaturedTours(),
    getDestinations(),
  ])

  const destinationLabels = Object.fromEntries(
    destinations.map((destination) => [destination.id, destination.name]),
  )

  return (
    <main className="relative">
      {/* Anchor ids keep in-page navigation working during homepage-only preview mode. */}
      <HeroSection />
      <div id={HOME_ANCHORS.tours} className="scroll-mt-24">
        <FeaturedTours tours={tours} destinationLabels={destinationLabels} />
      </div>
      <div id={HOME_ANCHORS.destinations} className="scroll-mt-24">
        <DestinationsShowcase destinations={destinations} />
      </div>
      <div id={HOME_ANCHORS.whyUs} className="scroll-mt-24">
        <WhyChooseUs />
      </div>
      <div id={HOME_ANCHORS.experience} className="scroll-mt-24">
        <TravelExperience />
      </div>
      <div id={HOME_ANCHORS.plan} className="scroll-mt-24">
        <CustomTourCTA />
      </div>
    </main>
  )
}
