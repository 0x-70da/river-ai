import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

export function validateObjectId(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { chatId } = req.params as { chatId: string };

  if (!mongoose.Types.ObjectId.isValid(chatId)) {
    return res.status(400).json({
      message: "Invalid chat id",
    });
  }

  next();
}
