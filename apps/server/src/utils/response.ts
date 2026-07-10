import { Response } from "express";

export function success(res: Response, data: unknown, status = 200) {
  return res.status(status).json({
    success: true,
    data,
  });
}

export function error(res: Response, message: string, status = 500) {
  return res.status(status).json({
    success: false,
    message,
  });
}
