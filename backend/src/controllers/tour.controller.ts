import { NextFunction, Request, Response } from "express";
import * as tourService from "../services/tour.service";
import { AppError, sendSuccess } from "../utils/api-response";

const parseFeatured = (value: unknown) => (value === undefined ? undefined : value === "true");
const parseDuration = (value: unknown) => {
  if (typeof value !== "string") {
    return undefined;
  }

  const duration = Number(value);
  return Number.isFinite(duration) ? duration : undefined;
};

export const listTours = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tours = await tourService.getTours({
      country: typeof req.query.country === "string" ? req.query.country : undefined,
      duration: parseDuration(req.query.duration),
      featured: parseFeatured(req.query.featured),
    });

    return sendSuccess(res, tours);
  } catch (error) {
    return next(error);
  }
};

export const getTour = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tour = await tourService.getTourBySlug(req.params.slug);

    if (!tour) {
      throw new AppError("Tour not found", 404);
    }

    return sendSuccess(res, tour);
  } catch (error) {
    return next(error);
  }
};
