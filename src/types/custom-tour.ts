export interface CustomTourFormData {
  destinations: string[] // destination ids
  duration: number | 'custom'
  budget: 'budget' | 'standard' | 'luxury'
  interests: string[]
  passengerCount: string
  fullName: string
  country: string
  whatsappNumber: string
  travelDate?: string
}

export interface ItineraryDay {
  day: number
  destination: string
  activities: string[]
}

export type BudgetOption = 'budget' | 'standard' | 'luxury'

export interface BudgetRange {
  label: string
  value: BudgetOption
  priceRange: string
  description: string
}
