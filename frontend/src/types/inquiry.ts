export interface Inquiry {
  name: string
  email?: string
  phone: string
  message?: string
  tourId?: string
  travelDate?: string
  passengers?: number
  pickupLocation?: string
  dropoffLocation?: string
  budget?: string
  interests?: string[]
}
