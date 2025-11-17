'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

const GAME_MODES = [
  'SURVIVAL', 'CREATIVE', 'ADVENTURE', 'HARDCORE', 'SKYBLOCK', 'PRISON',
  'FACTIONS', 'MINIGAMES', 'ROLEPLAY', 'MODDED', 'VANILLA', 'ANARCHY',
  'PARKOUR', 'PVP', 'BEDWARS', 'SKYWARS', 'OTHER'
]

export default function AddServerPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    port: '25565',
    gameMode: 'SURVIVAL',
    website: '',
    discordLink: '',
    storeLink: '',
    votifierAddress: '',
    votifierPort: '',
    votifierToken: '',
    banner: '',
  })

  if (status === 'loading') {
    return <div className="container mx-auto px-4 py-20">Loading...</div>
  }

  if (!session) {
    router.push('/auth/signin')
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/servers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          port: parseInt(formData.port) || 25565,
          votifierPort: formData.votifierPort ? parseInt(formData.votifierPort) : null,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create server')
      }

      const server = await response.json()
      router.push(`/servers/${server.id}`)
    } catch (err) {
      setError('Failed to add server. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Add Your Minecraft Server</CardTitle>
            <CardDescription>
              Submit your server to our list and start earning revenue from votes!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-destructive/10 text-destructive rounded-lg">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">
                  Server Name *
                </label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="My Awesome Server"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Description *
                </label>
                <Textarea
                  required
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  placeholder="Describe your server, features, and what makes it unique..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Server Address *
                  </label>
                  <Input
                    required
                    value={formData.address}
                    onChange={(e) => updateField('address', e.target.value)}
                    placeholder="play.example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Port
                  </label>
                  <Input
                    type="number"
                    value={formData.port}
                    onChange={(e) => updateField('port', e.target.value)}
                    placeholder="25565"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Game Mode *
                </label>
                <div className="flex flex-wrap gap-2">
                  {GAME_MODES.map(mode => (
                    <Badge
                      key={mode}
                      variant={formData.gameMode === mode ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => updateField('gameMode', mode)}
                    >
                      {mode}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Website URL
                </label>
                <Input
                  type="url"
                  value={formData.website}
                  onChange={(e) => updateField('website', e.target.value)}
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Discord Invite Link
                </label>
                <Input
                  type="url"
                  value={formData.discordLink}
                  onChange={(e) => updateField('discordLink', e.target.value)}
                  placeholder="https://discord.gg/..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Store Link
                </label>
                <Input
                  type="url"
                  value={formData.storeLink}
                  onChange={(e) => updateField('storeLink', e.target.value)}
                  placeholder="https://store.example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Banner Image URL
                </label>
                <Input
                  type="url"
                  value={formData.banner}
                  onChange={(e) => updateField('banner', e.target.value)}
                  placeholder="https://example.com/banner.png"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Recommended size: 800x200px
                </p>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4">Votifier Settings (Optional)</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Configure Votifier to receive vote notifications on your server
                </p>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Votifier Address
                      </label>
                      <Input
                        value={formData.votifierAddress}
                        onChange={(e) => updateField('votifierAddress', e.target.value)}
                        placeholder="vote.example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Votifier Port
                      </label>
                      <Input
                        type="number"
                        value={formData.votifierPort}
                        onChange={(e) => updateField('votifierPort', e.target.value)}
                        placeholder="8192"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Votifier Token
                    </label>
                    <Input
                      value={formData.votifierToken}
                      onChange={(e) => updateField('votifierToken', e.target.value)}
                      placeholder="Your votifier token/public key"
                    />
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Adding Server...' : 'Add Server'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
