import { anyone } from '@/access/anyone'
import { checkCollectionAccess } from '@/access/checkCollectionAccess'
import { AccessType } from '@/constants/accessTypes'
import {
  COLLECTIONS,
  COLLECTION_LABELS,
  getCollectionGroupLabel,
  COLLECTION_GROUPS,
} from '@/constants/collections'
import type { AccessArgs, CollectionConfig } from 'payload'

const checkSponsorsAccess = (accessType?: AccessType) => (access: AccessArgs) =>
  checkCollectionAccess(access, COLLECTIONS.DURIANPY_WEBSITE_SPONSORS, accessType)

export const Sponsors: CollectionConfig = {
  slug: COLLECTIONS.DURIANPY_WEBSITE_SPONSORS,
  labels: COLLECTION_LABELS[COLLECTIONS.DURIANPY_WEBSITE_SPONSORS],
  access: {
    admin: checkSponsorsAccess('admin'),
    create: checkSponsorsAccess('create'),
    delete: checkSponsorsAccess('delete'),
    read: anyone,
    update: checkSponsorsAccess('update'),
  },

  admin: {
    defaultColumns: ['name', 'logo', 'websiteUrl', 'tier'],
    group: getCollectionGroupLabel(COLLECTION_GROUPS.DURIANPY_WEBSITE),
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: COLLECTIONS.MEDIA,
      required: true,
    },
    {
      name: 'websiteUrl',
      type: 'text',
      required: false,
    },
    {
      name: 'tier',
      type: 'select',
      required: true,
      options: [
        { label: 'Gold', value: 'gold' },
        { label: 'Silver', value: 'silver' },
        { label: 'Venue', value: 'venue' },
        { label: 'Community', value: 'community' },
      ],
    },
  ],
}
