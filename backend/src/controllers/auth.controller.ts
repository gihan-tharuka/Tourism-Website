import { NextFunction, Request, Response } from "express";
import * as authService from "../services/auth.service";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { logActivity } from "../services/activity-log.service";
import { sendSuccess } from "../utils/api-response";
import { loginSchema } from "../validators/auth.validator";

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = loginSchema.parse(req.body);
    const result = await authService.login(data);
    await logActivity({
      actorId: result.user.id,
      actorEmail: result.user.email,
      action: "ADMIN_LOGIN_SUCCESS",
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
    });

    return sendSuccess(res, result);
  } catch (error) {
    const email = typeof req.body?.email === "string" ? req.body.email : undefined;
    await logActivity({
      actorEmail: email,
      action: "ADMIN_LOGIN_FAILED",
      metadata: {
        reason: error instanceof Error ? error.message : "Unknown login failure",
      },
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
    });

    return next(error);
  }
};

export const me = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const user = await authService.getUserById(req.user?.id || "");
    return sendSuccess(res, user);
  } catch (error) {
    return next(error);
  }
};

export const logout = (_req: Request, res: Response) => {
  return sendSuccess(res, { message: "Logged out" });
};
