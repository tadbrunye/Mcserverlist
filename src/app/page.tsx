import { ServerList } from '@/components/servers/ServerList'
import { ServerFilters } from '@/components/servers/ServerFilters'
import { PromotedServers } from '@/components/servers/PromotedServers'
import { AdBanner } from '@/components/ads/AdBanner'
import { Trophy, TrendingUp, DollarSign } from 'lucide-react'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          Find Your Perfect Minecraft Server
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Vote for servers, earn rewards, and help servers grow with revenue sharing
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          <div className="p-6 rounded-lg border bg-card">
            <Trophy className="h-10 w-10 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Vote & Earn</h3>
            <p className="text-sm text-muted-foreground">
              Vote for your favorite servers and earn rewards
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <DollarSign className="h-10 w-10 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Revenue Sharing</h3>
            <p className="text-sm text-muted-foreground">
              Servers earn money from votes and ads
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <TrendingUp className="h-10 w-10 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Real-time Stats</h3>
            <p className="text-sm text-muted-foreground">
              Live player counts and server status
            </p>
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <AdBanner slot="top-banner" />

      {/* Promoted Servers */}
      <PromotedServers />

      {/* Filters and Server List */}
      <div className="mt-12">
        <ServerFilters />
        <ServerList />
      </div>
    </div>
  )
}
