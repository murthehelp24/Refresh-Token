import * as service from "../services/authService.js";

export const register = async (req, res, next) => {
  try {
    const result = await service.register(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const result = await service.login(req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};