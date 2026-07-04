'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { ActivityLogDetailModal } from '@/components/admin/activity-log-detail-modal'
import { ActivityLogFilters } from '@/components/admin/activity-log-filters'
import { ActivityLogsTable } from '@/components/admin/activity-logs-table'
import { ProtectedRoute } from '@/components/admin/protected-route'
import { removeToken } from '@/lib/auth'
import { getActivityLogs } from '@/services/activity-log.service'
import type { ActivityLog, ActivityLogFilters as ActivityLogFiltersState } from '@/types/activity-log'

const initialFilters: ActivityLogFiltersState = {
  action: 'all',
  actorEmail: '',
  search: '',
  startDate: '',
  endDate: '',
}

const includesText = (value: string | null | undefined, query: string) => {
  return value?.toLowerCase().includes(query) ?? false
}

const isWithinDateRange = (createdAt: string, startDate: string, endDate: string) => {
  const createdTime = new Date(createdAt).getTime()

  if (startDate) {
    const startTime = new Date(`${startDate}T00:00:00`).getTime()

    if (createdTime < startTime) {
      return false
    }
  }

  if (endDate) {
    const endTime = new Date(`${endDate}T23:59:59`).getTime()

    if (createdTime > endTime) {
      return false
    }
  }

  return true
}

export default function AdminActivityLogsPage() {
  const [logs, setLogs] = useState<ActivityLog[]>([])
  const [selectedLog, setSelectedLog] = useState<ActivityLog | null>(null)
  const [filters, setFilters] = useState<ActivityLogFiltersState>(initialFilters)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getActivityLogs()
      .then((response) => setLogs(response.data ?? []))
      .catch(() => setError('Unable to load activity logs.'))
      .finally(() => setIsLoading(false))
  }, [])

  const actions = useMemo(() => {
    return Array.from(new Set(logs.map((log) => log.action))).sort()
  }, [logs])

  const filteredLogs = useMemo(() => {
    const search = filters.search.trim().toLowerCase()
    const actorEmail = filters.actorEmail.trim().toLowerCase()

    return logs.filter((log) => {
      const matchesAction = filters.action === 'all' || log.action === filters.action
      const matchesActorEmail = !actorEmail || includesText(log.actorEmail, actorEmail)
      const matchesSearch =
        !search || includesText(log.action, search) || includesText(log.actorEmail, search)
      const matchesDate = isWithinDateRange(log.createdAt, filters.startDate, filters.endDate)

      return matchesAction && matchesActorEmail && matchesSearch && matchesDate
    })
  }, [filters, logs])

  const handleLogout = () => {
    removeToken()
    window.location.href = '/admin/login'
  }

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6">
        <div className="mx-auto max-w-7xl">
          <header className="flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.36em] text-amber-200">
                Audit Trail
              </p>
              <h1 className="mt-3 text-3xl font-semibold">Activity Logs</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                Review admin login attempts, inquiry views, and lead status changes recorded in MongoDB.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/admin/dashboard"
                className="rounded-full border border-amber-200/30 px-5 py-3 text-sm font-semibold text-amber-100 transition hover:bg-amber-300 hover:text-slate-950"
              >
                Dashboard
              </Link>
              <Link
                href="/admin/inquiries"
                className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
              >
                Inquiries
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
              >
                Logout
              </button>
            </div>
          </header>

          <section className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Total Logs</p>
              <p className="mt-4 text-4xl font-semibold">{logs.length}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Visible</p>
              <p className="mt-4 text-4xl font-semibold">{filteredLogs.length}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Action Types</p>
              <p className="mt-4 text-4xl font-semibold">{actions.length}</p>
            </div>
          </section>

          <ActivityLogFilters
            filters={filters}
            actions={actions}
            onChange={setFilters}
            onReset={() => setFilters(initialFilters)}
          />

          {error && <p className="mt-6 text-sm font-medium text-red-300">{error}</p>}

          <ActivityLogsTable
            logs={filteredLogs}
            isLoading={isLoading}
            onSelect={setSelectedLog}
          />

          {selectedLog ? (
            <ActivityLogDetailModal log={selectedLog} onClose={() => setSelectedLog(null)} />
          ) : null}
        </div>
      </main>
    </ProtectedRoute>
  )
}
