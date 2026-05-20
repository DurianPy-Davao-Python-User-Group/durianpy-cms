import { Payload } from 'payload'
import { post1 } from '../../endpoints/seed/post-1'
import { post2 } from '../../endpoints/seed/post-2'
import { post3 } from '../../endpoints/seed/post-3'

export async function seedPosts({
  payload,
  demoAuthor,
  image1Doc,
  image2Doc,
  image3Doc,
}: {
  payload: Payload
  demoAuthor: any
  image1Doc: any
  image2Doc: any
  image3Doc: any
}) {
  payload.logger.info(`— Seeding posts...`)

  const post1Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post1({ heroImage: image1Doc, blockImage: image2Doc, author: demoAuthor }),
  })

  const post2Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post2({ heroImage: image2Doc, blockImage: image3Doc, author: demoAuthor }),
  })

  const post3Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post3({ heroImage: image3Doc, blockImage: image1Doc, author: demoAuthor }),
  })

  await payload.update({
    id: post1Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post2Doc.id, post3Doc.id],
    },
  })
  
  await payload.update({
    id: post2Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post1Doc.id, post3Doc.id],
    },
  })
  
  await payload.update({
    id: post3Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post1Doc.id, post2Doc.id],
    },
  })

  return { post1Doc, post2Doc, post3Doc }
}
