import bcrypt from "bcryptjs";
import { prisma } from "../config/prisma";
import { generateToken } from "../utils/jwt";
import { AppError } from "../utils/api-response";
import { LoginInput } from "../validators/auth.validator";

const toPublicUser = (user: {
  id: string;
  fullName: string;
  email: string;
  role: string;
}) => ({
  id: user.id,
  fullName: user.fullName,
  email: user.email,
  role: user.role,
});

export const login = async ({ email, password }: LoginInput) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isValidPassword = await bcrypt.compare(password, user.passwordHash);

  if (!isValidPassword) {
    throw new AppError("Invalid email or password", 401);
  }

  const publicUser = toPublicUser(user);
  const token = generateToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  return {
    token,
    user: publicUser,
  };
};

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
    },
  });

  if (!user) {
    throw new AppError("Unauthorized", 401);
  }

  return user;
};
