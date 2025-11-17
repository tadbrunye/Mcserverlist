import Link from 'next/link'
import { Gamepad2 } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t bg-muted/50 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Gamepad2 className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">MCServerList</span>
            </div>
            <p className="text-sm text-muted-foreground">
              The best Minecraft server list with voting rewards and revenue sharing.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Servers</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Browse Servers
                </Link>
              </li>
              <li>
                <Link href="/auctions" className="text-muted-foreground hover:text-primary transition-colors">
                  Promoted Auctions
                </Link>
              </li>
              <li>
                <Link href="/servers/add" className="text-muted-foreground hover:text-primary transition-colors">
                  Add Your Server
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Information</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/revenue" className="text-muted-foreground hover:text-primary transition-colors">
                  Revenue Sharing
                </Link>
              </li>
              <li>
                <Link href="/docs/votifier" className="text-muted-foreground hover:text-primary transition-colors">
                  Votifier Setup
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} MCServerList. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
