import { NextFunction, Request, Response } from "express";
import * as transferService from "../services/transfer.service";
import { sendSuccess } from "../utils/api-response";
import { transferEstimateQuerySchema } from "../validators/transfer.validator";

export const listTransferLocations = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const locations = await transferService.getTransferLocations();
    return sendSuccess(res, locations);
  } catch (error) {
    return next(error);
  }
};

export const listTransferRoutes = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const routes = await transferService.getTransferRoutes();
    return sendSuccess(res, routes);
  } catch (error) {
    return next(error);
  }
};

export const estimateTransfer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = transferEstimateQuerySchema.parse(req.query);
    const estimate = await transferService.getTransferEstimate(query);

    return sendSuccess(res, estimate);
  } catch (error) {
    return next(error);
  }
};
