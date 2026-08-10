import { anyone } from '@/access/anyone'
import { checkResourceAccess } from '@/access/checkResourceAccess'
import { AccessType } from '@/constants/accessTypes'
import { COLLECTIONS, COLLECTION_LABELS } from '@/constants/collections'
import { SIDEBAR_GROUPS, getSidebarGroupLabel } from '@/constants/sidebarGroup'
import type { AccessArgs, CollectionConfig } from 'payload'

const checkSponsorsAccess = (accessType?: AccessType) => (access: AccessArgs) =>
  checkResourceAccess(access, COLLECTIONS.DURIANPY_WEBSITE_SPONSORS, accessType)

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
