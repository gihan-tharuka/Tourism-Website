import { Prisma } from "@prisma/client";
import { prisma } from "../config/prisma";
import {
  DestinationSearchResponse,
  SearchInput,
  TourSearchResponse,
  GlobalSearchResponse,
} from "../types/search.types";

const tourSearchInclude = {
  images: true,
  destinations: true,
  activities: true,
} satisfies Prisma.TourInclude;

const destinationSearchInclude = {
  tours: {
    select: {
      id: true,
      slug: true,
      title: true,
      country: true,
      durationDays: true,
      featuredImage: true,
    },
  },
} satisfies Prisma.DestinationInclude;

const contains = (query: string) => ({
  contains: query,
  mode: "insensitive" as const,
});

const highlightMatches = (highlights: string[], query: string) => {
  const normalizedQuery = query.toLowerCase();
  return highlights.some((highlight) => highlight.toLowerCase().includes(normalizedQuery));
};

export const searchTours = async ({ q, limit }: SearchInput): Promise<TourSearchResponse> => {
  const results = await prisma.tour.findMany({
    where: {
      OR: [
        { title: contains(q) },
        { country: contains(q) },
        { shortDescription: contains(q) },
        { overview: contains(q) },
        {
          destinations: {
            some: {
              name: contains(q),
            },
          },
        },
        {
          activities: {
            some: {
              OR: [{ title: contains(q) }, { description: contains(q) }],
            },
          },
        },
      ],
    },
    include: tourSearchInclude,
    orderBy: [{ isFeatured: "desc" }, { title: "asc" }],
    take: limit,
  });

  return {
    query: q,
    results,
  };
};

export const searchDestinations = async ({
  q,
  limit,
}: SearchInput): Promise<DestinationSearchResponse> => {
  const textMatches = await prisma.destination.findMany({
    where: {
      OR: [{ name: contains(q) }, { country: contains(q) }, { description: contains(q) }],
    },
    include: destinationSearchInclude,
    orderBy: [{ isFeatured: "desc" }, { name: "asc" }],
    take: limit,
  });

  if (textMatches.length >= limit) {
    return {
      query: q,
      results: textMatches,
    };
  }

  const existingIds = textMatches.map((destination) => destination.id);
  const highlightCandidates = await prisma.destination.findMany({
    where: existingIds.length > 0 ? { id: { notIn: existingIds } } : undefined,
    include: destinationSearchInclude,
    orderBy: [{ isFeatured: "desc" }, { name: "asc" }],
    take: 50,
  });

  const highlightMatchesResult = highlightCandidates
    .filter((destination) => highlightMatches(destination.highlights, q))
    .slice(0, limit - textMatches.length);

  return {
    query: q,
    results: [...textMatches, ...highlightMatchesResult],
  };
};

export const searchGlobal = async ({ q, limit }: SearchInput): Promise<GlobalSearchResponse> => {
  const [tourResults, destinationResults] = await Promise.all([
    searchTours({ q, limit }),
    searchDestinations({ q, limit }),
  ]);

  return {
    query: q,
    tours: tourResults.results,
    destinations: destinationResults.results,
  };
};
