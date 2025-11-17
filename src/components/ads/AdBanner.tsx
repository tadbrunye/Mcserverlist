'use client'

import { useEffect } from 'react'

interface AdBannerProps {
  slot: string
  format?: string
}

export function AdBanner({ slot, format = 'auto' }: AdBannerProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (err) {
      console.error('AdSense error:', err)
    }
  }, [])

  if (!process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID) {
    return null
  }

  return (
    <div className="my-8 flex justify-center">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}
