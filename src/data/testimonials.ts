import type { Testimonial } from '@/types/testimonial'

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Asha Perera',
    location: 'Colombo, Sri Lanka',
    role: 'Honeymoon Couple',
    quote:
      'Beyond Sea Travels crafted a perfect luxury itinerary for us with private transport, incredible dining, and attentive service from start to finish.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '2',
    name: 'Michael Tan',
    location: 'Singapore',
    role: 'Solo Adventure',
    quote:
      'The team delivered immersive local experiences and flawless logistics. Every detail felt premium, effortless, and unforgettable.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '3',
    name: 'Sofia Almeida',
    location: 'Lisbon, Portugal',
    role: 'Family Retreat',
    quote:
      'Our family loved the private tours, boutique stays, and the thoughtful itinerary that balanced culture with relaxation.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=200&q=80',
  },
]

export default testimonials
