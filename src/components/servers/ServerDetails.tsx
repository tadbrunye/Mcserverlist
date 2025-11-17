'use client'

import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import {
  Users,
  Star,
  ThumbsUp,
  Globe,
  MessageCircle,
  ShoppingBag,
  Copy,
  Check,
  ExternalLink,
} from 'lucide-react'
import { useState } from 'react'
import { formatRelativeTime } from '@/lib/utils'

interface ServerDetailsProps {
  server: {
    id: string
    name: string
    description: string
    address: string
    port: number
    gameMode: string
    version?: string | null
    website?: string | null
    discordLink?: string | null
    storeLink?: string | null
    banner?: string | null
    online: boolean
    playerCount: number
    maxPlayers: number
    totalVotes: number
    monthlyVotes: number
    averageRating: number
    lastPing?: Date | null
    createdAt: Date
    owner: {
      name: string | null
    }
    _count: {
      votes: number
      reviews: number
    }
  }
}

export function ServerDetails({ server }: ServerDetailsProps) {
  const [copied, setCopied] = useState(false)

  const copyAddress = () => {
    navigator.clipboard.writeText(`${server.address}:${server.port}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      {server.banner && (
        <div
          className="w-full h-64 bg-cover bg-center rounded-lg shadow-lg"
          style={{ backgroundImage: `url(${server.banner})` }}
        />
      )}

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <CardTitle className="text-4xl">{server.name}</CardTitle>
                <div className={server.online ? 'online-indicator' : 'offline-indicator'} />
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge>{server.gameMode}</Badge>
                {server.version && <Badge variant="secondary">{server.version}</Badge>}
                <Badge variant="outline">
                  Added {formatRelativeTime(server.createdAt)}
                </Badge>
              </div>
            </div>
            <Link href={`/servers/${server.id}/vote`}>
              <Button size="lg" className="rounded-full">
                <ThumbsUp className="h-5 w-5 mr-2" />
                Vote Now
              </Button>
            </Link>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">About</h3>
            <p className="text-muted-foreground whitespace-pre-wrap">{server.description}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg border bg-card">
              <Users className="h-5 w-5 text-primary mb-2" />
              <p className="text-2xl font-bold">
                {server.online ? server.playerCount : '?'}
              </p>
              <p className="text-sm text-muted-foreground">Players Online</p>
            </div>

            <div className="p-4 rounded-lg border bg-card">
              <ThumbsUp className="h-5 w-5 text-primary mb-2" />
              <p className="text-2xl font-bold">{server.monthlyVotes}</p>
              <p className="text-sm text-muted-foreground">Monthly Votes</p>
            </div>

            <div className="p-4 rounded-lg border bg-card">
              <Star className="h-5 w-5 text-yellow-400 mb-2" />
              <p className="text-2xl font-bold">{server.averageRating.toFixed(1)}</p>
              <p className="text-sm text-muted-foreground">Average Rating</p>
            </div>

            <div className="p-4 rounded-lg border bg-card">
              <MessageCircle className="h-5 w-5 text-primary mb-2" />
              <p className="text-2xl font-bold">{server._count.reviews}</p>
              <p className="text-sm text-muted-foreground">Reviews</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Server Address</h3>
            <div className="flex items-center gap-2">
              <code className="flex-1 px-4 py-3 bg-muted rounded-lg text-lg font-mono">
                {server.address}:{server.port}
              </code>
              <Button variant="outline" onClick={copyAddress}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {server.website && (
              <a href={server.website} target="_blank" rel="noopener noreferrer">
                <Button variant="outline">
                  <Globe className="h-4 w-4 mr-2" />
                  Website
                  <ExternalLink className="h-3 w-3 ml-2" />
                </Button>
              </a>
            )}
            {server.discordLink && (
              <a href={server.discordLink} target="_blank" rel="noopener noreferrer">
                <Button variant="outline">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Discord
                  <ExternalLink className="h-3 w-3 ml-2" />
                </Button>
              </a>
            )}
            {server.storeLink && (
              <a href={server.storeLink} target="_blank" rel="noopener noreferrer">
                <Button variant="outline">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Store
                  <ExternalLink className="h-3 w-3 ml-2" />
                </Button>
              </a>
            )}
          </div>

          <div className="pt-4 border-t text-sm text-muted-foreground">
            <p>
              Owned by {server.owner.name || 'Unknown'} •{' '}
              {server.totalVotes.toLocaleString()} total votes
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
