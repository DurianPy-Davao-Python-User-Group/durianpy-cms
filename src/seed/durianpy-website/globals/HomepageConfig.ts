import { Payload, PayloadRequest } from 'payload'
import { COLLECTIONS } from '@/constants/collections'
import { GLOBALS } from '@/constants/globals'

export async function seedHomepageConfig({
  payload,
  req,
}: {
  payload: Payload
  req?: PayloadRequest
}) {
  const { docs: mediaDocs } = await payload.find({
    collection: COLLECTIONS.MEDIA,
    where: {
      alt: {
        equals: 'DurianPy Logo',
      },
    },
    limit: 1,
    req,
  })
  const mediaId = mediaDocs[0]?.id

  await payload.updateGlobal({
    slug: GLOBALS.DURIANPY_WEBSITE_HOMEPAGE_CONFIG,
    data: {
      heroImageDesktop: mediaId,
      heroImageMobile: mediaId,
      heroTitle: "Accelerating Davao's",
      heroSubtitle: 'Tech Growth with Python',
      _status: 'published',
    },
    req,
  })
}
