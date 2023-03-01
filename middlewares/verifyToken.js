const { serverErrs } = require("./customError");
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

dotenv.config();

const verifyToken = (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      next(serverErrs.UNAUTHORIZED("unauthorized"));
    } else {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      console.log(decoded);
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = verifyToken;
