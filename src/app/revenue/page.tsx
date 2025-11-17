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
                  <h3 className="font-semibold mb-2">Vote Share (30% Pool)</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Earn based on your percentage of total platform votes
                  </p>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground">Formula:</p>
                    <p className="font-semibold text-xs">
                      (Your Votes / Total Votes) × 30% of Ad Revenue
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
                <div className="p-6 rounded-lg border bg-gradient-to-br from-primary/10 to-primary/5">
                  <h4 className="font-semibold mb-3">Example Calculation</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Platform monthly ad revenue:</span>
                      <span className="font-semibold">$1,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Vote share pool (30%):</span>
                      <span className="font-semibold">$300</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Popularity bonus pool (20%):</span>
                      <span className="font-semibold">$200</span>
                    </div>
                    <div className="border-t pt-3 mt-3">
                      <p className="text-muted-foreground mb-2">If your server has 5,000 votes out of 100,000 total:</p>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Vote share (5%):</span>
                        <span className="font-semibold">$15.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Rank #5 bonus:</span>
                        <span className="font-semibold">+$18.00</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t mt-2">
                        <span className="font-bold">Total earned:</span>
                        <span className="font-bold text-green-600">$33.00</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <p className="text-sm font-semibold mb-2">💡 Key Points</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Revenue depends on platform's monthly ad earnings</li>
                    <li>• More votes = higher percentage of the pool</li>
                    <li>• Top 10 servers get significant popularity bonuses</li>
                    <li>• Servers with ads disabled receive 50% penalty</li>
                  </ul>
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
