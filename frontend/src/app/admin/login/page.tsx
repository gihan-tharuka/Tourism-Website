'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { setToken } from '@/lib/auth'
import { login } from '@/services/auth.service'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('admin@beyondsea.com')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const response = await login({ email, password })

      if (response.data?.token) {
        setToken(response.data.token)
        router.push('/admin/dashboard')
      }
    } catch {
      setError('Invalid email or password.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-6xl items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 shadow-[0_30px_90px_rgba(15,23,42,0.45)] backdrop-blur-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.36em] text-amber-200">
            Beyond Sea Travels
          </p>
          <h1 className="mt-4 text-3xl font-semibold text-white">Admin Login</h1>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Access the inquiry dashboard and lead management workspace.
          </p>

          <div className="mt-8 space-y-4">
            <input
              aria-label="Email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-amber-300"
              placeholder="Email"
              required
            />
            <input
              aria-label="Password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-amber-300"
              placeholder="Password"
              required
            />
          </div>

          {error && <p className="mt-4 text-sm font-medium text-red-300">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-slate-950 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Signing in...' : 'Login'}
          </button>
        </form>
      </div>
    </main>
  )
}
