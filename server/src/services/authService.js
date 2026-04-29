import { prisma } from "../libs/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async ({ name, email, password }) => {
  console.log(name, email, password);
  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, password: hash },
  });
  return user;
};

export const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("User not found");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Wrong password");

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  delete user.password;
  return { token, user };
};
