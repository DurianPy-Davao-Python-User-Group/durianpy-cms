import type { CollectionConfig } from 'payload'

import { createCollectionAccess } from '@/access/checkResourceAccess'
import { COLLECTIONS } from '@/constants/collections'
import { authenticated } from '../access/authenticated'
import { slugField } from 'payload'

export const Categories: CollectionConfig = {
  slug: COLLECTIONS.CATEGORIES,
  access: {
    ...createCollectionAccess(COLLECTIONS.CATEGORIES, false),
    create: authenticated,
    delete: authenticated,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField({
      position: undefined,
    }),
  ],
}
