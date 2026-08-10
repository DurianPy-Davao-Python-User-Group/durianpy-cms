import { Payload, PayloadRequest } from 'payload'
import { COLLECTIONS } from '@/constants/collections'

export async function seedSIGs({ payload, req }: { payload: Payload; req?: PayloadRequest }) {
  const { docs: mediaDocs } = await payload.find({
    collection: COLLECTIONS.MEDIA,
    limit: 1,
    req,
  })
  const mediaId = mediaDocs[0]?.id

  const sigs = [
    {
      title: 'Web Development SIG',
      isActive: true,
      icon: mediaId,
      _status: 'published',
    },
    {
      title: 'Data Science SIG',
      isActive: true,
      icon: mediaId,
      _status: 'published',
    },
  ] as const

  const docs = await Promise.all(
    sigs.map((sig) =>
      payload.create({
        collection: COLLECTIONS.DURIANPY_WEBSITE_SIGS,
        data: {
          title: sig.title,
          isActive: sig.isActive,
          icon: sig.icon,
          _status: sig._status,
        },
        req,
      }),
    ),
  )

  return docs
}
