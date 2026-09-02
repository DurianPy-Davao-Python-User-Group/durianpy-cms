import fs from 'fs'
import path from 'path'
import { Payload, PayloadRequest } from 'payload'
import { COLLECTIONS } from '@/constants/collections'

const mediaAssets = [
  { fileName: 'durianpy-logo.png', alt: 'DurianPy Logo', mimetype: 'image/png' },
  { fileName: 'carousel-1.png', alt: 'PyConf 2024', mimetype: 'image/png' },
  { fileName: 'carousel-2.png', alt: 'Meetup #1', mimetype: 'image/png' },
  { fileName: 'carousel-3.png', alt: 'Meetup #2', mimetype: 'image/png' },
  { fileName: 'carousel-4.png', alt: 'Meetup #3', mimetype: 'image/png' },
  { fileName: 'join-our-community.svg', alt: 'Join Our Community', mimetype: 'image/svg+xml' },
  { fileName: 'attend-events.svg', alt: 'Attend Events', mimetype: 'image/svg+xml' },
  { fileName: 'give-a-talk.svg', alt: 'Give a Talk', mimetype: 'image/svg+xml' },
]

export async function seedMedia({ payload, req }: { payload: Payload; req?: PayloadRequest }) {
  const createdMedia = await Promise.all(
    mediaAssets.map(async (asset) => {
      const assetPath = path.resolve(process.cwd(), `src/seed/assets/${asset.fileName}`)
      if (!fs.existsSync(assetPath)) return null

      const imageBuffer = fs.readFileSync(assetPath)

      return payload.create({
        collection: COLLECTIONS.MEDIA,
        data: {
          alt: asset.alt,
        },
        file: {
          data: imageBuffer,
          name: asset.fileName,
          mimetype: asset.mimetype,
          size: imageBuffer.length,
        },
        req,
      })
    }),
  )

  return createdMedia.filter(Boolean)
}
