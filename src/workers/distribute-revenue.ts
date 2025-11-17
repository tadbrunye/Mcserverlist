/**
 * Revenue Distribution Worker
 *
 * Distributes ad revenue to servers based on their votes and popularity.
 * Run this monthly after calculating total ad revenue.
 *
 * Usage: npx tsx src/workers/distribute-revenue.ts <monthly_ad_revenue>
 * Example: npx tsx src/workers/distribute-revenue.ts 1000
 */

import { PrismaClient } from '@prisma/client'
import { calculateRevenueShare, calculatePopularityBonus } from '../lib/utils'

const prisma = new PrismaClient()

async function distributeRevenue(monthlyAdRevenue: number) {
  console.log(`\n💰 Starting revenue distribution for $${monthlyAdRevenue.toFixed(2)}`)

  try {
    // Get all servers with votes this month
    const servers = await prisma.server.findMany({
      where: {
        monthlyVotes: { gt: 0 },
        approved: true,
      },
      orderBy: {
        monthlyVotes: 'desc',
      },
      select: {
        id: true,
        name: true,
        monthlyVotes: true,
        adsEnabled: true,
      },
    })

    if (servers.length === 0) {
      console.log('No servers with votes this month.')
      return
    }

    // Calculate total votes from servers WITH ads enabled
    const totalVotes = servers.reduce((sum, s) => sum + s.monthlyVotes, 0)
    const votesWithAds = servers
      .filter(s => s.adsEnabled)
      .reduce((sum, s) => sum + s.monthlyVotes, 0)

    console.log(`\n📊 Stats:`)
    console.log(`  Total servers: ${servers.length}`)
    console.log(`  Total votes (all): ${totalVotes}`)
    console.log(`  Total votes (ads enabled): ${votesWithAds}`)

    const poolPercent = parseInt(process.env.AD_REVENUE_POOL_PERCENT || '30')
    const bonusPercent = parseInt(process.env.POPULARITY_BONUS_PERCENT || '20')
    const votePool = monthlyAdRevenue * (poolPercent / 100)
    const bonusPool = monthlyAdRevenue * (bonusPercent / 100)

    // Calculate value per vote (only for servers with ads enabled)
    const valuePerVote = votesWithAds > 0 ? votePool / votesWithAds : 0

    console.log(`\n💵 Revenue Pools:`)
    console.log(`  Vote share pool (${poolPercent}%): $${votePool.toFixed(2)}`)
    console.log(`  Popularity bonus pool (${bonusPercent}%): $${bonusPool.toFixed(2)}`)
    console.log(`  Value per vote: $${valuePerVote.toFixed(6)}`)

    let totalDistributed = 0

    // Distribute revenue to each server
    console.log(`\n📤 Distributing to servers:\n`)

    for (let i = 0; i < servers.length; i++) {
      const server = servers[i]
      let serverRevenue = 0

      // Servers with ads disabled get NOTHING
      if (!server.adsEnabled) {
        console.log(`  ⚠️  ${server.name.padEnd(30)} ${server.monthlyVotes.toString().padStart(5)} votes → $0.00 (ads disabled)`)
        continue
      }

      // Calculate vote revenue (fixed amount per vote)
      const voteRevenue = server.monthlyVotes * valuePerVote
      serverRevenue += voteRevenue

      // Add popularity bonus for top 10
      let bonus = 0
      if (i < 10) {
        bonus = calculatePopularityBonus(i + 1, monthlyAdRevenue)
        serverRevenue += bonus
      }

      // Update server revenue
      await prisma.server.update({
        where: { id: server.id },
        data: {
          revenueEarned: { increment: serverRevenue },
        },
      })

      // Create revenue record
      await prisma.revenue.create({
        data: {
          amount: serverRevenue,
          type: 'VOTE_SHARE',
          source: server.id,
          description: `Monthly distribution for ${server.name} (${server.monthlyVotes} votes @ $${valuePerVote.toFixed(6)}/vote)`,
          distributed: true,
        },
      })

      totalDistributed += serverRevenue

      const bonusText = bonus > 0 ? ` + $${bonus.toFixed(2)} bonus` : ''
      const rank = i < 10 ? `#${i + 1}` : ''
      console.log(
        `  ${rank.padEnd(4)} ${server.name.padEnd(30)} ${server.monthlyVotes.toString().padStart(5)} votes → $${serverRevenue.toFixed(4)}${bonusText}`
      )
    }

    console.log(`\n✅ Distribution complete!`)
    console.log(`   Total distributed: $${totalDistributed.toFixed(2)}`)
    console.log(`   Platform keeps: $${(monthlyAdRevenue - totalDistributed).toFixed(2)}`)

    // Update global stats
    await prisma.globalStats.upsert({
      where: { id: 'global' },
      create: {
        id: 'global',
        totalRevenue: totalDistributed,
        totalServers: servers.length,
        totalVotes: totalVotes,
      },
      update: {
        totalRevenue: { increment: totalDistributed },
      },
    })

  } catch (error) {
    console.error('Error distributing revenue:', error)
    throw error
  }
}

async function main() {
  const adRevenue = parseFloat(process.argv[2] || '0')

  if (adRevenue <= 0) {
    console.error('❌ Error: Please provide monthly ad revenue as argument')
    console.error('Usage: npx tsx src/workers/distribute-revenue.ts <amount>')
    console.error('Example: npx tsx src/workers/distribute-revenue.ts 1000')
    process.exit(1)
  }

  try {
    await distributeRevenue(adRevenue)
  } catch (error) {
    console.error('Fatal error:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
