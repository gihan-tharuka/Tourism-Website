'use client'

import { Search, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { searchTours } from '@/services/search.service'
import type { Tour } from '@/types/tour'

export interface TourSearchState {
  query: string
  results: Tour[]
  isSearching: boolean
  error: string | null
}

interface TourSearchProps {
  onStateChange: (state: TourSearchState) => void
}

const emptyState: TourSearchState = {
  query: '',
  results: [],
  isSearching: false,
  error: null,
}

export function TourSearch({ onStateChange }: TourSearchProps) {
  const [value, setValue] = useState('')
  const [debouncedValue, setDebouncedValue] = useState('')

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedValue(value.trim())
    }, 300)

    return () => window.clearTimeout(timeout)
  }, [value])

  useEffect(() => {
    let isActive = true

    const runSearch = async () => {
      if (!debouncedValue) {
        onStateChange(emptyState)
        return
      }

      onStateChange({
        query: debouncedValue,
        results: [],
        isSearching: true,
        error: null,
      })

      try {
        const data = await searchTours(debouncedValue, 12)

        if (!isActive) {
          return
        }

        onStateChange({
          query: data.query,
          results: data.results,
          isSearching: false,
          error: null,
        })
      } catch {
        if (!isActive) {
          return
        }

        onStateChange({
          query: debouncedValue,
          results: [],
          isSearching: false,
          error: 'Unable to search tours. Please try again.',
        })
      }
    }

    runSearch()

    return () => {
      isActive = false
    }
  }, [debouncedValue, onStateChange])

  const clearSearch = () => {
    setValue('')
    setDebouncedValue('')
    onStateChange(emptyState)
  }

  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-950/85 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.25)]">
      <label htmlFor="tour-search" className="text-sm uppercase tracking-[0.32em] text-amber-200/80">
        Search tours
      </label>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            id="tour-search"
            type="search"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Search by country, beach, Ella, safari..."
            className="h-14 w-full rounded-full border border-white/10 bg-white/5 pl-12 pr-5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-amber-300 focus:bg-white/10"
          />
        </div>
        {value ? (
          <Button type="button" variant="secondary" onClick={clearSearch}>
            <X className="h-4 w-4" />
            Clear
          </Button>
        ) : null}
      </div>
    </div>
  )
}
