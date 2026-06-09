import { InquiryStatus, Prisma } from "@prisma/client";
import { prisma } from "../config/prisma";
import { InquiryType } from "../types/inquiry.types";
import { AppError } from "../utils/api-response";
import {
  ContactInquiryInput,
  CustomTourInquiryInput,
  TourInquiryInput,
  TransferInquiryInput,
} from "../validators/inquiry.validator";

type InquiryFilters = {
  status?: InquiryStatus;
};

const statusOrder = {
  new: InquiryStatus.NEW,
  contacted: InquiryStatus.CONTACTED,
  confirmed: InquiryStatus.CONFIRMED,
  cancelled: InquiryStatus.CANCELLED,
};

const getStatusWhere = (filters?: InquiryFilters) => ({
  status: filters?.status,
});

export const createContactInquiry = (data: ContactInquiryInput) => {
  return prisma.contactInquiry.create({
    data,
  });
};

export const createTourInquiry = async (data: TourInquiryInput) => {
  const tour = await prisma.tour.findUnique({
    where: { slug: data.tourSlug },
    select: { id: true },
  });

  return prisma.tourInquiry.create({
    data: {
      fullName: data.fullName,
      email: data.email,
      whatsapp: data.whatsapp,
      country: data.country,
      travelDate: data.travelDate,
      passengerCount: data.passengerCount,
      message: data.message,
      tourId: tour?.id,
      tourTitle: data.tourTitle,
      tourSlug: data.tourSlug,
    },
  });
};

export const createCustomTourInquiry = (data: CustomTourInquiryInput) => {
  return prisma.customTourInquiry.create({
    data: {
      ...data,
      destinations: data.destinations,
      interests: data.interests,
    },
  });
};

export const createTransferInquiry = (data: TransferInquiryInput) => {
  return prisma.transferInquiry.create({
    data,
  });
};

export const getAllInquiries = async (filters?: InquiryFilters) => {
  const where = getStatusWhere(filters);

  const [contact, tour, customTour, transfer] = await Promise.all([
    prisma.contactInquiry.findMany({ where, orderBy: { createdAt: "desc" } }),
    prisma.tourInquiry.findMany({ where, orderBy: { createdAt: "desc" } }),
    prisma.customTourInquiry.findMany({ where, orderBy: { createdAt: "desc" } }),
    prisma.transferInquiry.findMany({ where, orderBy: { createdAt: "desc" } }),
  ]);

  const all = [...contact, ...tour, ...customTour, ...transfer];

  return {
    contact,
    tour,
    customTour,
    transfer,
    counts: {
      total: all.length,
      new: all.filter((inquiry) => inquiry.status === statusOrder.new).length,
      contacted: all.filter((inquiry) => inquiry.status === statusOrder.contacted).length,
      confirmed: all.filter((inquiry) => inquiry.status === statusOrder.confirmed).length,
      cancelled: all.filter((inquiry) => inquiry.status === statusOrder.cancelled).length,
    },
  };
};

export const getInquiryByTypeAndId = async (type: InquiryType, id: string) => {
  switch (type) {
    case "contact":
      return prisma.contactInquiry.findUnique({ where: { id } });
    case "tour":
      return prisma.tourInquiry.findUnique({ where: { id } });
    case "custom-tour":
      return prisma.customTourInquiry.findUnique({ where: { id } });
    case "transfer":
      return prisma.transferInquiry.findUnique({ where: { id } });
    default:
      throw new AppError("Unsupported inquiry type", 400);
  }
};

export const updateInquiryStatus = async (type: InquiryType, id: string, status: InquiryStatus) => {
  const data = { status };

  try {
    switch (type) {
      case "contact":
        return await prisma.contactInquiry.update({ where: { id }, data });
      case "tour":
        return await prisma.tourInquiry.update({ where: { id }, data });
      case "custom-tour":
        return await prisma.customTourInquiry.update({ where: { id }, data });
      case "transfer":
        return await prisma.transferInquiry.update({ where: { id }, data });
      default:
        throw new AppError("Unsupported inquiry type", 400);
    }
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new AppError("Inquiry not found", 404);
    }

    throw error;
  }
};
