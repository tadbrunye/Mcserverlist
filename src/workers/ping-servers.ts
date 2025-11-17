/**
 * Server Ping Worker
 *
 * This script pings all servers to check their status and update player counts.
 * Run this as a cron job every 5 minutes.
 *
 * Usage: npx tsx src/workers/ping-servers.ts
 */

import { PrismaClient } from '@prisma/client'
import { pingServer } from '../lib/minecraft'

const prisma = new PrismaClient()

async function pingAllServers() {
  console.log('Starting server ping worker...')

  const servers = await prisma.server.findMany({
    where: {
      approved: true,
    },
  })

  console.log(`Found ${servers.length} servers to ping`)

  let successCount = 0
  let failCount = 0

  for (const server of servers) {
    try {
      console.log(`Pinging ${server.name} (${server.address}:${server.port})...`)

      const status = await pingServer(server.address, server.port)

      // Update server status
      await prisma.server.update({
        where: { id: server.id },
        data: {
          online: status.online,
          playerCount: status.playerCount,
          maxPlayers: status.maxPlayers,
          version: status.version || server.version,
          lastPing: new Date(),
        },
      })

      // Record stats
      await prisma.serverStats.create({
        data: {
          serverId: server.id,
          online: status.online,
          playerCount: status.playerCount,
          maxPlayers: status.maxPlayers,
        },
      })

      if (status.online) {
        successCount++
        console.log(`  ✓ Online - ${status.playerCount}/${status.maxPlayers} players`)
      } else {
        failCount++
        console.log(`  ✗ Offline`)
      }
    } catch (error) {
      failCount++
      console.error(`  ✗ Error pinging ${server.name}:`, error)

      // Mark as offline on error
      await prisma.server.update({
        where: { id: server.id },
        data: {
          online: false,
          lastPing: new Date(),
        },
      })
    }

    // Small delay to avoid overwhelming the network
    await new Promise(resolve => setTimeout(resolve, 100))
  }

  console.log(`\nPing complete: ${successCount} online, ${failCount} offline/failed`)
}

async function resetMonthlyVotes() {
  // Reset monthly votes on the 1st of each month
  const now = new Date()
  if (now.getDate() === 1 && now.getHours() === 0) {
    console.log('Resetting monthly votes...')
    await prisma.server.updateMany({
      data: {
        monthlyVotes: 0,
      },
    })
    console.log('Monthly votes reset complete')
  }
}

async function main() {
  try {
    await pingAllServers()
    await resetMonthlyVotes()
  } catch (error) {
    console.error('Fatal error:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
