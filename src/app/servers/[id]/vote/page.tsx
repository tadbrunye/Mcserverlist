'use client'

import { useState, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { ThumbsUp, Trophy, DollarSign } from 'lucide-react'

export default function VotePage() {
  const params = useParams()
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [captchaToken, setCaptchaToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const captchaRef = useRef<HCaptcha>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!captchaToken) {
      setError('Please complete the captcha')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/servers/${params.id}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          hcaptchaToken: captchaToken,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to vote')
      }

      setSuccess(true)
      setTimeout(() => router.push(`/servers/${params.id}`), 3000)
    } catch (err: any) {
      setError(err.message)
      captchaRef.current?.resetCaptcha()
      setCaptchaToken('')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-6">
            <Trophy className="h-20 w-20 text-yellow-500 mx-auto" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Vote Recorded!</h1>
          <p className="text-muted-foreground mb-6">
            Thank you for voting! Your vote helps the server grow and earns them revenue.
          </p>
          <p className="text-sm text-muted-foreground">
            Redirecting you back to the server page...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Vote for this Server</CardTitle>
            <CardDescription>
              Vote to support this server and help them earn revenue!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-lg border bg-card text-center">
                <ThumbsUp className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold text-sm">Support Server</h3>
                <p className="text-xs text-muted-foreground">Help them grow</p>
              </div>
              <div className="p-4 rounded-lg border bg-card text-center">
                <DollarSign className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold text-sm">Earn Revenue</h3>
                <p className="text-xs text-muted-foreground">Server gets paid</p>
              </div>
              <div className="p-4 rounded-lg border bg-card text-center">
                <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold text-sm">Vote Daily</h3>
                <p className="text-xs text-muted-foreground">Once every 24h</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-destructive/10 text-destructive rounded-lg">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">
                  Minecraft Username *
                </label>
                <Input
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your Minecraft username"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Your vote will be sent to the server if Votifier is configured
                </p>
              </div>

              <div className="flex justify-center">
                <HCaptcha
                  ref={captchaRef}
                  sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || ''}
                  onVerify={(token) => setCaptchaToken(token)}
                  onExpire={() => setCaptchaToken('')}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading || !captchaToken}
              >
                {loading ? 'Submitting Vote...' : 'Submit Vote'}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                You can vote once every 24 hours for each server
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
