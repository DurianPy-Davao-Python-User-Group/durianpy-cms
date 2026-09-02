import { Payload, PayloadRequest } from 'payload'
import { COLLECTIONS } from '@/constants/collections'
import { GLOBALS } from '@/constants/globals'

export async function seedCarousel({ payload, req }: { payload: Payload; req?: PayloadRequest }) {
  const { docs: carouselMedia } = await payload.find({
    collection: COLLECTIONS.MEDIA,
    where: {
      or: [
        { alt: { equals: 'PyConf 2024' } },
        { alt: { equals: 'Meetup #1' } },
        { alt: { equals: 'Meetup #2' } },
        { alt: { equals: 'Meetup #3' } },
      ],
    },
    sort: 'createdAt',
    limit: 10,
    req,
  })

  const photos = carouselMedia.map((media) => ({ image: media.id }))

  await payload.updateGlobal({
    slug: GLOBALS.DURIANPY_WEBSITE_CAROUSEL,
    data: {
      title: 'Davao Python Community',
      subtitle: 'where Pythonistas and enthusiasts gather to discuss trends and share knowledge',
      photos: photos.length > 0 ? photos : [{ image: carouselMedia[0]?.id }],
      _status: 'published',
    },
    req,
  })
}
