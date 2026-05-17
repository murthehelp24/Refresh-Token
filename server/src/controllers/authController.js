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
    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: false,

    })
    res.status(200).json({ token: result.accessToken, user: result.user })
    // console.log(result)
  } catch (err) {
    next(err);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const oldRefreshToken = req.cookies.refreshToken
    const ipAddress = req.ip
    const userAgent = req.headers['user-agent'] || 'n/a'
    const result = await service.rfToken(oldRefreshToken, ipAddress, userAgent)

    res.cookie('refreshToken', result.newRefreshToken, {
      httpOnly: true,
      secure: false,
    })
    res.status(200).json({ token: result.newAccessToken })
  } catch (error) {
    next(error)
  }
}


export const logout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken
    await service.logout(refreshToken)
    res.status(200).json({ messgae: 'logout success' })
  } catch (error) {
    next(error)
  }
}

