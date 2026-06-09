import { Router } from "express";
import {
  createContactInquiry,
  createCustomTourInquiry,
  createTourInquiry,
  createTransferInquiry,
  getAllInquiries,
  getInquiryByTypeAndId,
  updateInquiryStatus,
} from "../controllers/inquiry.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

router.post("/contact", createContactInquiry);
router.post("/tour", createTourInquiry);
router.post("/custom-tour", createCustomTourInquiry);
router.post("/transfer", createTransferInquiry);
router.get("/", requireAuth, getAllInquiries);
router.get("/:type/:id", requireAuth, getInquiryByTypeAndId);
router.patch("/:type/:id/status", requireAuth, updateInquiryStatus);

export default router;
