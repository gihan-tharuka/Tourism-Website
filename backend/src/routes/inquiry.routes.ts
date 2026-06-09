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

const router = Router();

router.post("/contact", createContactInquiry);
router.post("/tour", createTourInquiry);
router.post("/custom-tour", createCustomTourInquiry);
router.post("/transfer", createTransferInquiry);
router.get("/", getAllInquiries);
router.get("/:type/:id", getInquiryByTypeAndId);
router.patch("/:type/:id/status", updateInquiryStatus);

export default router;
