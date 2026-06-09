import { API_URL } from './api'
import type { ApiResponse } from '@/types/inquiry'

interface FetcherOptions extends RequestInit {
  timeoutMs?: number
}

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

export async function fetchJson<T>(path: string, options: FetcherOptions = {}): Promise<ApiResponse<T>> {
  if (!API_URL) {
    throw new ApiError('API URL is not configured.', 500)
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs ?? 10000)

  try {
    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      signal: controller.signal,
    })
    const payload = (await response.json()) as ApiResponse<T>

    if (!response.ok || !payload.success) {
      throw new ApiError(payload.message || 'Request failed.', response.status)
    }

    return payload
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }

    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ApiError('Request timed out.', 408)
    }

    throw new ApiError('Unable to save inquiry.', 500)
  } finally {
    clearTimeout(timeout)
  }
}
