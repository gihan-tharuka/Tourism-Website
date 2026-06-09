import { NextFunction, Request, Response } from "express";
import { prisma } from "../config/prisma";
import { verifyToken } from "../utils/jwt";
import { sendError } from "../utils/api-response";

export type AuthenticatedRequest = Request & {
  user?: {
    id: string;
    fullName: string;
    email: string;
    role: string;
  };
};

export const requireAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7) : undefined;

  if (!token) {
    return sendError(res, "Unauthorized", 401);
  }

  try {
    const payload = verifyToken(token);
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      return sendError(res, "Unauthorized", 401);
    }

    req.user = user;
    return next();
  } catch {
    return sendError(res, "Unauthorized", 401);
  }
};
