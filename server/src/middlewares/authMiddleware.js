import jwt from "jsonwebtoken";
import createError from 'http-errors'

export default (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(createError(401, "No token provided"));
    }

    const token = authHeader.split(" ")[1];

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = payload;

    next();
  } catch (err) {

    return next(createError(401, "Invalid token"));
  }
};
