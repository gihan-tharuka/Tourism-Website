import type { BudgetRange } from '@/types/custom-tour'

export const budgetOptions: BudgetRange[] = [
  {
    label: 'Budget',
    value: 'budget',
    priceRange: '$80–$200 per day',
    description: 'Comfortable accommodations, group tours, local transport',
  },
  {
    label: 'Standard',
    value: 'standard',
    priceRange: '$200–$500 per day',
    description: 'Mid-range hotels, private transport, curated experiences',
  },
  {
    label: 'Luxury',
    value: 'luxury',
    priceRange: '$500+ per day',
    description: 'Premium resorts, private guide, exclusive experiences',
  },
]

export const interestOptions = [
  { id: 'beaches', label: 'Beaches' },
  { id: 'wildlife', label: 'Wildlife' },
  { id: 'adventure', label: 'Adventure' },
  { id: 'culture', label: 'Culture' },
  { id: 'food', label: 'Food' },
  { id: 'hiking', label: 'Hiking' },
  { id: 'relaxation', label: 'Luxury Relaxation' },
]

export const passengerOptions = [
  { label: '1–2 people', value: '1-2' },
  { label: '3–5 people', value: '3-5' },
  { label: '6–9 people', value: '6-9' },
  { label: '10+ people', value: '10+' },
]

export const durationOptions = [
  { label: '4 Days', value: 4 },
  { label: '7 Days', value: 7 },
  { label: '14 Days', value: 14 },
  { label: '20 Days', value: 20 },
]