export type ActivityAction =
  | "ADMIN_LOGIN_SUCCESS"
  | "ADMIN_LOGIN_FAILED"
  | "ADMIN_VIEWED_INQUIRIES"
  | "ADMIN_VIEWED_INQUIRY_DETAIL"
  | "ADMIN_UPDATED_INQUIRY_STATUS";

export type ActivityLogInput = {
  actorId?: string;
  actorEmail?: string;
  action: ActivityAction;
  entityType?: string;
  entityId?: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
};

export type ActivityLogRecord = ActivityLogInput & {
  id: string;
  createdAt: Date;
};
