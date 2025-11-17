import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendVotifierVote } from '@/lib/votifier'

async function verifyHCaptcha(token: string): Promise<boolean> {
  const response = await fetch('https://hcaptcha.com/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `response=${token}&secret=${process.env.HCAPTCHA_SECRET_KEY}`,
  })

  const data = await response.json()
  return data.success
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { username, hcaptchaToken } = body

    // Verify hCaptcha
    const isHuman = await verifyHCaptcha(hcaptchaToken)
    if (!isHuman) {
      return NextResponse.json({ error: 'Failed captcha verification' }, { status: 400 })
    }

    // Get IP address
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown'

    // Check if user has voted in the last 24 hours
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)
    const existingVote = await prisma.vote.findFirst({
      where: {
        serverId: params.id,
        ipAddress: ip,
        createdAt: { gte: yesterday },
      },
    })

    if (existingVote) {
      return NextResponse.json(
        { error: 'You can only vote once every 24 hours' },
        { status: 429 }
      )
    }

    // Get server details
    const server = await prisma.server.findUnique({
      where: { id: params.id },
    })

    if (!server) {
      return NextResponse.json({ error: 'Server not found' }, { status: 404 })
    }

    // Calculate vote reward
    const voteReward = 0.001 // $0.001 per vote for revenue sharing

    // Create vote
    const vote = await prisma.vote.create({
      data: {
        serverId: params.id,
        username,
        ipAddress: ip,
        reward: voteReward,
      },
    })

    // Update server vote counts
    await prisma.server.update({
      where: { id: params.id },
      data: {
        totalVotes: { increment: 1 },
        monthlyVotes: { increment: 1 },
        revenueEarned: { increment: voteReward },
      },
    })

    // Create revenue record
    await prisma.revenue.create({
      data: {
        amount: voteReward,
        type: 'VOTE_SHARE',
        source: params.id,
        description: `Vote reward for ${server.name}`,
      },
    })

    // Send votifier notification to server if configured
    if (server.votifierAddress && server.votifierPort && server.votifierToken) {
      await sendVotifierVote(
        server.votifierAddress,
        server.votifierPort,
        server.votifierToken,
        {
          serviceName: 'MCServerList',
          username,
          address: ip,
          timestamp: new Date().toISOString(),
        }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Vote recorded successfully!',
      reward: voteReward,
    })
  } catch (error) {
    console.error('Error processing vote:', error)
    return NextResponse.json({ error: 'Failed to process vote' }, { status: 500 })
  }
}
