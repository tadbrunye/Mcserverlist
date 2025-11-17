import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { DollarSign, TrendingUp, Award } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function RevenuePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Revenue Sharing Program
          </h1>
          <p className="text-xl text-muted-foreground">
            Earn money from your server's votes and popularity
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-6 w-6 text-primary" />
                How Revenue Sharing Works
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We believe servers providing great experiences should be rewarded. That's why we share our ad revenue
                with server owners based on their votes and popularity.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="p-6 rounded-lg border bg-card">
                  <TrendingUp className="h-10 w-10 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Fixed Revenue Per Vote</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Each vote earns the same amount from the 30% revenue pool
                  </p>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground">Formula:</p>
                    <p className="font-semibold text-xs">
                      Your Votes × (Pool / Total Votes)
                    </p>
                  </div>
                </div>

                <div className="p-6 rounded-lg border bg-card">
                  <Award className="h-10 w-10 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Popularity Bonus (20% Pool)</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Top 10 servers get additional revenue share
                  </p>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground">Distribution:</p>
                    <p className="font-semibold text-xs">
                      Rank #1 gets 25%, #2 gets 18%, etc.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                <p className="text-sm font-semibold mb-2 text-destructive">⚠️ Important: Ads Required</p>
                <p className="text-sm text-muted-foreground">
                  <strong>Servers with ads disabled receive $0.00</strong> - no revenue sharing.
                  You must enable ads on your server page to participate in revenue sharing.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ad Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Ads are <strong>optional</strong> for your server page. You can choose to:
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                    ✓
                  </div>
                  <div>
                    <p className="font-semibold text-green-600">Enable Ads (Recommended)</p>
                    <p className="text-sm text-muted-foreground">
                      Ads appear on your server page, and you earn revenue from every vote
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center text-destructive font-bold text-sm">
                    ✗
                  </div>
                  <div>
                    <p className="font-semibold text-destructive">Disable Ads</p>
                    <p className="text-sm text-muted-foreground">
                      No ads on your server page, <strong>but you earn $0.00 from revenue sharing</strong>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold mb-1">Payment Schedule</h4>
                  <p className="text-sm text-muted-foreground">
                    Payments are processed monthly on the 15th of each month for the previous month's earnings.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-1">Minimum Payout</h4>
                  <p className="text-sm text-muted-foreground">
                    $5.00 minimum balance required for payout. Earnings below this threshold carry over to the next month.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-1">Payment Methods</h4>
                  <p className="text-sm text-muted-foreground">
                    PayPal, Stripe, or cryptocurrency (BTC, ETH)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center p-8 rounded-lg border bg-gradient-to-br from-primary/10 to-primary/5">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Earning?</h3>
            <p className="text-muted-foreground mb-6">
              Add your server today and start earning revenue from votes!
            </p>
            <Link href="/servers/add">
              <Button size="lg" className="rounded-full">
                Add Your Server
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
