import { createCollectionAccess } from '@/access/checkResourceAccess'
import { COLLECTIONS, COLLECTION_LABELS } from '@/constants/collections'
import { SIDEBAR_GROUPS, getSidebarGroupLabel } from '@/constants/sidebarGroup'
import type { CollectionConfig } from 'payload'

export const Sponsors: CollectionConfig = {
  slug: COLLECTIONS.DURIANPY_WEBSITE_SPONSORS,
  labels: COLLECTION_LABELS[COLLECTIONS.DURIANPY_WEBSITE_SPONSORS],
  access: createCollectionAccess(COLLECTIONS.DURIANPY_WEBSITE_SPONSORS, true),

  admin: {
    defaultColumns: ['name', 'logo', 'websiteUrl', 'tier'],
    group: getSidebarGroupLabel(SIDEBAR_GROUPS.DURIANPY_WEBSITE),
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
      name: 'banner',
      type: 'upload',
      relationTo: COLLECTIONS.MEDIA,
      required: false,
    },
    {
      name: 'websiteUrl',
      type: 'text',
      required: false,
    },
    {
      name: 'description',
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
