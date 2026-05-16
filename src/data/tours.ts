import type { Tour } from '@/types/tour'

export const tours: Tour[] = [
  {
    id: 'sl-7-day-escape',
    title: 'Sri Lanka 7-Day Signature Escape',
    slug: 'sri-lanka-7-day-escape',
    durationDays: 7,
    startingPrice: 2399,
    summary: 'From cultural wonders to coastal luxury, experience Sri Lanka in a single flawless itinerary.',
    destinationIds: ['sigiriya', 'kandy', 'ella', 'galle'],
    image: '/images/sigiriya2.jpg',
    highlights: ['Private guide', 'Luxury stays', 'Cultural tours', 'Sunset coast cruise'],
    itinerary: [
      { day: 1, title: 'Arrival', description: 'Welcome transfer and sunset welcome dinner by the sea.' },
      { day: 4, title: 'Hill country', description: 'Tea plantation walk and waterfall relaxation in Ella.' },
    ],
  },
  {
    id: 'sl-4-day-coastal',
    title: 'Sri Lanka 4-Day Coastal Retreat',
    slug: 'sri-lanka-4-day-coastal',
    durationDays: 4,
    startingPrice: 1599,
    summary: 'A short luxury beach escape with private transfers and boutique seaside nights.',
    destinationIds: ['mirissa', 'galle'],
    image: '/images/mirissa.jpg',
    highlights: ['Beachfront villa', 'Whale watching', 'Private chauffeur'],
    itinerary: [
      { day: 1, title: 'Arrival & unwind', description: 'VIP pickup and private sunset beach dinner.' },
      { day: 4, title: 'Departure', description: 'Relaxed morning before your luxury transfer to the airport.' },
    ],
  },
  {
    id: 'sl-10-day-cultural',
    title: 'Sri Lanka 10-Day Cultural Immersion',
    slug: 'sri-lanka-10-day-cultural',
    durationDays: 10,
    startingPrice: 3499,
    summary: 'A deep dive into temples, tea estates, private tours and curated heritage stays.',
    destinationIds: ['sigiriya', 'kandy', 'ella', 'galle'],
    image: '/images/kandy.jpg',
    highlights: ['Temple visits', 'Discreet hospitality', 'Private transfer', 'Signature dining'],
    itinerary: [
      { day: 1, title: 'Sacred city', description: 'Evening ceremony at the Temple of the Tooth.' },
      { day: 7, title: 'Tea country', description: 'Guided private tea estate tour and local cooking experience.' },
    ],
  },
  {
    id: 'sl-14-day-premier',
    title: 'Sri Lanka 14-Day Premier Journey',
    slug: 'sri-lanka-14-day-premier',
    durationDays: 14,
    startingPrice: 4999,
    summary: 'The ultimate island tour, blending luxury resorts, wildlife, heritage and coastal serenity.',
    destinationIds: ['sigiriya', 'kandy', 'ella', 'mirissa', 'galle'],
    image: '/images/Ella_sri_lanka.jpg',
    highlights: ['Elite accommodations', 'Wildlife safari', 'Private yacht', 'Cultural journeys'],
    itinerary: [
      { day: 1, title: 'Welcome', description: 'Private arrival and luxury hotel welcome reception.' },
      { day: 14, title: 'Farewell', description: 'Sunrise departure transfer with a final seaside brunch.' },
    ],
  },
]

export default tours
