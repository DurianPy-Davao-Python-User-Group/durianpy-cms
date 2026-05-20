import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest } from 'payload'

import { seedUsers } from '../../seed/collections/Users'
import { seedMedia } from '../../seed/collections/Media'
import { seedCategories } from '../../seed/collections/Categories'
import { seedPosts } from '../../seed/collections/Posts'
import { seedForms } from '../../seed/collections/Forms'
import { seedPages } from '../../seed/collections/Pages'
import { seedGlobals } from '../../seed/globals'

const collections: CollectionSlug[] = [
  'categories',
  'media',
  'pages',
  'posts',
  'forms',
  'form-submissions',
  'search',
]

const globals: GlobalSlug[] = ['header', 'footer']

// Next.js revalidation errors are normal when seeding the database without a server running
// i.e. running `yarn seed` locally instead of using the admin UI within an active app
// The app is not running to revalidate the pages and so the API routes are not available
// These error messages can be ignored: `Error hitting revalidate route for...`
export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  // we need to clear the media directory before seeding
  // as well as the collections and globals
  // this is because while `yarn seed` drops the database
  // the custom `/api/seed` endpoint does not
  payload.logger.info(`— Clearing collections and globals...`)

  // clear the database
  await Promise.all(
    globals.map((global) =>
      payload.updateGlobal({
        slug: global,
        data: {
          navItems: [],
        },
        depth: 0,
        context: {
          disableRevalidate: true,
        },
      }),
    ),
  )

  await Promise.all(
    collections.map((collection) => payload.db.deleteMany({ collection, req, where: {} })),
  )

  await Promise.all(
    collections
      .filter((collection) => Boolean(payload.collections[collection].config.versions))
      .map((collection) => payload.db.deleteVersions({ collection, req, where: {} })),
  )

  const demoAuthor = await seedUsers({ payload })
  const { image1Doc, image2Doc, image3Doc, imageHomeDoc } = await seedMedia({ payload })
  
  await seedCategories({ payload })
  
  await seedPosts({ payload, demoAuthor, image1Doc, image2Doc, image3Doc })
  
  const contactForm = await seedForms({ payload })
  
  const { contactPage } = await seedPages({ payload, imageHomeDoc, image2Doc, contactForm })
  
  await seedGlobals({ payload, contactPage })

  payload.logger.info('Seeded database successfully!')
}
