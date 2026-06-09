import { z } from "zod";
import { inquiryStatuses, inquiryTypes } from "../types/inquiry.types";

const optionalText = z
  .string()
  .trim()
  .optional()
  .transform((value) => (value ? value : undefined));

const optionalEmail = z
  .string()
  .trim()
  .optional()
  .transform((value) => (value ? value : undefined))
  .pipe(z.string().email("Email must be valid").optional());

const optionalDate = z
  .string()
  .trim()
  .optional()
  .transform((value) => (value ? new Date(value) : undefined))
  .pipe(z.date().optional());

const commonInquiryFields = {
  fullName: z.string().trim().min(2, "Full name must be at least 2 characters"),
  email: optionalEmail,
  whatsapp: z.string().trim().min(7, "WhatsApp number must be at least 7 characters"),
  country: optionalText,
  message: optionalText,
};

export const contactInquirySchema = z.object({
  ...commonInquiryFields,
  inquiryType: z.enum(["Tour Inquiry", "Custom Tour", "Transfers", "General Inquiry"]),
  message: z.string().trim().min(1, "Message is required"),
});

export const tourInquirySchema = z.object({
  ...commonInquiryFields,
  tourSlug: z.string().trim().min(1, "Tour slug is required"),
  tourTitle: z.string().trim().min(1, "Tour title is required"),
  travelDate: optionalDate,
  passengerCount: z.coerce.number().int().positive("Passenger count must be positive"),
});

export const customTourInquirySchema = z.object({
  ...commonInquiryFields,
  travelDate: optionalDate,
  duration: z.string().trim().min(1, "Duration is required"),
  budget: z.string().trim().min(1, "Budget is required"),
  passengerCount: z.coerce.number().int().positive("Passenger count must be positive"),
  destinations: z.array(z.string().trim().min(1)).min(1, "At least one destination is required"),
  interests: z.array(z.string().trim().min(1)).optional().default([]),
});

export const transferInquirySchema = z.object({
  ...commonInquiryFields,
  travelDate: optionalDate,
  pickupLocation: z.string().trim().min(1, "Pickup location is required"),
  dropoffLocation: z.string().trim().min(1, "Dropoff location is required"),
  passengerCount: z.coerce.number().int().positive("Passenger count must be positive"),
  estimatedVehicle: optionalText,
  estimatedPrice: z.coerce.number().nonnegative("Estimated price must be zero or greater").optional(),
  distanceKm: z.coerce.number().int().nonnegative("Distance must be zero or greater").optional(),
});

export const inquiryTypeParamSchema = z.object({
  type: z.enum(inquiryTypes),
  id: z.string().min(1, "Inquiry id is required"),
});

export const inquiryListQuerySchema = z.object({
  status: z.enum(inquiryStatuses).optional(),
});

export const updateInquiryStatusSchema = z.object({
  status: z.enum(inquiryStatuses),
});

export type ContactInquiryInput = z.infer<typeof contactInquirySchema>;
export type TourInquiryInput = z.infer<typeof tourInquirySchema>;
export type CustomTourInquiryInput = z.infer<typeof customTourInquirySchema>;
export type TransferInquiryInput = z.infer<typeof transferInquirySchema>;
