import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const now = new Date()

    const promotedListings = await prisma.promotedListing.findMany({
      where: {
        active: true,
        startDate: { lte: now },
        endDate: { gte: now },
        paid: true,
      },
      orderBy: {
        position: 'asc',
      },
      include: {
        server: {
          include: {
            owner: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    })

    const servers = promotedListings.map(listing => listing.server)

    return NextResponse.json(servers)
  } catch (error) {
    console.error('Error fetching promoted servers:', error)
    return NextResponse.json({ error: 'Failed to fetch promoted servers' }, { status: 500 })
  }
}
