import { prisma } from "../libs/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "http-errors";

// REGISTER
export const register = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw createError(400, "All fields are required");
  }

  console.log("Registering user:", email);
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log("User already exists:", email);
      throw createError(409, "Email already in use");
    }

    console.log("Hashing password...");
    const hash = await bcrypt.hash(password, 10);

    console.log("Creating user in DB...");
    const user = await prisma.user.create({
      data: { name, email, password: hash },
    });

    console.log("User created successfully:", user.id);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  } catch (err) {
    console.error("Error in register service:", err);
    throw err;
  }
};

// LOGIN
export const login = async ({ body, ipAddress, userAgent }) => {
  const { email, password } = body
  if (!email || !password) {
    throw createError(400, "Email and password are required");
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw createError(400, "Invalid credentials from backend");
    return
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw createError(400, "Invalid credentials");
  }

  const accessToken = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "1m" }
  );
  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.REFRESH_SECRET,
    { expiresIn: "15d" }
  );

  const decode = jwt.decode(refreshToken)

  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      token: refreshToken,
      expiresAt: new Date(decode.exp * 1000),
      ipAddress: ipAddress || 'n/a',
      userAgent: userAgent
    }
  })

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};


export const rfToken = async (oldRefreshToken, ipAddress, userAgent) => {
  console.log('oldRefreshToken', oldRefreshToken)
  if (!oldRefreshToken) {
    throw createError(400, 'No refresh token')
  }

  const saveToken = await prisma.refreshToken.findUnique({
    where: { token: oldRefreshToken }
  })

  if (!saveToken) {
    throw createError(400, 'No saved token')
  }

  if (saveToken.expiresAt < new Date()) {
    await prisma.refreshToken.delete({ where: { token: oldRefreshToken } })
    throw createError(400, 'RefreshToken expired')
  }

  // Delete old token before creating new one
  await prisma.refreshToken.delete({ where: { token: oldRefreshToken } })

  // Generate new tokens
  const newAccessToken = jwt.sign(
    { id: saveToken.userId },
    process.env.JWT_SECRET,
    { expiresIn: "1m" }
  );
  const newRefreshToken = jwt.sign(
    { id: saveToken.userId },
    process.env.REFRESH_SECRET,
    { expiresIn: "15d" }
  );

  const decode = jwt.decode(newRefreshToken)

  // Save the new refresh token
  await prisma.refreshToken.create({
    data: {
      userId: saveToken.userId,
      token: newRefreshToken,
      expiresAt: new Date(decode.exp * 1000),
      ipAddress: ipAddress || 'n/a',
      userAgent: userAgent
    }
  })

  return { newAccessToken, newRefreshToken }
}