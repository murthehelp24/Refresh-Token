import * as service from "../services/todoService.js";

// GET
export const getTodos = async (req, res, next) => {
  try {
    const todos = await service.getTodos(req.user.id);
    res.status(200).json(todos);
  } catch (err) {
    next(err);
  }
};

// CREATE
export const createTodo = async (req, res, next) => {
  try {
    const todo = await service.createTodo(req.user.id, req.body);
    res.status(201).json(todo);
  } catch (err) {
    next(err);
  }
};

// UPDATE
export const updateTodo = async (req, res, next) => {
  try {
    const todo = await service.updateTodo(
      req.user.id,
      req.params.id,
      req.body
    );
    res.status(200).json(todo);
  } catch (err) {
    next(err);
  }
};

// DELETE
export const deleteTodo = async (req, res, next) => {
  try {
    await service.deleteTodo(req.user.id, req.params.id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};