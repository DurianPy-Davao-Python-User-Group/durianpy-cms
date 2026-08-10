import { Payload, PayloadRequest } from 'payload'
import { GLOBALS } from '@/constants/globals'

export async function seedCarousel({ payload, req }: { payload: Payload; req?: PayloadRequest }) {
  const { docs: mediaDocs } = await payload.find({
    collection: 'media',
    limit: 1,
    req,
  })
  const mediaId = mediaDocs[0]?.id

  await payload.updateGlobal({
    slug: GLOBALS.DURIANPY_WEBSITE_CAROUSEL,
    data: {
      title: 'Our Community',
      subtitle: 'See what we are up to in Davao',
      photos: [{ image: mediaId }, { image: mediaId }],
      _status: 'published',
    },
  })
}
