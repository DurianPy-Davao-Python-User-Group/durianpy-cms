import { Payload, PayloadRequest } from 'payload'
import { GLOBALS } from '@/constants/globals'

export async function seedHomepageConfig({
  payload,
  req,
}: {
  payload: Payload
  req?: PayloadRequest
}) {
  const { docs: mediaDocs } = await payload.find({
    collection: 'media',
    limit: 1,
    req,
  })
  const mediaId = mediaDocs[0]?.id

  await payload.updateGlobal({
    slug: GLOBALS.DURIANPY_WEBSITE_HOMEPAGE_CONFIG,
    data: {
      heroImageDesktop: mediaId,
      heroImageMobile: mediaId,
      heroTitle: 'Welcome to DurianPy',
      heroSubtitle: 'The Python Community of Davao',
      _status: 'published',
    },
  })
}
