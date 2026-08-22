import { Payload, PayloadRequest } from 'payload'
import { COLLECTIONS } from '@/constants/collections'

export async function seedSponsors({ payload, req }: { payload: Payload; req?: PayloadRequest }) {
  const { docs: mediaDocs } = await payload.find({
    collection: COLLECTIONS.MEDIA,
    limit: 1,
    req,
  })
  const mediaId = mediaDocs[0]?.id

  const sponsors = [
    {
      name: 'TechCorp',
      websiteUrl: 'https://techcorp.example.com',
      tier: 'gold',
      logo: mediaId,
      banner: mediaId,
      description: 'Leading technology solutions provider.',
      _status: 'published',
    },
    {
      name: 'Local Devs',
      websiteUrl: 'https://localdevs.example.com',
      tier: 'community',
      logo: mediaId,
      banner: mediaId,
      description: 'A community of local developers.',
      _status: 'published',
    },
  ] as const

  const docs = await Promise.all(
    sponsors.map((sponsor) =>
      payload.create({
        collection: COLLECTIONS.DURIANPY_WEBSITE_SPONSORS,
        data: sponsor,
        req,
      }),
    ),
  )

  return docs
}
