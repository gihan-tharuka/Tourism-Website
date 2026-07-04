export type ActivityAction =
  | 'ADMIN_LOGIN_SUCCESS'
  | 'ADMIN_LOGIN_FAILED'
  | 'ADMIN_VIEWED_INQUIRIES'
  | 'ADMIN_VIEWED_INQUIRY_DETAIL'
  | 'ADMIN_UPDATED_INQUIRY_STATUS'
  | string

export interface ActivityLog {
  id?: string
  _id?: string
  actorId?: string | null
  actorEmail?: string | null
  action: ActivityAction
  entityType?: string | null
  entityId?: string | null
  metadata?: Record<string, unknown> | null
  ipAddress?: string | null
  userAgent?: string | null
  createdAt: string
}

export interface ActivityLogFilters {
  action: string
  actorEmail: string
  search: string
  startDate: string
  endDate: string
}
