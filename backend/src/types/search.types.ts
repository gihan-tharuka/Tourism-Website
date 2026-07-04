import { Prisma } from "@prisma/client";

export type SearchInput = {
  q: string;
  limit: number;
};

export type TourSearchResult = Prisma.TourGetPayload<{
  include: {
    images: true;
    destinations: true;
    activities: true;
  };
}>;

export type DestinationSearchResult = Prisma.DestinationGetPayload<{
  include: {
    tours: {
      select: {
        id: true;
        slug: true;
        title: true;
        country: true;
        durationDays: true;
        featuredImage: true;
      };
    };
  };
}>;

export type TourSearchResponse = {
  query: string;
  results: TourSearchResult[];
};

export type DestinationSearchResponse = {
  query: string;
  results: DestinationSearchResult[];
};

export type GlobalSearchResponse = {
  query: string;
  tours: TourSearchResult[];
  destinations: DestinationSearchResult[];
};
