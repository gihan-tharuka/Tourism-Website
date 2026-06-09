export const inquiryTypes = ["contact", "tour", "custom-tour", "transfer"] as const;
export type InquiryType = (typeof inquiryTypes)[number];

export const inquiryStatuses = ["NEW", "CONTACTED", "CONFIRMED", "CANCELLED"] as const;
export type InquiryStatusValue = (typeof inquiryStatuses)[number];
