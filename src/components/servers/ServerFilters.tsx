'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Search } from 'lucide-react'
import { useState } from 'react'

const GAME_MODES = [
  'ALL',
  'SURVIVAL',
  'CREATIVE',
  'SKYBLOCK',
  'PRISON',
  'FACTIONS',
  'MINIGAMES',
  'BEDWARS',
  'SKYWARS',
  'MODDED',
  'VANILLA',
]

const SORT_OPTIONS = [
  { value: 'votes', label: 'Most Votes' },
  { value: 'players', label: 'Most Players' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest' },
]

export function ServerFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('search') || '')

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== 'ALL') {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    params.delete('page') // Reset to page 1 when filtering
    router.push(`/?${params.toString()}`)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    updateFilter('search', search)
  }

  const currentGameMode = searchParams.get('gameMode') || 'ALL'
  const currentSort = searchParams.get('sort') || 'votes'

  return (
    <div className="mb-8 space-y-4">
      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search servers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button type="submit">Search</Button>
      </form>

      {/* Game Mode Filter */}
      <div>
        <label className="text-sm font-medium mb-2 block">Game Mode</label>
        <div className="flex flex-wrap gap-2">
          {GAME_MODES.map((mode) => (
            <Button
              key={mode}
              variant={currentGameMode === mode ? 'default' : 'outline'}
              size="sm"
              onClick={() => updateFilter('gameMode', mode)}
              className="rounded-full"
            >
              {mode}
            </Button>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div>
        <label className="text-sm font-medium mb-2 block">Sort By</label>
        <div className="flex flex-wrap gap-2">
          {SORT_OPTIONS.map((option) => (
            <Button
              key={option.value}
              variant={currentSort === option.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => updateFilter('sort', option.value)}
              className="rounded-full"
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
