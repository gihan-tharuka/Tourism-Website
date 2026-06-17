import { fetchJson } from '@/lib/fetcher'
import { getToken } from '@/lib/auth'
import type { ActivityLog } from '@/types/activity-log'

export const getActivityLogs = async () => {
  const token = getToken()

  if (!token) {
    throw new Error('Admin token is missing.')
  }

  return fetchJson<ActivityLog[]>('/admin/activity-logs', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
