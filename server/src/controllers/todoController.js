import * as service from "../services/todoService.js";

export const getTodos = async (req, res) => {
  res.json(await service.getTodos(req.user.id));
};

export const createTodo = async (req, res) => {
  res.json(await service.createTodo(req.user.id, req.body));
};

export const updateTodo = async (req, res) => {
  res.json(await service.updateTodo(req.user.id, req.params.id, req.body));
};

export const deleteTodo = async (req, res) => {
  res.json(await service.deleteTodo(req.user.id, req.params.id));
};
