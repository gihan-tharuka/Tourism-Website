'use client'

import type { ActivityLog } from '@/types/activity-log'

interface ActivityLogDetailModalProps {
  log: ActivityLog
  onClose: () => void
}

const formatValue = (value: unknown) => {
  if (value === null || value === undefined || value === '') {
    return '-'
  }

  if (typeof value === 'object') {
    return JSON.stringify(value, null, 2)
  }

  return String(value)
}

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'medium',
  }).format(new Date(value))

export function ActivityLogDetailModal({ log, onClose }: ActivityLogDetailModalProps) {
  const details = {
    id: log.id ?? log._id,
    actorId: log.actorId,
    actorEmail: log.actorEmail,
    action: log.action,
    entityType: log.entityType,
    entityId: log.entityId,
    ipAddress: log.ipAddress,
    userAgent: log.userAgent,
    createdAt: formatDate(log.createdAt),
    metadata: log.metadata,
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur">
      <div className="max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-white/10 bg-slate-900 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
        <div className="flex items-start justify-between gap-6 border-b border-white/10 pb-4">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-amber-200">Activity Detail</p>
            <h2 className="mt-2 break-words text-2xl font-semibold">{log.action}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 hover:bg-white/10"
          >
            Close
          </button>
        </div>

        <dl className="mt-6 grid gap-4 md:grid-cols-2">
          {Object.entries(details).map(([key, value]) => (
            <div key={key} className="rounded-xl bg-white/[0.05] p-4">
              <dt className="text-xs uppercase tracking-[0.24em] text-slate-500">{key}</dt>
              <dd className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-slate-100">
                {formatValue(value)}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
