import { NextFunction, Request, Response } from "express";
import * as destinationService from "../services/destination.service";
import { sendSuccess } from "../utils/api-response";

const parseFeatured = (value: unknown) => (value === undefined ? undefined : value === "true");

export const listDestinations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const destinations = await destinationService.getDestinations({
      country: typeof req.query.country === "string" ? req.query.country : undefined,
      featured: parseFeatured(req.query.featured),
    });

    return sendSuccess(res, destinations);
  } catch (error) {
    return next(error);
  }
};
