import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Verify server ownership
    const server = await prisma.server.findUnique({
      where: { id: params.id },
    })

    if (!server || server.ownerId !== session.user.id) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 })
    }

    // Get vote statistics
    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000)

    const [
      totalVotes,
      last30DaysVotes,
      last7DaysVotes,
      last24HoursVotes,
      recentVotes,
      playerHistory,
      totalRevenue,
    ] = await Promise.all([
      // Total votes count
      prisma.vote.count({
        where: { serverId: params.id },
      }),
      // Last 30 days votes
      prisma.vote.count({
        where: {
          serverId: params.id,
          createdAt: { gte: thirtyDaysAgo },
        },
      }),
      // Last 7 days votes
      prisma.vote.count({
        where: {
          serverId: params.id,
          createdAt: { gte: sevenDaysAgo },
        },
      }),
      // Last 24 hours votes
      prisma.vote.count({
        where: {
          serverId: params.id,
          createdAt: { gte: yesterday },
        },
      }),
      // Recent votes for chart
      prisma.vote.groupBy({
        by: ['createdAt'],
        where: {
          serverId: params.id,
          createdAt: { gte: thirtyDaysAgo },
        },
        _count: true,
      }),
      // Player count history
      prisma.serverStats.findMany({
        where: {
          serverId: params.id,
          createdAt: { gte: sevenDaysAgo },
        },
        orderBy: { createdAt: 'asc' },
        select: {
          playerCount: true,
          createdAt: true,
          online: true,
        },
      }),
      // Total revenue earned
      prisma.revenue.aggregate({
        where: {
          source: params.id,
          distributed: true,
        },
        _sum: {
          amount: true,
        },
      }),
    ])

    // Get daily vote breakdown
    const votesByDay = recentVotes.reduce((acc, vote) => {
      const date = new Date(vote.createdAt).toISOString().split('T')[0]
      acc[date] = (acc[date] || 0) + vote._count
      return acc
    }, {} as Record<string, number>)

    // Calculate average daily votes
    const avgDailyVotes = last30DaysVotes / 30

    return NextResponse.json({
      totalVotes,
      last30DaysVotes,
      last7DaysVotes,
      last24HoursVotes,
      avgDailyVotes: Math.round(avgDailyVotes * 10) / 10,
      votesByDay,
      playerHistory,
      totalRevenue: totalRevenue._sum.amount || 0,
      server: {
        id: server.id,
        name: server.name,
        monthlyVotes: server.monthlyVotes,
        revenueEarned: server.revenueEarned,
        adsEnabled: server.adsEnabled,
        approved: server.approved,
      },
    })
  } catch (error) {
    console.error('Error fetching server stats:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
