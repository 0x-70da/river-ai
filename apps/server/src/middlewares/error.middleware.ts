import { ErrorRequestHandler } from "express";
import mongoose from "mongoose";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);

  // Mongoose Validation Error
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({
      message: err.message,
    });
  }

  // Mongoose Cast Error
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      message: "Invalid id",
    });
  }

  return res.status(500).json({
    message: "Internal Server Error",
  });
};
