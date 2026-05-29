import { prisma } from "../config/prisma";

type TestimonialFilters = {
  featured?: boolean;
};

export const getTestimonials = (filters: TestimonialFilters) => {
  return prisma.testimonial.findMany({
    where: {
      isFeatured: filters.featured,
    },
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
  });
};
