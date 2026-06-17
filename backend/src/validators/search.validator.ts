import { z } from "zod";

const DEFAULT_SEARCH_LIMIT = 10;
const MAX_SEARCH_LIMIT = 20;

export const searchQuerySchema = z.object({
  q: z.string().trim().min(1, "Search query is required"),
  limit: z.coerce
    .number()
    .int()
    .positive("Limit must be a positive number")
    .max(MAX_SEARCH_LIMIT, `Limit cannot exceed ${MAX_SEARCH_LIMIT}`)
    .optional()
    .default(DEFAULT_SEARCH_LIMIT),
});

export type SearchQueryInput = z.infer<typeof searchQuerySchema>;
