import { Router } from "express";
import { listTestimonials } from "../controllers/testimonial.controller";

const router = Router();

router.get("/", listTestimonials);

export default router;
