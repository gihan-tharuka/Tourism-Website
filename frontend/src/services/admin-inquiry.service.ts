import { fetchJson } from '@/lib/fetcher'

export type InquiryStatus = 'NEW' | 'CONTACTED' | 'CONFIRMED' | 'CANCELLED'
export type AdminInquiryType = 'contact' | 'tour' | 'custom-tour' | 'transfer'

export interface BaseAdminInquiry {
  id: string
  fullName: string
  email?: string | null
  whatsapp: string
  country?: string | null
  message?: string | null
  status: InquiryStatus
  createdAt: string
  updatedAt: string
}

export interface ContactAdminInquiry extends BaseAdminInquiry {
  inquiryType: string
}

export interface TourAdminInquiry extends BaseAdminInquiry {
  travelDate?: string | null
  passengerCount: number
  tourId?: string | null
  tourTitle: string
  tourSlug: string
}

export interface CustomTourAdminInquiry extends BaseAdminInquiry {
  travelDate?: string | null
  duration: string
  budget: string
  passengerCount: number
  destinations: string[]
  interests?: string[]
}

export interface TransferAdminInquiry extends BaseAdminInquiry {
  travelDate?: string | null
  pickupLocation: string
  dropoffLocation: string
  passengerCount: number
  estimatedVehicle?: string | null
  estimatedPrice?: string | number | null
  distanceKm?: number | null
}

export type AdminInquiry =
  | (ContactAdminInquiry & { type: 'contact' })
  | (TourAdminInquiry & { type: 'tour' })
  | (CustomTourAdminInquiry & { type: 'custom-tour' })
  | (TransferAdminInquiry & { type: 'transfer' })

export interface InquiryCounts {
  total: number
  new: number
  contacted: number
  confirmed: number
  cancelled: number
}

export interface AdminInquiryResponse {
  contact: ContactAdminInquiry[]
  tour: TourAdminInquiry[]
  customTour: CustomTourAdminInquiry[]
  transfer: TransferAdminInquiry[]
  counts: InquiryCounts
}

const authHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
})

export const getInquiries = (token: string, status?: InquiryStatus) => {
  const query = status ? `?status=${status}` : ''

  return fetchJson<AdminInquiryResponse>(`/inquiries${query}`, {
    headers: authHeaders(token),
  })
}

export const getInquiry = (token: string, type: AdminInquiryType, id: string) => {
  return fetchJson<BaseAdminInquiry>(`/inquiries/${type}/${id}`, {
    headers: authHeaders(token),
  })
}

export const updateInquiryStatus = (
  token: string,
  type: AdminInquiryType,
  id: string,
  status: InquiryStatus,
) => {
  return fetchJson<BaseAdminInquiry>(`/inquiries/${type}/${id}/status`, {
    method: 'PATCH',
    headers: authHeaders(token),
    body: JSON.stringify({ status }),
  })
}

export const flattenInquiries = (data: AdminInquiryResponse): AdminInquiry[] => [
  ...data.contact.map((inquiry) => ({ ...inquiry, type: 'contact' as const })),
  ...data.tour.map((inquiry) => ({ ...inquiry, type: 'tour' as const })),
  ...data.customTour.map((inquiry) => ({ ...inquiry, type: 'custom-tour' as const })),
  ...data.transfer.map((inquiry) => ({ ...inquiry, type: 'transfer' as const })),
].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
