'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import {
  Server,
  Users,
  DollarSign,
  ThumbsUp,
  Check,
  X,
} from 'lucide-react'
import { formatDate, formatNumber } from '@/lib/utils'

interface AdminDashboardProps {
  stats: {
    totalServers: number
    totalVotes: number
    totalPlayers: number
    totalRevenue: number
  } | null
  pendingServers: any[]
  recentRevenue: any[]
}

export function AdminDashboard({
  stats,
  pendingServers,
  recentRevenue,
}: AdminDashboardProps) {
  const approveServer = async (serverId: string) => {
    try {
      await fetch(`/api/admin/servers/${serverId}/approve`, {
        method: 'POST',
      })
      window.location.reload()
    } catch (error) {
      console.error('Error approving server:', error)
    }
  }

  const rejectServer = async (serverId: string) => {
    try {
      await fetch(`/api/admin/servers/${serverId}`, {
        method: 'DELETE',
      })
      window.location.reload()
    } catch (error) {
      console.error('Error rejecting server:', error)
    }
  }

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Servers</p>
                <p className="text-3xl font-bold">
                  {formatNumber(stats?.totalServers || 0)}
                </p>
              </div>
              <Server className="h-10 w-10 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Votes</p>
                <p className="text-3xl font-bold">
                  {formatNumber(stats?.totalVotes || 0)}
                </p>
              </div>
              <ThumbsUp className="h-10 w-10 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Players</p>
                <p className="text-3xl font-bold">
                  {formatNumber(stats?.totalPlayers || 0)}
                </p>
              </div>
              <Users className="h-10 w-10 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-3xl font-bold">
                  ${(stats?.totalRevenue || 0).toFixed(2)}
                </p>
              </div>
              <DollarSign className="h-10 w-10 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Servers */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Server Approvals ({pendingServers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {pendingServers.length === 0 ? (
            <p className="text-muted-foreground">No pending servers</p>
          ) : (
            <div className="space-y-4">
              {pendingServers.map((server) => (
                <div
                  key={server.id}
                  className="flex items-start justify-between p-4 rounded-lg border"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{server.name}</h3>
                      <Badge>{server.gameMode}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {server.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{server.address}:{server.port}</span>
                      <span>•</span>
                      <span>By {server.owner.name || server.owner.email}</span>
                      <span>•</span>
                      <span>{formatDate(server.createdAt)}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      size="sm"
                      onClick={() => approveServer(server.id)}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => rejectServer(server.id)}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Revenue */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {recentRevenue.map((revenue) => (
              <div
                key={revenue.id}
                className="flex items-center justify-between p-3 rounded-lg border"
              >
                <div className="flex-1">
                  <p className="font-medium">{revenue.description}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="secondary">{revenue.type}</Badge>
                    <span>{formatDate(revenue.createdAt)}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">
                    +${revenue.amount.toFixed(4)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {revenue.distributed ? 'Distributed' : 'Pending'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
