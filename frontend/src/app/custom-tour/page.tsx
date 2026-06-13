import { CustomTourHero } from '@/components/custom-tour/custom-tour-hero'
import { CustomTourForm } from '@/components/custom-tour/custom-tour-form'
import { Container } from '@/components/ui/container'
import { destinations } from '@/data/destinations'
import type { Metadata } from 'next'
import { createFaqJsonLd, createPageMetadata, JsonLd } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Custom Sri Lanka Tours | Beyond Sea Travels',
  description:
    'Build a personalized Sri Lanka travel itinerary based on your interests, destinations, and budget. Get instant WhatsApp quotes from our luxury tour experts.',
  keywords: [
    'custom tours',
    'personalized itinerary',
    'Sri Lanka travel',
    'luxury tours',
    'tour builder',
  ],
  pathname: '/custom-tour',
  image: '/images/kandy2.avif',
})

export default function CustomTourPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <JsonLd data={createFaqJsonLd(faqItems)} />
      <CustomTourHero />
      <section id="custom-tour-builder" className="scroll-mt-24">
        <CustomTourForm destinations={destinations} />
      </section>

      {/* FAQ Section */}
      <section className="border-t border-white/5 py-12 md:py-20">
        <Container>
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-white md:text-4xl">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <details
                  key={index}
                  className="group rounded-lg border border-white/10 bg-white/5 p-6 transition-all hover:bg-white/8"
                >
                  <summary className="flex cursor-pointer items-center justify-between font-semibold text-white">
                    {item.question}
                    <svg
                      className="h-5 w-5 transition-transform group-open:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </summary>
                  <p className="mt-4 text-gray-300">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="border-t border-white/5 bg-gradient-to-r from-amber-900/20 to-blue-900/20 py-12 md:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Ready to Plan Your Adventure?
            </h2>
            <p className="mb-8 text-gray-300">
              Create your custom itinerary above and connect with our luxury travel experts via WhatsApp for personalized recommendations and pricing.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <a
                href="#custom-tour-builder"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-8 py-3 font-semibold text-white transition-all hover:bg-amber-600"
              >
                Build Custom Tour
              </a>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}

const faqItems = [
  {
    question: 'How do custom tours work?',
    answer:
      'Our custom tour builder lets you select destinations, duration, budget, and interests. We generate a suggested itinerary that you can review and send directly to our WhatsApp. Our team will then customize it further and provide a detailed quote.',
  },
  {
    question: 'How long does it take to get a quote?',
    answer:
      "Our WhatsApp team typically responds within 2-4 hours during business hours. We'll discuss your preferences and send you a customized quote with all details, pricing options, and available dates.",
  },
  {
    question: 'Can I modify the suggested itinerary?',
    answer:
      'Absolutely! The itinerary shown is just a suggestion. Once you send your request to WhatsApp, our experts will work with you to customize every aspect of your journey including activities, accommodations, meals, and travel dates.',
  },
  {
    question: 'What if I have a very tight budget?',
    answer:
      'We offer tours at all price points. Our budget option provides comfortable, authentic travel experiences. Let us know your constraints and we\'ll work with you to create the best possible itinerary within your budget.',
  },
  {
    question: 'Is a WhatsApp number required?',
    answer:
      'Yes, we use WhatsApp for all customer communication. It allows us to share photos, videos, and real-time updates about your tour. Make sure you have WhatsApp installed on your phone.',
  },
  {
    question: 'Can I include flights in my custom tour?',
    answer:
      'Our current builder focuses on ground itineraries. However, once you contact us via WhatsApp, our team can help arrange flights and provide comprehensive travel packages including international flights if needed.',
  },
]
