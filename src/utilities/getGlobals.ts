import type { Config } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'

type GlobalSlug = keyof Config['globals']

/**
 * Fetches Global data inside Server Components with Next.js Draft Mode support.
 */
export async function getGlobal<T extends GlobalSlug>(
  slug: T,
  depth = 1,
): Promise<Config['globals'][T]> {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const globalData = await payload.findGlobal({
    slug,
    depth,
    draft,
  })

  return globalData as Config['globals'][T]
}
