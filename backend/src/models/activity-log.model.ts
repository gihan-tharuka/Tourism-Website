import { Schema, model, models } from "mongoose";

const activityLogSchema = new Schema(
  {
    actorId: { type: String },
    actorEmail: { type: String },
    action: { type: String, required: true, index: true },
    entityType: { type: String },
    entityId: { type: String },
    metadata: { type: Schema.Types.Mixed },
    ipAddress: { type: String },
    userAgent: { type: String },
    createdAt: { type: Date, default: Date.now, index: true },
  },
  {
    versionKey: false,
  },
);

export const ActivityLogModel =
  models.ActivityLog || model("ActivityLog", activityLogSchema);
