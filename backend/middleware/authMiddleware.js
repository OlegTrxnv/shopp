import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// To get to protected routes must send req with headers authorization value:
// Bearer <token>...

const protectRoute = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      // Grab token value from headers authorization
      token = req.headers.authorization.split(" ")[1];
      // Decode user id from token's payload
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // make signed in user info available on req object (not the password)
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const adminRoute = (req, res, next) => {
  if (req.user?.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Admin only access");
  }
};

export { adminRoute, protectRoute };
