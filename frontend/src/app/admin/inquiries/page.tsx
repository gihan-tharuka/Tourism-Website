'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { ProtectedRoute } from '@/components/admin/protected-route'
import { getToken, removeToken } from '@/lib/auth'
import {
  flattenInquiries,
  getInquiries,
  updateInquiryStatus,
  type AdminInquiry,
  type AdminInquiryType,
  type InquiryStatus,
} from '@/services/admin-inquiry.service'

const typeFilters: Array<'all' | AdminInquiryType> = ['all', 'contact', 'tour', 'custom-tour', 'transfer']
const statusFilters: Array<'all' | InquiryStatus> = ['all', 'NEW', 'CONTACTED', 'CONFIRMED', 'CANCELLED']
const statuses: InquiryStatus[] = ['NEW', 'CONTACTED', 'CONFIRMED', 'CANCELLED']

const typeLabel = (type: string) =>
  ({
    contact: 'Contact',
    tour: 'Tour',
    'custom-tour': 'Custom Tour',
    transfer: 'Transfer',
  })[type] ?? type

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<AdminInquiry[]>([])
  const [selected, setSelected] = useState<AdminInquiry | null>(null)
  const [typeFilter, setTypeFilter] = useState<'all' | AdminInquiryType>('all')
  const [statusFilter, setStatusFilter] = useState<'all' | InquiryStatus>('all')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = getToken()

    if (!token) {
      return
    }

    getInquiries(token)
      .then((response) => setInquiries(response.data ? flattenInquiries(response.data) : []))
      .catch(() => setError('Unable to load inquiries.'))
      .finally(() => setIsLoading(false))
  }, [])

  const filtered = useMemo(
    () =>
      inquiries.filter((inquiry) => {
        const matchesType = typeFilter === 'all' || inquiry.type === typeFilter
        const matchesStatus = statusFilter === 'all' || inquiry.status === statusFilter
        return matchesType && matchesStatus
      }),
    [inquiries, statusFilter, typeFilter],
  )

  const handleStatusChange = async (inquiry: AdminInquiry, status: InquiryStatus) => {
    const token = getToken()

    if (!token) {
      return
    }

    setInquiries((current) =>
      current.map((item) => (item.id === inquiry.id && item.type === inquiry.type ? { ...item, status } : item)),
    )

    if (selected?.id === inquiry.id && selected.type === inquiry.type) {
      setSelected({ ...selected, status })
    }

    try {
      await updateInquiryStatus(token, inquiry.type, inquiry.id, status)
    } catch {
      setError('Unable to update inquiry status.')
    }
  }

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
                Lead Management
              </p>
              <h1 className="mt-3 text-3xl font-semibold">Inquiries</h1>
            </div>
            <div className="flex gap-3">
              <Link
                href="/admin/dashboard"
                className="rounded-full border border-amber-200/30 px-5 py-3 text-sm font-semibold text-amber-100 transition hover:bg-amber-300 hover:text-slate-950"
              >
                Dashboard
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

          <section className="mt-6 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-5 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {typeFilters.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setTypeFilter(type)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    typeFilter === type
                      ? 'bg-amber-300 text-slate-950'
                      : 'border border-white/10 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {type === 'all' ? 'All' : typeLabel(type)}
                </button>
              ))}
            </div>
            <select
              aria-label="Status filter"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as 'all' | InquiryStatus)}
              className="rounded-full border border-white/10 bg-slate-900 px-4 py-2 text-sm text-white"
            >
              {statusFilters.map((status) => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Statuses' : status}
                </option>
              ))}
            </select>
          </section>

          {error && <p className="mt-6 text-sm font-medium text-red-300">{error}</p>}

          <section className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead className="border-b border-white/10 text-xs uppercase tracking-[0.24em] text-slate-400">
                  <tr>
                    <th className="px-5 py-4">Name</th>
                    <th className="px-5 py-4">Type</th>
                    <th className="px-5 py-4">Country</th>
                    <th className="px-5 py-4">WhatsApp</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Created Date</th>
                    <th className="px-5 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading && (
                    <tr>
                      <td colSpan={7} className="px-5 py-8 text-center text-slate-300">
                        Loading inquiries...
                      </td>
                    </tr>
                  )}
                  {!isLoading &&
                    filtered.map((inquiry) => (
                      <tr key={`${inquiry.type}-${inquiry.id}`} className="border-b border-white/5">
                        <td className="px-5 py-4 font-medium text-white">{inquiry.fullName}</td>
                        <td className="px-5 py-4 text-slate-300">{typeLabel(inquiry.type)}</td>
                        <td className="px-5 py-4 text-slate-300">{inquiry.country || '-'}</td>
                        <td className="px-5 py-4 text-slate-300">{inquiry.whatsapp}</td>
                        <td className="px-5 py-4">
                          <select
                            aria-label="Inquiry status"
                            value={inquiry.status}
                            onChange={(event) =>
                              handleStatusChange(inquiry, event.target.value as InquiryStatus)
                            }
                            className="rounded-full border border-amber-200/20 bg-slate-950 px-3 py-2 text-xs font-semibold text-amber-100"
                          >
                            {statuses.map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-5 py-4 text-slate-300">{formatDate(inquiry.createdAt)}</td>
                        <td className="px-5 py-4">
                          <button
                            type="button"
                            onClick={() => setSelected(inquiry)}
                            className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white/10"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  {!isLoading && filtered.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-5 py-8 text-center text-slate-300">
                        No inquiries match these filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {selected && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur">
              <div className="max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-white/10 bg-slate-900 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
                <div className="flex items-start justify-between gap-6 border-b border-white/10 pb-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.32em] text-amber-200">
                      {typeLabel(selected.type)}
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold">{selected.fullName}</h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 hover:bg-white/10"
                  >
                    Close
                  </button>
                </div>

                <dl className="mt-6 grid gap-4 md:grid-cols-2">
                  {Object.entries(selected).map(([key, value]) => (
                    <div key={key} className="rounded-xl bg-white/[0.05] p-4">
                      <dt className="text-xs uppercase tracking-[0.24em] text-slate-500">{key}</dt>
                      <dd className="mt-2 break-words text-sm leading-6 text-slate-100">
                        {Array.isArray(value)
                          ? value.join(', ')
                          : value === null || value === undefined || value === ''
                            ? '-'
                            : String(value)}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          )}
        </div>
      </main>
    </ProtectedRoute>
  )
}
