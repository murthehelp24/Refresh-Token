import { prisma } from "../libs/prisma.js";

export const getTodos = (userId) => {
  return prisma.todo.findMany({ where: { userId } });
};

export const createTodo = (userId, body) => {
  return prisma.todo.create({
    data: {
      description: body.description,
      isDone: false,
      userId,
    },
  });
};

export const updateTodo = (userId, id, body) => {
  return prisma.todo.update({
    where: { id: Number(id) },
    data: {
      description: body.description,
      isDone: body.isDone,
    },
  });
};

export const deleteTodo = (userId, id) => {
  return prisma.todo.delete({
    where: { id: Number(id) },
  });
};
