import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'

export default function Home() {
  return (
    <div className="pb-20 lg:pb-28">
      <section className="overflow-hidden py-20">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-8">
              <span className="inline-flex rounded-full bg-amber-300/15 px-4 py-2 text-xs uppercase tracking-[0.36em] text-amber-200">
                Sri Lanka luxury journeys
              </span>
              <h1 className="max-w-3xl font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                Curated private tours for a cinematic island escape.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                Beyond Sea Travels designs seamless travel experiences across Sri Lanka with premium transfers, boutique stays and unforgettable local moments.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button className="min-w-[180px]">Explore Tours</Button>
                <Button variant="secondary" className="min-w-[180px]">
                  Build Custom Tour
                </Button>
              </div>
            </div>

            <div className="grid gap-6">
              <div className="glass-panel rounded-[2rem] border border-white/10 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.35)] backdrop-blur-2xl">
                <p className="text-sm uppercase tracking-[0.28em] text-amber-200/80">Signature Experience</p>
                <h2 className="mt-4 text-3xl font-semibold text-white">Coastal temples, tea hills and luxury safari.</h2>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  Discover the best of Sri Lanka with a hand-crafted seven-day itinerary that blends culture, nature and premium hospitality.
                </p>
              </div>
              <div className="glass-panel rounded-[2rem] border border-white/10 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.35)] backdrop-blur-2xl">
                <p className="text-sm uppercase tracking-[0.28em] text-amber-200/80">Private Transfer</p>
                <h2 className="mt-4 text-3xl font-semibold text-white">Comfort in every mile.</h2>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  Premium vehicles, expert drivers, and seamless pickup planning for a calm arrival and departure experience.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionHeading
            eyebrow="Featured services"
            title="Travel with confidence, craft your story."
            description="Our premium travel system is built around immersive itineraries, personalized service and the trust of every guest." 
          />
        </Container>
      </section>
    </div>
  )
}
