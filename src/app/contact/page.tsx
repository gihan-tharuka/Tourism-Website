import { ContactHero } from '@/components/contact/contact-hero'
import { ContactInfo } from '@/components/contact/contact-info'
import { InquiryForm } from '@/components/contact/inquiry-form'
import { WhatsAppContact } from '@/components/contact/whatsapp-contact'
import { ServiceMap } from '@/components/contact/service-map'
import { TravelerSupport } from '@/components/contact/traveler-support'
import { ContactFAQ } from '@/components/contact/contact-faq'
import { ContactCTA } from '@/components/contact/contact-cta'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Beyond Sea Travels | Sri Lanka Travel Experts',
  description:
    'Contact Beyond Sea Travels for personalized Sri Lanka tours, private transfers, and custom travel experiences. Get instant WhatsApp support 24/7.',
  keywords: [
    'contact',
    'Sri Lanka travel',
    'inquiry',
    'booking',
    'WhatsApp support',
    'travel assistant',
  ],
  openGraph: {
    title: 'Contact Beyond Sea Travels | Sri Lanka Travel Experts',
    description:
      'Get in touch with our travel experts for personalized Sri Lanka tours and travel experiences.',
    type: 'website',
    url: 'https://beyondseafravels.com/contact',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Contact Beyond Sea Travels',
      },
    ],
  },
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <ContactHero />
      <ContactInfo />
      <InquiryForm />
      <WhatsAppContact />
      <ServiceMap />
      <TravelerSupport />
      <ContactFAQ />
      <ContactCTA />
    </main>
  )
}
