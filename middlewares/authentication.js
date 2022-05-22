const jwt = require("jsonwebtoken");
const { throwError } = require("../helpers/utils");

const authMiddleware = {};

authMiddleware.loginRequired = (req, res, next) => {
  try {
    const tokenString = req.headers.authorization;
    if (!tokenString)
      throwError(401, "Token is missing", "Login required error");
    const token = tokenString.replace("Bearer ", "");
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
      if (err) throwError(401, "Token error", "Login required error");
      req.currentUserId = payload._id;
    });
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;
