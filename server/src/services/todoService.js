import { prisma } from "../libs/prisma.js";
import createError from "http-errors";

// GET
export const getTodos = (userId) => {
  return prisma.todo.findMany({
    where: { userId },
    orderBy: { id: "desc" },
  });
};

// CREATE
export const createTodo = (userId, body) => {
  if (!body.description) {
    throw createError(400, "Description is required");
  }

  return prisma.todo.create({
    data: {
      description: body.description,
      isDone: false,
      userId,
    },
  });
};

// UPDATE
export const updateTodo = async (userId, id, body) => {
  const todo = await prisma.todo.findUnique({
    where: { id: Number(id) },
  });

  if (!todo) {
    throw createError(404, "Todo not found");
  }

  if (todo.userId !== userId) {
    throw createError(403, "Forbidden");
  }

  return prisma.todo.update({
    where: { id: Number(id) },
    data: {
      description: body.description,
      isDone: body.isDone,
    },
  });
};

// DELETE
export const deleteTodo = async (userId, id) => {
  const todo = await prisma.todo.findUnique({
    where: { id: Number(id) },
  });

  if (!todo) {
    throw createError(404, "Todo not found");
  }

  if (todo.userId !== userId) {
    throw createError(403, "Forbidden");
  }

  await prisma.todo.delete({
    where: { id: Number(id) },
  });

  return;
};