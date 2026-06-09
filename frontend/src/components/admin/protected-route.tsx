'use client'

import { ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getToken } from '@/lib/auth'

interface ProtectedRouteProps {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter()
  const [access, setAccess] = useState<'checking' | 'allowed' | 'denied'>('checking')

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      if (getToken()) {
        setAccess('allowed')
        return
      }

      setAccess('denied')
      router.replace('/admin/login')
    }, 0)

    return () => window.clearTimeout(timeout)
  }, [router])

  if (access !== 'allowed') {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
        <p className="text-sm uppercase tracking-[0.32em] text-amber-200">Checking access...</p>
      </main>
    )
  }

  return <>{children}</>
}
