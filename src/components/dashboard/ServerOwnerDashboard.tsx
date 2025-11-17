'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import {
  Server,
  TrendingUp,
  DollarSign,
  ThumbsUp,
  Users,
  Plus,
  Eye,
  Settings,
  BarChart3,
} from 'lucide-react'
import { formatNumber } from '@/lib/utils'

interface ServerData {
  id: string
  name: string
  address: string
  online: boolean
  playerCount: number
  monthlyVotes: number
  totalVotes: number
  revenueEarned: number
  averageRating: number
  approved: boolean
  adsEnabled: boolean
  _count: {
    votes: number
    reviews: number
  }
}

export function ServerOwnerDashboard() {
  const [servers, setServers] = useState<ServerData[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedServer, setSelectedServer] = useState<string | null>(null)
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    fetchServers()
  }, [])

  useEffect(() => {
    if (selectedServer) {
      fetchServerStats(selectedServer)
    }
  }, [selectedServer])

  const fetchServers = async () => {
    try {
      const response = await fetch('/api/my-servers')
      const data = await response.json()
      setServers(data)
      if (data.length > 0 && !selectedServer) {
        setSelectedServer(data[0].id)
      }
    } catch (error) {
      console.error('Error fetching servers:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchServerStats = async (serverId: string) => {
    try {
      const response = await fetch(`/api/my-servers/${serverId}/stats`)
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Error fetching server stats:', error)
    }
  }

  const totalRevenue = servers.reduce((sum, s) => sum + s.revenueEarned, 0)
  const totalMonthlyVotes = servers.reduce((sum, s) => sum + s.monthlyVotes, 0)
  const totalAllTimeVotes = servers.reduce((sum, s) => sum + s.totalVotes, 0)

  if (loading) {
    return <div>Loading...</div>
  }

  if (servers.length === 0) {
    return (
      <div className="text-center py-12">
        <Server className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">No Servers Yet</h3>
        <p className="text-muted-foreground mb-6">
          Add your first server to start tracking stats and earning revenue!
        </p>
        <Link href="/servers/add">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Server
          </Button>
        </Link>
      </div>
    )
  }

  const currentServer = servers.find(s => s.id === selectedServer)

  return (
    <div className="space-y-8">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Servers</p>
                <p className="text-3xl font-bold">{servers.length}</p>
              </div>
              <Server className="h-10 w-10 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-3xl font-bold">${totalRevenue.toFixed(2)}</p>
              </div>
              <DollarSign className="h-10 w-10 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Votes</p>
                <p className="text-3xl font-bold">{formatNumber(totalMonthlyVotes)}</p>
              </div>
              <ThumbsUp className="h-10 w-10 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">All-Time Votes</p>
                <p className="text-3xl font-bold">{formatNumber(totalAllTimeVotes)}</p>
              </div>
              <TrendingUp className="h-10 w-10 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Server List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Your Servers</CardTitle>
            <Link href="/servers/add">
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Server
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {servers.map((server) => (
              <div
                key={server.id}
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  selectedServer === server.id
                    ? 'border-primary bg-primary/5'
                    : 'hover:border-primary/50'
                }`}
                onClick={() => setSelectedServer(server.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{server.name}</h3>
                      <div className={server.online ? 'online-indicator' : 'offline-indicator'} />
                      {!server.approved && (
                        <Badge variant="secondary">Pending Approval</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{server.address}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {server.playerCount} online
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="h-3 w-3" />
                        {server.monthlyVotes} monthly votes
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">
                      ${server.revenueEarned.toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground">earned</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <Link href={`/servers/${server.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </Link>
                  <Link href={`/servers/${server.id}/edit`}>
                    <Button variant="outline" size="sm">
                      <Settings className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Stats for Selected Server */}
      {stats && currentServer && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Statistics for {currentServer.name}
            </CardTitle>
            <CardDescription>Detailed analytics and performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="p-4 rounded-lg border bg-card">
                <p className="text-sm text-muted-foreground mb-1">Last 24 Hours</p>
                <p className="text-2xl font-bold">{stats.last24HoursVotes}</p>
                <p className="text-xs text-muted-foreground">votes</p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <p className="text-sm text-muted-foreground mb-1">Last 7 Days</p>
                <p className="text-2xl font-bold">{stats.last7DaysVotes}</p>
                <p className="text-xs text-muted-foreground">votes</p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <p className="text-sm text-muted-foreground mb-1">Last 30 Days</p>
                <p className="text-2xl font-bold">{stats.last30DaysVotes}</p>
                <p className="text-xs text-muted-foreground">votes</p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <p className="text-sm text-muted-foreground mb-1">Avg. Daily</p>
                <p className="text-2xl font-bold">{stats.avgDailyVotes}</p>
                <p className="text-xs text-muted-foreground">votes/day</p>
              </div>
            </div>

            <div className="p-6 rounded-lg border bg-gradient-to-br from-primary/10 to-primary/5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-semibold mb-1">Total Revenue Earned</h4>
                  <p className="text-sm text-muted-foreground">
                    From vote-based revenue sharing
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-green-600">
                    ${stats.totalRevenue.toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {stats.server.adsEnabled ? 'Ads enabled' : 'Ads disabled (50% penalty)'}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">This Month's Votes:</span>
                  <span className="font-semibold">{stats.server.monthlyVotes}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Revenue Share:</span>
                  <span className="font-semibold">
                    Based on % of total platform votes
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold mb-3">Recent Player Activity</h4>
              <div className="h-48 flex items-end justify-between gap-1">
                {stats.playerHistory.slice(-20).map((stat: any, i: number) => {
                  const maxPlayers = Math.max(
                    ...stats.playerHistory.map((s: any) => s.playerCount)
                  )
                  const height = maxPlayers > 0 ? (stat.playerCount / maxPlayers) * 100 : 0

                  return (
                    <div
                      key={i}
                      className="flex-1 bg-primary/20 rounded-t hover:bg-primary/40 transition-colors relative group"
                      style={{ height: `${height}%`, minHeight: '4px' }}
                    >
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {stat.playerCount} players
                        <br />
                        {new Date(stat.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  )
                })}
              </div>
              <p className="text-xs text-muted-foreground text-center mt-2">
                Last 7 days player count history
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Revenue Info */}
      <Card>
        <CardHeader>
          <CardTitle>How Revenue Sharing Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2">💰 Percentage-Based Distribution</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Revenue is distributed monthly based on your percentage of total platform votes:
            </p>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4">
              <li>• Platform collects ad revenue each month</li>
              <li>• 30% of ad revenue goes into vote share pool</li>
              <li>• Your server gets: (Your Votes / Total Votes) × Pool Amount</li>
              <li>• Top 10 servers get additional 20% popularity bonus</li>
              <li>• Servers with ads disabled receive 50% penalty</li>
            </ul>
          </div>

          <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
            <h4 className="font-semibold mb-2">📈 Example Calculation</h4>
            <p className="text-sm text-muted-foreground">
              If platform earns $1,000 in ads, and your server has 5,000 votes out of 100,000 total:
            </p>
            <div className="mt-2 space-y-1 text-sm">
              <p>• Vote pool: $1,000 × 30% = <strong>$300</strong></p>
              <p>• Your share: 5,000/100,000 = <strong>5%</strong></p>
              <p>• Your revenue: $300 × 5% = <strong>$15.00</strong></p>
            </div>
          </div>

          <div className="text-center">
            <Link href="/revenue">
              <Button variant="outline">
                Learn More About Revenue Sharing
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
