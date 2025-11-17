import { AuctionList } from '@/components/auctions/AuctionList'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/Card'
import { Trophy, Timer, DollarSign, TrendingUp } from 'lucide-react'

export default function AuctionsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
            Promoted Spot Auctions
          </h1>
          <p className="text-xl text-muted-foreground">
            Bid on top positions to promote your server and get massive visibility
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="pt-6">
              <Trophy className="h-10 w-10 text-yellow-500 mx-auto mb-3" />
              <h3 className="font-semibold text-center mb-2">Top Visibility</h3>
              <p className="text-sm text-muted-foreground text-center">
                Your server appears at the very top of the list
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <TrendingUp className="h-10 w-10 text-green-500 mx-auto mb-3" />
              <h3 className="font-semibold text-center mb-2">More Votes</h3>
              <p className="text-sm text-muted-foreground text-center">
                Get 10-50x more votes than regular listings
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <DollarSign className="h-10 w-10 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-center mb-2">Fair Pricing</h3>
              <p className="text-sm text-muted-foreground text-center">
                Auction system ensures market-driven pricing
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Timer className="h-5 w-5" />
              How Auctions Work
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg border bg-muted/50">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground mb-3 font-bold">
                  1
                </div>
                <h4 className="font-semibold mb-2">Choose Position</h4>
                <p className="text-sm text-muted-foreground">
                  Select which promoted spot you want (1-5)
                </p>
              </div>

              <div className="p-4 rounded-lg border bg-muted/50">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground mb-3 font-bold">
                  2
                </div>
                <h4 className="font-semibold mb-2">Place Your Bid</h4>
                <p className="text-sm text-muted-foreground">
                  Bid higher than current highest bid
                </p>
              </div>

              <div className="p-4 rounded-lg border bg-muted/50">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground mb-3 font-bold">
                  3
                </div>
                <h4 className="font-semibold mb-2">Win Auction</h4>
                <p className="text-sm text-muted-foreground">
                  Be the highest bidder when auction ends
                </p>
              </div>

              <div className="p-4 rounded-lg border bg-muted/50">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground mb-3 font-bold">
                  4
                </div>
                <h4 className="font-semibold mb-2">Get Featured</h4>
                <p className="text-sm text-muted-foreground">
                  Your server is promoted for 7 days
                </p>
              </div>
            </div>

            <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-sm font-semibold mb-2">💡 Bidding Tips</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Position #1 gets the most visibility and votes</li>
                <li>• Auctions typically last 24-48 hours</li>
                <li>• You can bid multiple times to stay on top</li>
                <li>• If outbid, you can place a higher bid</li>
                <li>• Payment is only charged to the winner</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <AuctionList />
      </div>
    </div>
  )
}
