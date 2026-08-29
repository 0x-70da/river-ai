import { Router } from "express";
import { getModels } from "@/controllers/model.controller.js";

const router = Router();

router.get("/", getModels);

export default router;
