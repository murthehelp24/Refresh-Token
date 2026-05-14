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
    const body = req.body
    const ipAddress = req.ip
    const userAgent = req.headers['user-agent'] || 'n/a'


    const result = await service.login({ body, ipAddress, userAgent });
    res.cookie('result', result.refreshToken, {
      httpOnly: false,
      secure: false
    })
    res.status(200).json({ token: result.accessToken, user: result.user })
    console.log(result)
  } catch (err) {
    next(err);
  }
};