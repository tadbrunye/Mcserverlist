import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// Get all active auctions
export async function GET(request: NextRequest) {
  try {
    const now = new Date()

    const auctions = await prisma.auction.findMany({
      where: {
        status: 'ACTIVE',
        endDate: { gt: now },
      },
      include: {
        bids: {
          orderBy: { amount: 'desc' },
          take: 1,
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
        _count: {
          select: {
            bids: true,
          },
        },
      },
      orderBy: { position: 'asc' },
    })

    return NextResponse.json(auctions)
  } catch (error) {
    console.error('Error fetching auctions:', error)
    return NextResponse.json({ error: 'Failed to fetch auctions' }, { status: 500 })
  }
}

// Create new auction (admin only)
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { position, startDate, endDate, startingBid, reservePrice } = body

    const auction = await prisma.auction.create({
      data: {
        position,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        startingBid,
        reservePrice,
      },
    })

    return NextResponse.json(auction, { status: 201 })
  } catch (error) {
    console.error('Error creating auction:', error)
    return NextResponse.json({ error: 'Failed to create auction' }, { status: 500 })
  }
}
