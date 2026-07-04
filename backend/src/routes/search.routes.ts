import { Router } from "express";
import {
  searchDestinations,
  searchGlobal,
  searchTours,
} from "../controllers/search.controller";

const router = Router();

router.get("/tours", searchTours);
router.get("/destinations", searchDestinations);
router.get("/global", searchGlobal);

export default router;
