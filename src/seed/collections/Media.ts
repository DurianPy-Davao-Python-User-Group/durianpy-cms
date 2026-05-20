import { Payload, File } from 'payload'
import { image1 } from '../../endpoints/seed/image-1'
import { image2 } from '../../endpoints/seed/image-2'
import { imageHero1 } from '../../endpoints/seed/image-hero-1'

async function fetchFileByURL(url: string): Promise<File> {
  const res = await fetch(url, {
    credentials: 'include',
    method: 'GET',
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`)
  }

  const data = await res.arrayBuffer()

  return {
    name: url.split('/').pop() || `file-${Date.now()}`,
    data: Buffer.from(data),
    mimetype: `image/${url.split('.').pop()}`,
    size: data.byteLength,
  }
}

export async function seedMedia({ payload }: { payload: Payload }) {
  payload.logger.info(`— Seeding media...`)

  const [image1Buffer, image2Buffer, image3Buffer, hero1Buffer] = await Promise.all([
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post1.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post2.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post3.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-hero1.webp',
    ),
  ])

  const image1Doc = await payload.create({
    collection: 'media',
    data: image1,
    file: image1Buffer,
  })

  const image2Doc = await payload.create({
    collection: 'media',
    data: image2,
    file: image2Buffer,
  })

  const image3Doc = await payload.create({
    collection: 'media',
    data: image2,
    file: image3Buffer,
  })

  const imageHomeDoc = await payload.create({
    collection: 'media',
    data: imageHero1,
    file: hero1Buffer,
  })

  return { image1Doc, image2Doc, image3Doc, imageHomeDoc }
}
