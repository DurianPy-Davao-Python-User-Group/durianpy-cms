import fs from 'fs'
import path from 'path'
import { Payload, PayloadRequest } from 'payload'
import { COLLECTIONS } from '@/constants/collections'

export async function seedMedia({ payload, req }: { payload: Payload; req?: PayloadRequest }) {
  const imagePath = path.resolve(process.cwd(), 'src/seed/assets/durianpy-logo.png')
  const imageBuffer = fs.readFileSync(imagePath)

  const mediaItem = await payload.create({
    collection: COLLECTIONS.MEDIA,
    data: {
      alt: 'DurianPy Logo',
    },
    file: {
      data: imageBuffer,
      name: 'durianpy-logo.png',
      mimetype: 'image/png',
      size: imageBuffer.length,
    },
    req,
  })

  return [mediaItem]
}
