import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { error } from "../utils/response.js";

export function validateObjectId(req: Request, res: Response, next: NextFunction) {
  const { chatId } = req.params as { chatId: string };

  if (!mongoose.Types.ObjectId.isValid(chatId)) {
    return error(res, "Invalid chat id", 400);
  }

  next();
}
