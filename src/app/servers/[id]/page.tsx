import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { ServerDetails } from '@/components/servers/ServerDetails'
import { ReviewList } from '@/components/servers/ReviewList'
import { AdBanner } from '@/components/ads/AdBanner'

export default async function ServerPage({ params }: { params: { id: string } }) {
  const server = await prisma.server.findUnique({
    where: { id: params.id },
    include: {
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      _count: {
        select: {
          votes: true,
          reviews: true,
        },
      },
    },
  })

  if (!server) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <ServerDetails server={server} />

      {server.adsEnabled && (
        <AdBanner slot="server-page" />
      )}

      <div className="mt-12">
        <ReviewList serverId={server.id} />
      </div>
    </div>
  )
}
