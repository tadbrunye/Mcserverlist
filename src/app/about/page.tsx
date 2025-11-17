import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Trophy, DollarSign, TrendingUp, Shield, Zap, Heart } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            About MCServerList
          </h1>
          <p className="text-xl text-muted-foreground">
            The modern Minecraft server list that rewards both players and servers
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>What Makes Us Different?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <DollarSign className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Revenue Sharing</h3>
                    <p className="text-sm text-muted-foreground">
                      Unlike other server lists, we share ad revenue with servers based on their votes and popularity. Your server earns money while growing!
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Zap className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Real-time Stats</h3>
                    <p className="text-sm text-muted-foreground">
                      We automatically ping servers every 5 minutes to provide accurate, up-to-date player counts and status information.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Anti-Bot Protection</h3>
                    <p className="text-sm text-muted-foreground">
                      hCaptcha integration ensures all votes are from real players, preventing bot abuse and maintaining fair rankings.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Trophy className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Votifier Compatible</h3>
                    <p className="text-sm text-muted-foreground">
                      Full Votifier support means players get their in-game rewards instantly when they vote for your server.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">For Server Owners</h3>
                  <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li>Create an account and add your server</li>
                    <li>Configure Votifier (optional) for in-game rewards</li>
                    <li>Share your server page with players</li>
                    <li>Earn revenue from votes and popularity</li>
                    <li>Optionally purchase promoted spots for more visibility</li>
                  </ol>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">For Players</h3>
                  <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li>Browse servers using filters and search</li>
                    <li>Read reviews and check real-time player counts</li>
                    <li>Vote for your favorite servers daily</li>
                    <li>Write reviews to help other players</li>
                    <li>Discover new servers to play on</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our mission is to create a fair, transparent, and rewarding ecosystem for the Minecraft server community.
                We believe that servers providing great experiences for players should be rewarded financially, not just with visibility.
                By sharing our revenue with server owners, we're helping to sustain and grow the Minecraft multiplayer community.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Have questions, suggestions, or need support? We'd love to hear from you!
              </p>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Email:</strong>{' '}
                  <a href="mailto:support@mcserverlist.com" className="text-primary hover:underline">
                    support@mcserverlist.com
                  </a>
                </p>
                <p>
                  <strong>Discord:</strong>{' '}
                  <a href="https://discord.gg/mcserverlist" className="text-primary hover:underline">
                    Join our Discord
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
