import { Router } from "express";
import { getTour, listTours } from "../controllers/tour.controller";

const router = Router();

router.get("/", listTours);
router.get("/:slug", getTour);

export default router;
