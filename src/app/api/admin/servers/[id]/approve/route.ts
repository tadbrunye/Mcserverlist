import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const server = await prisma.server.update({
      where: { id: params.id },
      data: { approved: true },
    })

    return NextResponse.json(server)
  } catch (error) {
    console.error('Error approving server:', error)
    return NextResponse.json({ error: 'Failed to approve server' }, { status: 500 })
  }
}
