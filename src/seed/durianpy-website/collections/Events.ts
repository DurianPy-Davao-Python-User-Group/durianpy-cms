import { Payload, PayloadRequest } from 'payload'
import { COLLECTIONS } from '@/constants/collections'

export async function seedEvents({ payload, req }: { payload: Payload; req?: PayloadRequest }) {
  const { docs: mediaDocs } = await payload.find({
    collection: COLLECTIONS.MEDIA,
    limit: 1,
    req,
  })
  const mediaId = mediaDocs[0]?.id

  const events = [
    {
      title: 'DurianPy Davao Meetup 2025',
      date: new Date('2025-10-15T18:00:00Z').toISOString(),
      location: 'Davao City, Philippines',
      registrationLink: 'https://example.com/register/durianpy-meetup',
      isFeatured: true,
      coverImage: mediaId,
      _status: 'published',
    },
    {
      title: 'Python Web Development Workshop',
      date: new Date('2025-11-20T09:00:00Z').toISOString(),
      location: 'Virtual',
      registrationLink: 'https://example.com/register/python-web',
      isFeatured: false,
      coverImage: mediaId,
      _status: 'published',
    },
  ] as const

  const docs = await Promise.all(
    events.map((event) =>
      payload.create({
        collection: COLLECTIONS.DURIANPY_WEBSITE_EVENTS,
        data: event,
        req,
      }),
    ),
  )

  return docs
}
