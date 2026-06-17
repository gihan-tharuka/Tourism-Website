import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware";
import { getRecentActivityLogs } from "../services/activity-log.service";
import { sendSuccess } from "../utils/api-response";

const router = Router();

router.get("/activity-logs", requireAuth, async (_req, res, next) => {
  try {
    const logs = await getRecentActivityLogs();
    return sendSuccess(res, logs);
  } catch (error) {
    return next(error);
  }
});

export default router;
