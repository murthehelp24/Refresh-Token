import * as service from "../services/authService.js";

export const register = async (req, res) => {
  const result = await service.register(req.body);
  res.json(result);
};

export const login = async (req, res) => {
  const result = await service.login(req.body);
  res.json(result);
};
