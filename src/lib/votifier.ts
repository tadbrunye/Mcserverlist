import { createSocket } from 'dgram'
import crypto from 'crypto'

export interface VoteData {
  serviceName: string
  username: string
  address: string
  timestamp: string
}

export async function sendVotifierVote(
  host: string,
  port: number,
  token: string,
  voteData: VoteData
): Promise<boolean> {
  return new Promise((resolve) => {
    try {
      const client = createSocket('udp4')

      const payload = {
        serviceName: voteData.serviceName,
        username: voteData.username,
        address: voteData.address,
        timestamp: voteData.timestamp,
        challenge: token,
      }

      const message = JSON.stringify(payload)
      const buffer = Buffer.from(message)

      client.send(buffer, port, host, (err) => {
        client.close()
        if (err) {
          console.error('Votifier send error:', err)
          resolve(false)
        } else {
          resolve(true)
        }
      })

      // Timeout after 5 seconds
      setTimeout(() => {
        client.close()
        resolve(false)
      }, 5000)
    } catch (error) {
      console.error('Votifier error:', error)
      resolve(false)
    }
  })
}
