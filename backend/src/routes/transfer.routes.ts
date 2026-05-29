import { Router } from "express";
import {
  estimateTransfer,
  listTransferLocations,
  listTransferRoutes,
} from "../controllers/transfer.controller";

const router = Router();

router.get("/locations", listTransferLocations);
router.get("/routes", listTransferRoutes);
router.get("/estimate", estimateTransfer);

export default router;
