'use client'

import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Users, Star, ThumbsUp, Copy, Check } from 'lucide-react'
import { useState } from 'react'

interface ServerCardProps {
  server: {
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
  promoted?: boolean
}

export function ServerCard({ server, promoted = false }: ServerCardProps) {
  const [copied, setCopied] = useState(false)

  const copyAddress = () => {
    navigator.clipboard.writeText(server.address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="minecraft-card hover:scale-105 transition-transform relative overflow-hidden">
      {promoted && (
        <div className="absolute top-0 right-0">
          <span className="promoted-badge">PROMOTED</span>
        </div>
      )}

      {server.banner && (
        <div
          className="h-32 bg-cover bg-center"
          style={{ backgroundImage: `url(${server.banner})` }}
        />
      )}

      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2">
              {server.name}
              <div className={server.online ? 'online-indicator' : 'offline-indicator'} />
            </CardTitle>
            <CardDescription className="line-clamp-2 mt-2">
              {server.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge>{server.gameMode}</Badge>
          {server.online && (
            <Badge variant="secondary">
              <Users className="h-3 w-3 mr-1" />
              {server.playerCount}/{server.maxPlayers}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{server.averageRating.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <ThumbsUp className="h-4 w-4" />
            <span>{server.monthlyVotes} votes</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <code className="flex-1 px-3 py-2 bg-muted rounded text-sm">
            {server.address}
          </code>
          <Button
            size="sm"
            variant="outline"
            onClick={copyAddress}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Link href={`/servers/${server.id}`} className="flex-1">
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
        <Link href={`/servers/${server.id}/vote`} className="flex-1">
          <Button className="w-full">
            Vote Now
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
