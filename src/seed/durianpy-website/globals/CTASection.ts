import { Payload, PayloadRequest } from 'payload'
import { COLLECTIONS } from '@/constants/collections'
import { GLOBALS } from '@/constants/globals'

export async function seedCTASection({ payload, req }: { payload: Payload; req?: PayloadRequest }) {
  const { docs: joinDocs } = await payload.find({
    collection: COLLECTIONS.MEDIA,
    where: { alt: { equals: 'Join Our Community' } },
    limit: 1,
    req,
  })
  const { docs: attendDocs } = await payload.find({
    collection: COLLECTIONS.MEDIA,
    where: { alt: { equals: 'Attend Events' } },
    limit: 1,
    req,
  })
  const { docs: giveTalkDocs } = await payload.find({
    collection: COLLECTIONS.MEDIA,
    where: { alt: { equals: 'Give a Talk' } },
    limit: 1,
    req,
  })

  const joinIcon = joinDocs[0]?.id
  const attendIcon = attendDocs[0]?.id
  const giveTalkIcon = giveTalkDocs[0]?.id

  await payload.updateGlobal({
    slug: GLOBALS.DURIANPY_WEBSITE_CTA_SECTION,
    data: {
      cards: [
        {
          link: 'https://www.meetup.com/durianpy/',
          whiteText: 'Join Our',
          yellowText: 'Community',
          icon: joinIcon,
        },
        {
          link: 'https://www.meetup.com/durianpy/events/',
          whiteText: 'Attend',
          yellowText: 'Events',
          icon: attendIcon,
        },
        {
          link: 'https://forms.gle/x2cc6CrRhbhDeaxe9',
          whiteText: 'Give a',
          yellowText: 'Talk',
          icon: giveTalkIcon,
        },
      ],
      _status: 'published',
    },
    req,
  })
}
