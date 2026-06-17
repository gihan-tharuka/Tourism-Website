'use client'

import type { ActivityLog } from '@/types/activity-log'

interface ActivityLogsTableProps {
  logs: ActivityLog[]
  isLoading: boolean
  onSelect: (log: ActivityLog) => void
}

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))

const actionLabel = (action: string) => action.replaceAll('_', ' ')

const actionBadgeClass = (action: string) => {
  if (action.includes('FAILED')) {
    return 'border-red-300/25 bg-red-400/10 text-red-100'
  }

  if (action.includes('UPDATED')) {
    return 'border-emerald-300/25 bg-emerald-400/10 text-emerald-100'
  }

  return 'border-amber-300/25 bg-amber-300/10 text-amber-100'
}

export function ActivityLogsTable({ logs, isLoading, onSelect }: ActivityLogsTableProps) {
  if (isLoading) {
    return (
      <section className="mt-6 rounded-2xl border border-white/10 bg-slate-900/80 p-8 text-center text-slate-300">
        Loading activity logs...
      </section>
    )
  }

  if (logs.length === 0) {
    return (
      <section className="mt-6 rounded-2xl border border-white/10 bg-slate-900/80 p-8 text-center">
        <p className="text-sm uppercase tracking-[0.28em] text-amber-200">No activity logs found yet.</p>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          MongoDB logging may be disabled, or no admin activity has been recorded.
        </p>
      </section>
    )
  }

  return (
    <section className="mt-6">
      <div className="hidden overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 lg:block">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-white/10 text-xs uppercase tracking-[0.24em] text-slate-400">
            <tr>
              <th className="px-5 py-4">Action</th>
              <th className="px-5 py-4">Actor Email</th>
              <th className="px-5 py-4">Entity Type</th>
              <th className="px-5 py-4">Created</th>
              <th className="px-5 py-4">IP Address</th>
              <th className="px-5 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id ?? log._id} className="border-b border-white/5">
                <td className="px-5 py-4">
                  <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${actionBadgeClass(log.action)}`}>
                    {actionLabel(log.action)}
                  </span>
                </td>
                <td className="px-5 py-4 text-slate-300">{log.actorEmail || '-'}</td>
                <td className="px-5 py-4 text-slate-300">{log.entityType || '-'}</td>
                <td className="px-5 py-4 text-slate-300">{formatDate(log.createdAt)}</td>
                <td className="px-5 py-4 text-slate-300">{log.ipAddress || '-'}</td>
                <td className="px-5 py-4">
                  <button
                    type="button"
                    onClick={() => onSelect(log)}
                    className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white/10"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 lg:hidden">
        {logs.map((log) => (
          <article
            key={log.id ?? log._id}
            className="rounded-2xl border border-white/10 bg-slate-900/80 p-5"
          >
            <div className="flex flex-col gap-3">
              <span className={`w-fit rounded-full border px-3 py-1 text-xs font-semibold ${actionBadgeClass(log.action)}`}>
                {actionLabel(log.action)}
              </span>
              <div>
                <p className="break-words text-sm font-medium text-white">{log.actorEmail || 'Unknown actor'}</p>
                <p className="mt-1 text-xs text-slate-400">{formatDate(log.createdAt)}</p>
              </div>
            </div>
            <div className="mt-4 grid gap-2 text-sm text-slate-300">
              <p>Entity: {log.entityType || '-'}</p>
              <p>IP: {log.ipAddress || '-'}</p>
            </div>
            <button
              type="button"
              onClick={() => onSelect(log)}
              className="mt-4 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white/10"
            >
              View Details
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}
