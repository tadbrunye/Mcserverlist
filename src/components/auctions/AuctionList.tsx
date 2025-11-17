'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Clock, Trophy, DollarSign, Loader2 } from 'lucide-react'
import Link from 'next/link'

interface Auction {
  id: string
  position: number
  startDate: string
  endDate: string
  startingBid: number
  reservePrice: number | null
  status: string
  bids: Array<{
    id: string
    amount: number
    userId: string
    user: {
      name: string | null
    }
  }>
  _count: {
    bids: number
  }
}

export function AuctionList() {
  const { data: session } = useSession()
  const [auctions, setAuctions] = useState<Auction[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedServer, setSelectedServer] = useState<string>('')
  const [servers, setServers] = useState<any[]>([])
  const [bidAmounts, setBidAmounts] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState<string | null>(null)

  useEffect(() => {
    fetchAuctions()
    if (session) {
      fetchUserServers()
    }
  }, [session])

  const fetchAuctions = async () => {
    try {
      const response = await fetch('/api/auctions')
      const data = await response.json()
      setAuctions(data)
    } catch (error) {
      console.error('Error fetching auctions:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchUserServers = async () => {
    try {
      const response = await fetch('/api/my-servers')
      const data = await response.json()
      setServers(data)
      if (data.length > 0) {
        setSelectedServer(data[0].id)
      }
    } catch (error) {
      console.error('Error fetching servers:', error)
    }
  }

  const placeBid = async (auctionId: string) => {
    const amount = parseFloat(bidAmounts[auctionId])
    if (!amount || !selectedServer) return

    setSubmitting(auctionId)
    try {
      const response = await fetch(`/api/auctions/${auctionId}/bid`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serverId: selectedServer,
          amount,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        alert(error.error || 'Failed to place bid')
        return
      }

      // Refresh auctions
      await fetchAuctions()
      // Clear bid amount
      setBidAmounts(prev => ({ ...prev, [auctionId]: '' }))
      alert('Bid placed successfully!')
    } catch (error) {
      console.error('Error placing bid:', error)
      alert('Failed to place bid')
    } finally {
      setSubmitting(null)
    }
  }

  const getTimeRemaining = (endDate: string) => {
    const end = new Date(endDate).getTime()
    const now = new Date().getTime()
    const diff = end - now

    if (diff <= 0) return 'Ended'

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (days > 0) return `${days}d ${hours}h remaining`
    if (hours > 0) return `${hours}h ${minutes}m remaining`
    return `${minutes}m remaining`
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (auctions.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No active auctions at the moment</p>
          <p className="text-sm text-muted-foreground mt-2">Check back soon for new opportunities!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Active Auctions</h2>
        {!session && (
          <Link href="/auth/signin">
            <Button>Sign In to Bid</Button>
          </Link>
        )}
      </div>

      {session && servers.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <label className="block text-sm font-medium mb-2">
              Select Server to Promote
            </label>
            <select
              value={selectedServer}
              onChange={(e) => setSelectedServer(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            >
              {servers.map(server => (
                <option key={server.id} value={server.id}>
                  {server.name} - {server.address}
                </option>
              ))}
            </select>
          </CardContent>
        </Card>
      )}

      {session && servers.length === 0 && (
        <Card>
          <CardContent className="py-6">
            <p className="text-muted-foreground text-center">
              You need to add a server before you can bid.{' '}
              <Link href="/servers/add" className="text-primary hover:underline">
                Add your server
              </Link>
            </p>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {auctions.map((auction) => {
          const currentBid = auction.bids[0]?.amount || auction.startingBid
          const minimumNextBid = currentBid + 1

          return (
            <Card key={auction.id} className="border-2 border-yellow-500/20">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy className="h-6 w-6 text-yellow-500" />
                      <CardTitle>Position #{auction.position}</CardTitle>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {getTimeRemaining(auction.endDate)}
                    </div>
                  </div>
                  <Badge className="promoted-badge">
                    {auction._count.bids} {auction._count.bids === 1 ? 'bid' : 'bids'}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg border bg-muted/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Current Bid:</span>
                    <span className="text-2xl font-bold text-green-600">
                      ${currentBid.toFixed(2)}
                    </span>
                  </div>
                  {auction.bids[0] && (
                    <p className="text-xs text-muted-foreground text-right">
                      by {auction.bids[0].user.name || 'Anonymous'}
                    </p>
                  )}
                </div>

                {session && servers.length > 0 ? (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Your Bid (minimum: ${minimumNextBid.toFixed(2)})
                      </label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="number"
                            min={minimumNextBid}
                            step="0.01"
                            value={bidAmounts[auction.id] || ''}
                            onChange={(e) => setBidAmounts(prev => ({
                              ...prev,
                              [auction.id]: e.target.value
                            }))}
                            placeholder={minimumNextBid.toFixed(2)}
                            className="pl-10"
                          />
                        </div>
                        <Button
                          onClick={() => placeBid(auction.id)}
                          disabled={!bidAmounts[auction.id] || submitting === auction.id}
                        >
                          {submitting === auction.id ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Bidding...
                            </>
                          ) : (
                            'Place Bid'
                          )}
                        </Button>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground">
                      Your server will be promoted for 7 days if you win this auction
                    </p>
                  </div>
                ) : session ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Add a server to start bidding
                  </p>
                ) : (
                  <Link href="/auth/signin">
                    <Button className="w-full">Sign In to Bid</Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
