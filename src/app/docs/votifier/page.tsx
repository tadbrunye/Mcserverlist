import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Code, CheckCircle, AlertTriangle } from 'lucide-react'

export default function VotifierDocsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Votifier Setup Guide</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Configure Votifier to send vote rewards to your players automatically
        </p>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>What is Votifier?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Votifier is a Minecraft plugin that allows your server to receive notifications when players vote
                for your server. This enables you to give players in-game rewards for voting.
              </p>

              <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold mb-1">Benefits</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Automatic in-game rewards for voters</li>
                      <li>• Increased player engagement</li>
                      <li>• More votes = higher ranking</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-6 w-6" />
                Installation Steps
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">1. Install Votifier Plugin</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Download and install one of these plugins on your Minecraft server:
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 ml-4">
                  <li>• <strong>NuVotifier</strong> (Recommended) - Works with Spigot, Paper, Bukkit</li>
                  <li>• <strong>Votifier</strong> - Original version</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-3">2. Configure Votifier</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  After installing, find your Votifier configuration file:
                </p>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                  plugins/Votifier/config.yml
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">3. Get Your Token/Key</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  In the config.yml file, you'll find your public key or token. It looks like this:
                </p>
                <div className="bg-muted p-4 rounded-lg font-mono text-xs overflow-x-auto">
                  {`token: "YOUR_TOKEN_HERE"
# or
public-key: |
  -----BEGIN PUBLIC KEY-----
  MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...
  -----END PUBLIC KEY-----`}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">4. Note Your Port</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Find the port Votifier is listening on (default is 8192):
                </p>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                  port: 8192
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">5. Configure on MCServerList</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  When adding/editing your server, fill in these fields:
                </p>
                <div className="space-y-3">
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm font-semibold">Votifier Address</p>
                    <p className="text-xs text-muted-foreground">
                      Your server's IP or domain (e.g., vote.yourserver.com)
                    </p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm font-semibold">Votifier Port</p>
                    <p className="text-xs text-muted-foreground">
                      Usually 8192 (check your config.yml)
                    </p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm font-semibold">Votifier Token</p>
                    <p className="text-xs text-muted-foreground">
                      Your public key or token from config.yml
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Setting Up Vote Rewards</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                To give players rewards when they vote, you'll need a vote listener plugin:
              </p>

              <div className="space-y-3">
                <div className="p-4 rounded-lg border">
                  <h4 className="font-semibold mb-2">VotingPlugin</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Popular choice with lots of features and reward options
                  </p>
                  <a
                    href="https://www.spigotmc.org/resources/votingplugin.15358/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    Download from SpigotMC →
                  </a>
                </div>

                <div className="p-4 rounded-lg border">
                  <h4 className="font-semibold mb-2">SuperbVote</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Lightweight and easy to configure
                  </p>
                  <a
                    href="https://www.spigotmc.org/resources/superbvote.11626/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    Download from SpigotMC →
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-yellow-500" />
                Troubleshooting
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Votes not being received?</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                    <li>• Make sure your Votifier port (8192) is open in your firewall</li>
                    <li>• Check that the Votifier address is correct (not your game server port)</li>
                    <li>• Verify your token/public key is copied exactly</li>
                    <li>• Check your server logs for Votifier errors</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Port forwarding issues?</h4>
                  <p className="text-sm text-muted-foreground">
                    If you're running your server behind a router, you'll need to forward port 8192
                    (or your Votifier port) to your server, just like you did for your Minecraft server port.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Still having problems?</h4>
                  <p className="text-sm text-muted-foreground">
                    Contact us at support@mcserverlist.com with your server details and we'll help you get set up!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="p-6 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> Votifier configuration is optional. Your server will still receive votes
              and appear on the list without it, but players won't receive in-game rewards unless Votifier is set up.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
