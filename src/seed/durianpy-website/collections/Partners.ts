import { Payload, PayloadRequest } from 'payload'
import { COLLECTIONS } from '@/constants/collections'

export async function seedPartners({ payload, req }: { payload: Payload; req?: PayloadRequest }) {
  const { docs: mediaDocs } = await payload.find({
    collection: COLLECTIONS.MEDIA,
    limit: 1,
    req,
  })
  const mediaId = mediaDocs[0]?.id

  const partners = [
    {
      name: 'AWS User Group Davao',
      logo: mediaId,
      websiteUrl: 'https://awsugdavao.ph/',
      description: 'A community of AWS enthusiasts, cloud practitioners, and developers in Davao.',
      _status: 'published',
    },
    {
      name: 'Python Software Foundation',
      logo: mediaId,
      websiteUrl: 'https://www.python.org/psf',
      description: 'The organization behind the Python programming language.',
      _status: 'draft',
    },
  ] as const

  const docs = await Promise.all(
    partners.map((partner) =>
      payload.create({
        collection: COLLECTIONS.DURIANPY_WEBSITE_PARTNERS,
        data: partner,
        req,
      }),
    ),
  )

  return docs
}
