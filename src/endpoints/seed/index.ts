import type { CollectionSlug, Payload, PayloadRequest } from 'payload'

import { seedUsers } from '../../seed/collections/Users'
import { seedMedia } from '../../seed/collections/Media'
import { seedCategories } from '../../seed/collections/Categories'
import { seedForms } from '../../seed/collections/Forms'
import { COLLECTIONS } from '@/constants/collections'

const collections: CollectionSlug[] = Object.values(COLLECTIONS).map((x) => x)

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
    collections.map((collection) => {
      if (collection === 'users') {
        return
      }

      payload.db.deleteMany({ collection, req, where: {} })
    }),
  )

  await Promise.all(
    collections
      .filter((collection) => Boolean(payload.collections[collection].config.versions))
      .map((collection) => payload.db.deleteVersions({ collection, req, where: {} })),
  )

  await seedUsers({ payload })
  await seedMedia({ payload })

  await seedCategories({ payload })

  await seedForms({ payload })

  payload.logger.info('Seeded database successfully!')
}
