import { InquiryStatus } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import * as inquiryService from "../services/inquiry.service";
import { sendSuccess, AppError } from "../utils/api-response";
import {
  contactInquirySchema,
  customTourInquirySchema,
  inquiryListQuerySchema,
  inquiryTypeParamSchema,
  tourInquirySchema,
  transferInquirySchema,
  updateInquiryStatusSchema,
} from "../validators/inquiry.validator";

export const createContactInquiry = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = contactInquirySchema.parse(req.body);
    const inquiry = await inquiryService.createContactInquiry(data);
    return sendSuccess(res, inquiry, 201);
  } catch (error) {
    return next(error);
  }
};

export const createTourInquiry = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = tourInquirySchema.parse(req.body);
    const inquiry = await inquiryService.createTourInquiry(data);
    return sendSuccess(res, inquiry, 201);
  } catch (error) {
    return next(error);
  }
};

export const createCustomTourInquiry = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = customTourInquirySchema.parse(req.body);
    const inquiry = await inquiryService.createCustomTourInquiry(data);
    return sendSuccess(res, inquiry, 201);
  } catch (error) {
    return next(error);
  }
};

export const createTransferInquiry = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = transferInquirySchema.parse(req.body);
    const inquiry = await inquiryService.createTransferInquiry(data);
    return sendSuccess(res, inquiry, 201);
  } catch (error) {
    return next(error);
  }
};

// TODO: Protect admin inquiry reads with authentication in Backend Phase 3.
export const getAllInquiries = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = inquiryListQuerySchema.parse(req.query);
    const inquiries = await inquiryService.getAllInquiries({
      status: query.status as InquiryStatus | undefined,
    });

    return sendSuccess(res, inquiries);
  } catch (error) {
    return next(error);
  }
};

// TODO: Protect admin inquiry reads with authentication in Backend Phase 3.
export const getInquiryByTypeAndId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const params = inquiryTypeParamSchema.parse(req.params);
    const inquiry = await inquiryService.getInquiryByTypeAndId(params.type, params.id);

    if (!inquiry) {
      throw new AppError("Inquiry not found", 404);
    }

    return sendSuccess(res, inquiry);
  } catch (error) {
    return next(error);
  }
};

// TODO: Protect admin inquiry status updates with authentication in Backend Phase 3.
export const updateInquiryStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const params = inquiryTypeParamSchema.parse(req.params);
    const body = updateInquiryStatusSchema.parse(req.body);
    const inquiry = await inquiryService.updateInquiryStatus(
      params.type,
      params.id,
      body.status as InquiryStatus,
    );

    return sendSuccess(res, inquiry);
  } catch (error) {
    return next(error);
  }
};
