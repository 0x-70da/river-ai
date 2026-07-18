import { ErrorRequestHandler } from "express";
import mongoose from "mongoose";
import { error } from "../utils/response.js";

export const errorHandler: ErrorRequestHandler = (err, req, res) => {
  console.error(err);

  // Mongoose Validation Error
  if (err instanceof mongoose.Error.ValidationError) {
    return error(res, err.message, 400);
  }

  // Mongoose Cast Error
  if (err instanceof mongoose.Error.CastError) {
    return error(res, "Invalid id", 400);
  }

  return error(res, "Internal Server Error", 500);
};
