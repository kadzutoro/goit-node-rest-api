import User from "../models/user.js";
import jwt from "jsonwebtoken";
import HttpError from "../helpers/httpError.js";

const checkToken = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return next(HttpError(401, "Not authorized"));
    }

    const [bearer, token] = authorizationHeader.split(" ", 2);

    if (bearer !== "Bearer") {
      return next(HttpError(401, "Not authorized"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return next(HttpError(401, "Not authorized"));
    }

    if (user.token !== token) {
      return next(HttpError(401, "Not authorized"));
    }

    req.user = {
      id: user._id,
    };

    next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return next(HttpError(401, "Not authorized"));
    }
    next(error);
  }
};

export default checkToken;
