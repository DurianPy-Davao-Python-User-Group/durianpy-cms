import type { CollectionSlug, Payload, PayloadRequest } from 'payload'

import { seedUsers } from '../../seed/admin/collections/Users'
import { seedServiceAccounts } from '../../seed/admin/collections/ServiceAccounts'
import { seedCategories } from '../../seed/default/collections/Categories'
import { seedMedia } from '../../seed/default/collections/Media'
import { seedEvents } from '../../seed/durianpy-website/collections/Events'
import { seedSIGs } from '../../seed/durianpy-website/collections/SIGs'
import { seedSponsors } from '../../seed/durianpy-website/collections/Sponsors'
import { seedSample } from '../../seed/durianpy-website/collections/sample-website-collection.index'

import { seedCTASection } from '../../seed/durianpy-website/globals/CTASection'
import { seedCarousel } from '../../seed/durianpy-website/globals/Carousel'
import { seedCodeOfConduct } from '../../seed/durianpy-website/globals/CodeOfConduct'
import { seedHomepageConfig } from '../../seed/durianpy-website/globals/HomepageConfig'
import { seedStatisticsConfig } from '../../seed/durianpy-website/globals/StatisticsConfig'

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
        return Promise.resolve()
      }

      return payload.db.deleteMany({ collection, req, where: {} })
    }),
  )

  await Promise.all(
    collections
      .filter((collection) => Boolean(payload.collections[collection]?.config?.versions))
      .map((collection) => payload.db.deleteVersions({ collection, req, where: {} })),
  )

  payload.logger.info(`— Seeding Admin...`)
  await seedUsers({ payload, req })
  await seedServiceAccounts({ payload, req })

  payload.logger.info(`— Seeding Default...`)
  await seedMedia({ payload, req })
  await seedCategories({ payload, req })

  payload.logger.info(`— Seeding DurianPy Website Collections...`)
  await seedEvents({ payload, req })
  await seedSIGs({ payload, req })
  await seedSponsors({ payload, req })
  await seedSample({ payload, req })

  payload.logger.info(`— Seeding DurianPy Website Globals...`)
  await seedCTASection({ payload, req })
  await seedCarousel({ payload, req })
  await seedCodeOfConduct({ payload, req })
  await seedHomepageConfig({ payload, req })
  await seedStatisticsConfig({ payload, req })

  payload.logger.info('Seeded database successfully!')
}
