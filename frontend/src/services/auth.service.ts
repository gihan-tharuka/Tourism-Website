import { fetchJson } from '@/lib/fetcher'

export interface AdminUser {
  id: string
  fullName: string
  email: string
  role: 'ADMIN'
}

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user: AdminUser
}

export const login = (payload: LoginPayload) => {
  return fetchJson<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export const getCurrentUser = (token: string) => {
  return fetchJson<AdminUser>('/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
