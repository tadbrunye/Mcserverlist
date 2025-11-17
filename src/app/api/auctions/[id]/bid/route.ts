import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { serverId, amount } = body

    // Verify user owns the server
    const server = await prisma.server.findFirst({
      where: {
        id: serverId,
        ownerId: session.user.id,
      },
    })

    if (!server) {
      return NextResponse.json({ error: 'Server not found or unauthorized' }, { status: 404 })
    }

    // Get auction
    const auction = await prisma.auction.findUnique({
      where: { id: params.id },
      include: {
        bids: {
          orderBy: { amount: 'desc' },
          take: 1,
        },
      },
    })

    if (!auction) {
      return NextResponse.json({ error: 'Auction not found' }, { status: 404 })
    }

    // Check if auction is active
    const now = new Date()
    if (auction.status !== 'ACTIVE' || auction.endDate < now) {
      return NextResponse.json({ error: 'Auction is not active' }, { status: 400 })
    }

    // Check if bid is higher than current highest bid
    const currentHighestBid = auction.bids[0]?.amount || auction.startingBid
    if (amount <= currentHighestBid) {
      return NextResponse.json(
        { error: `Bid must be higher than current bid of $${currentHighestBid.toFixed(2)}` },
        { status: 400 }
      )
    }

    // Mark previous bids from this user as OUTBID
    await prisma.bid.updateMany({
      where: {
        auctionId: params.id,
        userId: session.user.id,
        status: 'ACTIVE',
      },
      data: {
        status: 'OUTBID',
      },
    })

    // Mark other users' ACTIVE bids as OUTBID
    await prisma.bid.updateMany({
      where: {
        auctionId: params.id,
        userId: { not: session.user.id },
        status: 'ACTIVE',
      },
      data: {
        status: 'OUTBID',
      },
    })

    // Create new bid
    const bid = await prisma.bid.create({
      data: {
        auctionId: params.id,
        serverId,
        userId: session.user.id,
        amount,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    })

    return NextResponse.json(bid, { status: 201 })
  } catch (error) {
    console.error('Error placing bid:', error)
    return NextResponse.json({ error: 'Failed to place bid' }, { status: 500 })
  }
}
