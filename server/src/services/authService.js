import { prisma } from "../libs/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "http-errors";

// REGISTER
export const register = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw createError(400, "All fields are required");
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw createError(409, "Email already in use");
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, password: hash },
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};

// LOGIN
export const login = async ({ email, password }) => {
  if (!email || !password) {
    throw createError(400, "Email and password are required");
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw createError(401, "Invalid credentials");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw createError(401, "Invalid credentials");
  }

  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};