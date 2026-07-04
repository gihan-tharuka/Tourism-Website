import { NextFunction, Request, Response } from "express";
import * as searchService from "../services/search.service";
import { sendSuccess } from "../utils/api-response";
import { searchQuerySchema } from "../validators/search.validator";

export const searchTours = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = searchQuerySchema.parse(req.query);
    const results = await searchService.searchTours(query);

    return sendSuccess(res, results);
  } catch (error) {
    return next(error);
  }
};

export const searchDestinations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = searchQuerySchema.parse(req.query);
    const results = await searchService.searchDestinations(query);

    return sendSuccess(res, results);
  } catch (error) {
    return next(error);
  }
};

export const searchGlobal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = searchQuerySchema.parse(req.query);
    const results = await searchService.searchGlobal(query);

    return sendSuccess(res, results);
  } catch (error) {
    return next(error);
  }
};
