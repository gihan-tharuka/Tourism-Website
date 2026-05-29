import { NextFunction, Request, Response } from "express";
import * as testimonialService from "../services/testimonial.service";
import { sendSuccess } from "../utils/api-response";

const parseFeatured = (value: unknown) => (value === undefined ? undefined : value === "true");

export const listTestimonials = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const testimonials = await testimonialService.getTestimonials({
      featured: parseFeatured(req.query.featured),
    });

    return sendSuccess(res, testimonials);
  } catch (error) {
    return next(error);
  }
};
