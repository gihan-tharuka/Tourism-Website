'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ProtectedRoute } from '@/components/admin/protected-route'
import { getToken, removeToken } from '@/lib/auth'
import { getInquiries, type InquiryCounts } from '@/services/admin-inquiry.service'

const statLabels: Array<{ key: keyof InquiryCounts; label: string }> = [
  { key: 'total', label: 'Total Inquiries' },
  { key: 'new', label: 'New' },
  { key: 'contacted', label: 'Contacted' },
  { key: 'confirmed', label: 'Confirmed' },
  { key: 'cancelled', label: 'Cancelled' },
]

export default function AdminDashboardPage() {
  const [counts, setCounts] = useState<InquiryCounts | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const token = getToken()

    if (!token) {
      return
    }

    getInquiries(token)
      .then((response) => setCounts(response.data?.counts ?? null))
      .catch(() => setError('Unable to load dashboard metrics.'))
  }, [])

  const handleLogout = () => {
    removeToken()
    window.location.href = '/admin/login'
  }

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-slate-950 px-6 py-8 text-white">
        <div className="mx-auto max-w-7xl">
          <header className="flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.36em] text-amber-200">
                Lead Command
              </p>
              <h1 className="mt-3 text-3xl font-semibold">Inquiry Dashboard</h1>
            </div>
            <div className="flex gap-3">
              <Link
                href="/admin/inquiries"
                className="rounded-full border border-amber-200/30 px-5 py-3 text-sm font-semibold text-amber-100 transition hover:bg-amber-300 hover:text-slate-950"
              >
                Manage Inquiries
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

          {error && <p className="mt-6 text-sm font-medium text-red-300">{error}</p>}

          <section className="mt-8 grid gap-4 md:grid-cols-5">
            {statLabels.map((stat) => (
              <div
                key={stat.key}
                className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 shadow-[0_20px_70px_rgba(15,23,42,0.28)]"
              >
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">{stat.label}</p>
                <p className="mt-4 text-4xl font-semibold text-white">{counts?.[stat.key] ?? '-'}</p>
              </div>
            ))}
          </section>

          <section className="mt-8 rounded-[2rem] border border-amber-300/15 bg-gradient-to-r from-slate-900/90 to-slate-950 p-8">
            <p className="text-sm uppercase tracking-[0.32em] text-amber-200">Pipeline</p>
            <h2 className="mt-3 text-2xl font-semibold">Monitor every lead from first inquiry to confirmation.</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
              New website submissions are saved in Neon before WhatsApp opens. Use the inquiry table to review
              customer details, filter lead types, and update each status as your team follows up.
            </p>
          </section>

          <section className="mt-6 grid gap-4 md:grid-cols-2">
            <Link
              href="/admin/inquiries"
              className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 transition hover:border-amber-300/40 hover:bg-white/[0.08]"
            >
              <p className="text-xs uppercase tracking-[0.28em] text-amber-200">Lead Operations</p>
              <h2 className="mt-3 text-xl font-semibold">Manage inquiries</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Review new leads, inspect customer details, and update inquiry status.
              </p>
            </Link>
            <Link
              href="/admin/activity-logs"
              className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 transition hover:border-amber-300/40 hover:bg-white/[0.08]"
            >
              <p className="text-xs uppercase tracking-[0.28em] text-amber-200">Audit Trail</p>
              <h2 className="mt-3 text-xl font-semibold">View activity logs</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Monitor admin logins, inquiry views, and status changes recorded in MongoDB.
              </p>
            </Link>
          </section>
        </div>
      </main>
    </ProtectedRoute>
  )
}
