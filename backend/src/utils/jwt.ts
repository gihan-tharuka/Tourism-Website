import jwt from "jsonwebtoken";
import { SignOptions } from "jsonwebtoken";

type TokenPayload = {
  userId: string;
  email: string;
  role: string;
};

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }

  return secret;
};

export const generateToken = (payload: TokenPayload) => {
  const expiresIn = (process.env.JWT_EXPIRES_IN || "7d") as SignOptions["expiresIn"];

  return jwt.sign(payload, getJwtSecret(), {
    expiresIn,
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, getJwtSecret()) as TokenPayload;
};
