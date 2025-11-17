'use client'

import { useEffect, useState } from 'react'
import { ServerCard } from './ServerCard'
import { Crown } from 'lucide-react'

interface PromotedServer {
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
}

export function PromotedServers() {
  const [servers, setServers] = useState<PromotedServer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPromotedServers()
  }, [])

  const fetchPromotedServers = async () => {
    try {
      const response = await fetch('/api/servers/promoted')
      const data = await response.json()
      setServers(data)
    } catch (error) {
      console.error('Error fetching promoted servers:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading || servers.length === 0) {
    return null
  }

  return (
    <section className="mb-12">
      <div className="flex items-center gap-2 mb-6">
        <Crown className="h-6 w-6 text-yellow-500" />
        <h2 className="text-2xl font-bold">Promoted Servers</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servers.map((server) => (
          <ServerCard key={server.id} server={server} promoted />
        ))}
      </div>
    </section>
  )
}
