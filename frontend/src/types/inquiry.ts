export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
}

export interface InquiryRecord {
  id: string
  status: 'NEW' | 'CONTACTED' | 'CONFIRMED' | 'CANCELLED'
  createdAt: string
  updatedAt?: string
}

export interface ContactInquiryPayload {
  fullName: string
  email?: string
  whatsapp: string
  country?: string
  inquiryType: 'Tour Inquiry' | 'Custom Tour' | 'Transfers' | 'General Inquiry'
  message: string
}

export interface TourInquiryPayload {
  fullName: string
  email?: string
  whatsapp: string
  country?: string
  travelDate?: string
  passengerCount: number
  message?: string
  tourSlug: string
  tourTitle: string
}

export interface CustomTourInquiryPayload {
  fullName: string
  email?: string
  whatsapp: string
  country?: string
  travelDate?: string
  duration: string
  budget: string
  passengerCount: number
  destinations: string[]
  interests?: string[]
  message?: string
}

export interface TransferInquiryPayload {
  fullName: string
  email?: string
  whatsapp: string
  country?: string
  travelDate?: string
  pickupLocation: string
  dropoffLocation: string
  passengerCount: number
  estimatedVehicle?: string
  estimatedPrice?: number
  distanceKm?: number
  message?: string
}
