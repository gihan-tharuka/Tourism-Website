'use client'

import type { ActivityLogFilters } from '@/types/activity-log'

interface ActivityLogFiltersProps {
  filters: ActivityLogFilters
  actions: string[]
  onChange: (filters: ActivityLogFilters) => void
  onReset: () => void
}

export function ActivityLogFilters({
  filters,
  actions,
  onChange,
  onReset,
}: ActivityLogFiltersProps) {
  const updateFilter = (key: keyof ActivityLogFilters, value: string) => {
    onChange({ ...filters, [key]: value })
  }

  return (
    <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.05] p-5">
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto] lg:items-end">
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.24em] text-slate-400">Search</span>
          <input
            value={filters.search}
            onChange={(event) => updateFilter('search', event.target.value)}
            placeholder="Action or actor email"
            className="h-11 w-full rounded-full border border-white/10 bg-slate-950 px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-amber-300"
          />
        </label>

        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.24em] text-slate-400">Action</span>
          <select
            value={filters.action}
            onChange={(event) => updateFilter('action', event.target.value)}
            className="h-11 w-full rounded-full border border-white/10 bg-slate-950 px-4 text-sm text-white outline-none focus:border-amber-300"
          >
            <option value="all">All Actions</option>
            {actions.map((action) => (
              <option key={action} value={action}>
                {action}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.24em] text-slate-400">Actor Email</span>
          <input
            value={filters.actorEmail}
            onChange={(event) => updateFilter('actorEmail', event.target.value)}
            placeholder="admin@..."
            className="h-11 w-full rounded-full border border-white/10 bg-slate-950 px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-amber-300"
          />
        </label>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <label className="space-y-2">
            <span className="text-xs uppercase tracking-[0.24em] text-slate-400">From</span>
            <input
              type="date"
              value={filters.startDate}
              onChange={(event) => updateFilter('startDate', event.target.value)}
              className="h-11 w-full rounded-full border border-white/10 bg-slate-950 px-4 text-sm text-white outline-none focus:border-amber-300"
            />
          </label>
          <label className="space-y-2 lg:hidden">
            <span className="text-xs uppercase tracking-[0.24em] text-slate-400">To</span>
            <input
              type="date"
              value={filters.endDate}
              onChange={(event) => updateFilter('endDate', event.target.value)}
              className="h-11 w-full rounded-full border border-white/10 bg-slate-950 px-4 text-sm text-white outline-none focus:border-amber-300"
            />
          </label>
        </div>

        <div className="hidden lg:block">
          <label className="space-y-2">
            <span className="text-xs uppercase tracking-[0.24em] text-slate-400">To</span>
            <input
              type="date"
              value={filters.endDate}
              onChange={(event) => updateFilter('endDate', event.target.value)}
              className="h-11 w-full rounded-full border border-white/10 bg-slate-950 px-4 text-sm text-white outline-none focus:border-amber-300"
            />
          </label>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={onReset}
          className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200 transition hover:bg-white/10"
        >
          Reset
        </button>
      </div>
    </section>
  )
}
