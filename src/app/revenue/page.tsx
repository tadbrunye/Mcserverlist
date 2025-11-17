import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { DollarSign, TrendingUp, Award, Calculator } from 'lucide-react'
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
                  <h3 className="font-semibold mb-2">Vote Revenue</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Earn $0.001 per vote received on your server
                  </p>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground">Example:</p>
                    <p className="font-semibold">1,000 votes = $1.00</p>
                  </div>
                </div>

                <div className="p-6 rounded-lg border bg-card">
                  <Award className="h-10 w-10 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Popularity Bonus</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Top servers get additional revenue from our ad earnings
                  </p>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground">Based on:</p>
                    <p className="font-semibold">Monthly ranking</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-6 w-6 text-primary" />
                Revenue Calculator
              </CardTitle>
              <CardDescription>
                Estimate your potential monthly earnings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg border bg-muted/50">
                    <p className="text-sm text-muted-foreground mb-1">100 votes/month</p>
                    <p className="text-2xl font-bold text-green-600">~$0.10</p>
                  </div>
                  <div className="p-4 rounded-lg border bg-muted/50">
                    <p className="text-sm text-muted-foreground mb-1">1,000 votes/month</p>
                    <p className="text-2xl font-bold text-green-600">~$1.00</p>
                  </div>
                  <div className="p-4 rounded-lg border bg-muted/50">
                    <p className="text-sm text-muted-foreground mb-1">10,000 votes/month</p>
                    <p className="text-2xl font-bold text-green-600">~$10.00</p>
                  </div>
                </div>

                <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <p className="text-sm font-semibold mb-2">💡 Pro Tip</p>
                  <p className="text-sm text-muted-foreground">
                    Top 10 servers each month receive an additional popularity bonus ranging from $5-$50
                    depending on overall site revenue!
                  </p>
                </div>
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
                    1
                  </div>
                  <div>
                    <p className="font-semibold">Enable Ads (Default)</p>
                    <p className="text-sm text-muted-foreground">
                      Ads appear on your server page, and you earn from votes + ad impressions
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                    2
                  </div>
                  <div>
                    <p className="font-semibold">Disable Ads</p>
                    <p className="text-sm text-muted-foreground">
                      No ads on your server page, but you still earn from votes
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
