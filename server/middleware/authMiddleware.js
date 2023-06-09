const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401);

      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }

    if (
      roles.includes(req.user.role) ||
      !["Teacher", "Admin"].includes(req.user.role)
    ) {
      res.status(403);
      throw new Error("Not authorized to access this resource");
    }

    next();
  };
};

module.exports = { protect, authorize };
