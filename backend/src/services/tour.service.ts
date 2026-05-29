import { Prisma } from "@prisma/client";
import { prisma } from "../config/prisma";

type TourFilters = {
  country?: string;
  duration?: number;
  featured?: boolean;
};

const tourSummaryInclude = {
  images: true,
  destinations: true,
} satisfies Prisma.TourInclude;

const tourDetailInclude = {
  images: true,
  itineraryDays: {
    orderBy: {
      dayNumber: "asc",
    },
  },
  activities: true,
  destinations: true,
} satisfies Prisma.TourInclude;

export const getTours = (filters: TourFilters) => {
  return prisma.tour.findMany({
    where: {
      country: filters.country,
      durationDays: filters.duration,
      isFeatured: filters.featured,
    },
    include: tourSummaryInclude,
    orderBy: [{ isFeatured: "desc" }, { durationDays: "asc" }, { title: "asc" }],
  });
};

export const getTourBySlug = (slug: string) => {
  return prisma.tour.findUnique({
    where: { slug },
    include: tourDetailInclude,
  });
};
