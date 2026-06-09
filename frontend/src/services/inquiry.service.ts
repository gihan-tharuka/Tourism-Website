import { fetchJson } from '@/lib/fetcher'
import type {
  ContactInquiryPayload,
  CustomTourInquiryPayload,
  InquiryRecord,
  TourInquiryPayload,
  TransferInquiryPayload,
} from '@/types/inquiry'

const postInquiry = <T>(path: string, payload: T) => {
  return fetchJson<InquiryRecord>(path, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export const createContactInquiry = (payload: ContactInquiryPayload) => {
  return postInquiry('/inquiries/contact', payload)
}

export const createTourInquiry = (payload: TourInquiryPayload) => {
  return postInquiry('/inquiries/tour', payload)
}

export const createCustomTourInquiry = (payload: CustomTourInquiryPayload) => {
  return postInquiry('/inquiries/custom-tour', payload)
}

export const createTransferInquiry = (payload: TransferInquiryPayload) => {
  return postInquiry('/inquiries/transfer', payload)
}
