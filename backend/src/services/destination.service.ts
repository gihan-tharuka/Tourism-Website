import { prisma } from "../config/prisma";

type DestinationFilters = {
  country?: string;
  featured?: boolean;
};

export const getDestinations = (filters: DestinationFilters) => {
  return prisma.destination.findMany({
    where: {
      country: filters.country,
      isFeatured: filters.featured,
    },
    orderBy: [{ isFeatured: "desc" }, { country: "asc" }, { name: "asc" }],
  });
};
