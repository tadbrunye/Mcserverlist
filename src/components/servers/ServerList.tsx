'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ServerCard } from './ServerCard'
import { Button } from '@/components/ui/Button'

interface Server {
  id: string
  name: string
  description: string
  address: string
  gameMode: string
  online: boolean
  playerCount: number
  maxPlayers: number
  totalVotes: number
  monthlyVotes: number
  averageRating: number
  banner?: string
  owner: {
    name: string
  }
}

export function ServerList() {
  const searchParams = useSearchParams()
  const [servers, setServers] = useState<Server[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchServers()
  }, [searchParams, page])

  const fetchServers = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams(searchParams.toString())
      params.set('page', page.toString())

      const response = await fetch(`/api/servers?${params}`)
      const data = await response.json()

      setServers(data.servers)
      setTotalPages(data.pages)
    } catch (error) {
      console.error('Error fetching servers:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading && servers.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-64 rounded-lg border bg-card animate-pulse"
          />
        ))}
      </div>
    )
  }

  if (servers.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No servers found. Try adjusting your filters.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servers.map((server) => (
          <ServerCard key={server.id} server={server} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </Button>
          <span className="flex items-center px-4">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
