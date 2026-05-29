import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError, sendError } from "../utils/api-response";

export const notFoundHandler = (req: Request, _res: Response, next: NextFunction) => {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
};

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (error instanceof ZodError) {
    const message = error.issues.map((issue) => issue.message).join(", ");
    return sendError(res, message, 400);
  }

  if (error instanceof AppError) {
    return sendError(res, error.message, error.statusCode);
  }

  if (error.name === "PrismaClientInitializationError") {
    return sendError(res, "Database connection unavailable", 503);
  }

  console.error(error);
  return sendError(res, "Internal server error", 500);
};
