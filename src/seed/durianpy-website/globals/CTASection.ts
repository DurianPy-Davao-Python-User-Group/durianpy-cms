import { Payload, PayloadRequest } from 'payload'
import { GLOBALS } from '@/constants/globals'

export async function seedCTASection({ payload, req }: { payload: Payload; req?: PayloadRequest }) {
  const { docs: mediaDocs } = await payload.find({
    collection: 'media',
    limit: 1,
    req,
  })
  const mediaId = mediaDocs[0]?.id

  await payload.updateGlobal({
    slug: GLOBALS.DURIANPY_WEBSITE_CTA_SECTION,
    data: {
      cards: [
        {
          link: 'https://durianpy.org/join',
          whiteText: 'Join our',
          yellowText: 'Community',
          icon: mediaId,
        },
        {
          link: 'https://durianpy.org/sponsor',
          whiteText: 'Become a',
          yellowText: 'Sponsor',
          icon: mediaId,
        },
      ],
      _status: 'published',
    },
  })
}
