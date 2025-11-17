import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { GameMode } from '@prisma/client'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const gameMode = searchParams.get('gameMode') as GameMode | null
  const search = searchParams.get('search')
  const sort = searchParams.get('sort') || 'votes'
  const page = parseInt(searchParams.get('page') || '1')
  const limit = 20

  try {
    const where: any = {
      approved: true,
    }

    if (gameMode) {
      where.gameMode = gameMode
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { address: { contains: search, mode: 'insensitive' } },
      ]
    }

    let orderBy: any = {}
    switch (sort) {
      case 'votes':
        orderBy = { monthlyVotes: 'desc' }
        break
      case 'players':
        orderBy = { playerCount: 'desc' }
        break
      case 'rating':
        orderBy = { averageRating: 'desc' }
        break
      case 'newest':
        orderBy = { createdAt: 'desc' }
        break
      default:
        orderBy = { monthlyVotes: 'desc' }
    }

    const [servers, total] = await Promise.all([
      prisma.server.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          owner: {
            select: {
              id: true,
              name: true,
            },
          },
          _count: {
            select: {
              votes: true,
              reviews: true,
            },
          },
        },
      }),
      prisma.server.count({ where }),
    ])

    return NextResponse.json({
      servers,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
    })
  } catch (error) {
    console.error('Error fetching servers:', error)
    return NextResponse.json({ error: 'Failed to fetch servers' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const {
      name,
      description,
      address,
      port,
      gameMode,
      website,
      discordLink,
      storeLink,
      votifierAddress,
      votifierPort,
      votifierToken,
      banner,
    } = body

    const server = await prisma.server.create({
      data: {
        name,
        description,
        address,
        port: port || 25565,
        gameMode,
        website,
        discordLink,
        storeLink,
        votifierAddress,
        votifierPort,
        votifierToken,
        banner,
        ownerId: session.user.id,
      },
    })

    return NextResponse.json(server, { status: 201 })
  } catch (error) {
    console.error('Error creating server:', error)
    return NextResponse.json({ error: 'Failed to create server' }, { status: 500 })
  }
}
