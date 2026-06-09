import { NextFunction, Request, Response } from "express";
import * as authService from "../services/auth.service";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { sendSuccess } from "../utils/api-response";
import { loginSchema } from "../validators/auth.validator";

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = loginSchema.parse(req.body);
    const result = await authService.login(data);

    return sendSuccess(res, result);
  } catch (error) {
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
