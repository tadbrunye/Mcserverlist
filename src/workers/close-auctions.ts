/**
 * Auction Closer Worker
 *
 * Closes ended auctions and creates promoted listings for winners.
 * Run this as a cron job every hour.
 *
 * Usage: npx tsx src/workers/close-auctions.ts
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function closeAuctions() {
  console.log('\n🔨 Starting auction closer worker...')

  const now = new Date()

  try {
    // Find all active auctions that have ended
    const endedAuctions = await prisma.auction.findMany({
      where: {
        status: 'ACTIVE',
        endDate: { lte: now },
      },
      include: {
        bids: {
          orderBy: { amount: 'desc' },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    })

    console.log(`Found ${endedAuctions.length} auctions to close\n`)

    for (const auction of endedAuctions) {
      console.log(`Processing auction #${auction.id} for position ${auction.position}...`)

      // Get highest bid
      const winningBid = auction.bids[0]

      if (!winningBid) {
        console.log(`  ✗ No bids placed, marking as ended`)
        await prisma.auction.update({
          where: { id: auction.id },
          data: { status: 'ENDED' },
        })
        continue
      }

      // Check reserve price
      if (auction.reservePrice && winningBid.amount < auction.reservePrice) {
        console.log(`  ✗ Reserve price not met ($${winningBid.amount} < $${auction.reservePrice})`)
        await prisma.auction.update({
          where: { id: auction.id },
          data: { status: 'ENDED' },
        })
        // Mark bid as refunded
        await prisma.bid.update({
          where: { id: winningBid.id },
          data: { status: 'REFUNDED' },
        })
        continue
      }

      console.log(`  ✓ Winner: ${winningBid.user.name || winningBid.user.email} with bid of $${winningBid.amount}`)

      // Mark winning bid
      await prisma.bid.update({
        where: { id: winningBid.id },
        data: { status: 'WON' },
      })

      // Mark other bids as refunded
      await prisma.bid.updateMany({
        where: {
          auctionId: auction.id,
          id: { not: winningBid.id },
        },
        data: { status: 'REFUNDED' },
      })

      // Create promoted listing for 7 days
      const listingStart = new Date()
      const listingEnd = new Date(listingStart.getTime() + 7 * 24 * 60 * 60 * 1000)

      const listing = await prisma.promotedListing.create({
        data: {
          position: auction.position,
          startDate: listingStart,
          endDate: listingEnd,
          price: winningBid.amount,
          paid: true, // Assume payment processed separately
          active: true,
          auctionId: auction.id,
          serverId: winningBid.serverId,
        },
      })

      console.log(`  ✓ Created promoted listing for 7 days`)

      // Create revenue record
      await prisma.revenue.create({
        data: {
          amount: winningBid.amount,
          type: 'PROMOTED_LISTING',
          source: auction.id,
          description: `Auction win for position ${auction.position} by ${winningBid.user.name || winningBid.user.email}`,
          distributed: true,
        },
      })

      console.log(`  ✓ Recorded revenue of $${winningBid.amount}`)

      // Update auction status
      await prisma.auction.update({
        where: { id: auction.id },
        data: {
          status: 'ENDED',
          winnerId: winningBid.id,
        },
      })

      console.log(`  ✓ Auction closed successfully\n`)
    }

    // Deactivate expired promoted listings
    const expiredListings = await prisma.promotedListing.updateMany({
      where: {
        active: true,
        endDate: { lte: now },
      },
      data: {
        active: false,
      },
    })

    if (expiredListings.count > 0) {
      console.log(`Deactivated ${expiredListings.count} expired promoted listings`)
    }

    console.log('\n✅ Auction closer complete!')
  } catch (error) {
    console.error('Error closing auctions:', error)
    throw error
  }
}

async function main() {
  try {
    await closeAuctions()
  } catch (error) {
    console.error('Fatal error:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
