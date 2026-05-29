import { z } from "zod";

export const transferEstimateQuerySchema = z.object({
  pickup: z.string().min(1, "Pickup location is required").transform((value) => value.toLowerCase()),
  dropoff: z.string().min(1, "Dropoff location is required").transform((value) => value.toLowerCase()),
  passengers: z.coerce.number().int().positive("Passengers must be a positive number"),
});
