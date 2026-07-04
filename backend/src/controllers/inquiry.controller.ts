import { InquiryStatus } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { logActivity } from "../services/activity-log.service";
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

export const getAllInquiries = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const query = inquiryListQuerySchema.parse(req.query);
    const inquiries = await inquiryService.getAllInquiries({
      status: query.status as InquiryStatus | undefined,
    });
    await logActivity({
      actorId: req.user?.id,
      actorEmail: req.user?.email,
      action: "ADMIN_VIEWED_INQUIRIES",
      metadata: { status: query.status },
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
    });

    return sendSuccess(res, inquiries);
  } catch (error) {
    return next(error);
  }
};

export const getInquiryByTypeAndId = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const params = inquiryTypeParamSchema.parse(req.params);
    const inquiry = await inquiryService.getInquiryByTypeAndId(params.type, params.id);

    if (!inquiry) {
      throw new AppError("Inquiry not found", 404);
    }
    await logActivity({
      actorId: req.user?.id,
      actorEmail: req.user?.email,
      action: "ADMIN_VIEWED_INQUIRY_DETAIL",
      entityType: params.type,
      entityId: params.id,
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
    });

    return sendSuccess(res, inquiry);
  } catch (error) {
    return next(error);
  }
};

export const updateInquiryStatus = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const params = inquiryTypeParamSchema.parse(req.params);
    const body = updateInquiryStatusSchema.parse(req.body);
    const inquiry = await inquiryService.updateInquiryStatus(
      params.type,
      params.id,
      body.status as InquiryStatus,
    );
    await logActivity({
      actorId: req.user?.id,
      actorEmail: req.user?.email,
      action: "ADMIN_UPDATED_INQUIRY_STATUS",
      entityType: params.type,
      entityId: params.id,
      metadata: { status: body.status },
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
    });

    return sendSuccess(res, inquiry);
  } catch (error) {
    return next(error);
  }
};
