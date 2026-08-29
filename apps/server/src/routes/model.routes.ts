import { Router } from "express";
import { getModels } from "@/controllers/model.controller.js";

const router: Router = Router();

router.get("/", getModels);

export default router;
