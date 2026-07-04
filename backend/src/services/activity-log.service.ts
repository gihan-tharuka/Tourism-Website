import mongoose from "mongoose";
import { isMongoLoggingEnabled } from "../config/mongodb";
import { ActivityLogModel } from "../models/activity-log.model";
import { ActivityLogInput, ActivityLogRecord } from "../types/activity-log.types";

const isReadyToLog = () => {
  return isMongoLoggingEnabled() && mongoose.connection.readyState === 1;
};

const toActivityLogRecord = (log: {
  _id: unknown;
  actorId?: string;
  actorEmail?: string;
  action: string;
  entityType?: string;
  entityId?: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}): ActivityLogRecord => ({
  id: String(log._id),
  actorId: log.actorId,
  actorEmail: log.actorEmail,
  action: log.action as ActivityLogRecord["action"],
  entityType: log.entityType,
  entityId: log.entityId,
  metadata: log.metadata,
  ipAddress: log.ipAddress,
  userAgent: log.userAgent,
  createdAt: log.createdAt,
});

export const logActivity = async (data: ActivityLogInput) => {
  if (!isReadyToLog()) {
    return;
  }

  try {
    await ActivityLogModel.create(data);
  } catch (error) {
    console.warn("Activity logging failed. Continuing without interrupting API flow.");
    if (process.env.NODE_ENV === "development") {
      console.warn(error);
    }
  }
};

export const getRecentActivityLogs = async (limit = 50): Promise<ActivityLogRecord[]> => {
  if (!isReadyToLog()) {
    return [];
  }

  try {
    const logs = await ActivityLogModel.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return logs.map(toActivityLogRecord);
  } catch (error) {
    console.warn("Unable to read activity logs. Returning an empty list.");
    if (process.env.NODE_ENV === "development") {
      console.warn(error);
    }
    return [];
  }
};
