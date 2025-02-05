import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncError from "./catchAsyncError.js";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Not authenticated, token required", 401));
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedData) => {
    if (err) {
      return next(new ErrorHandler("Not authenticated, token failed", 401));
    }

    req.user = await User.findById(decodedData.id);

    next();
  });
});

export const authorizeRoles = (...roles) => {
  //...roles convert the parameters to a list of roles or array of roles example authorizeRoles('admin','user')
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
