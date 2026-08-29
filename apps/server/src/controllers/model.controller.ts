import type { Request, Response } from "express";

import { getAvailableModels } from "@river/ai";
import { success } from "@/utils/response.js";

export function getModels(_req: Request, res: Response) {
  const models = getAvailableModels();

  return success(res, models, 200);
}
