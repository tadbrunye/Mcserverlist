import { status } from 'minecraft-server-util'

export interface ServerStatus {
  online: boolean
  playerCount: number
  maxPlayers: number
  version?: string
  motd?: string
}

export async function pingServer(
  address: string,
  port: number = 25565
): Promise<ServerStatus> {
  try {
    const response = await status(address, port, {
      timeout: 5000,
      enableSRV: true,
    })

    return {
      online: true,
      playerCount: response.players.online,
      maxPlayers: response.players.max,
      version: response.version.name,
      motd: response.motd.clean,
    }
  } catch (error) {
    return {
      online: false,
      playerCount: 0,
      maxPlayers: 0,
    }
  }
}

export function parseServerAddress(address: string): { host: string; port: number } {
  const parts = address.split(':')
  return {
    host: parts[0],
    port: parts[1] ? parseInt(parts[1]) : 25565,
  }
}
