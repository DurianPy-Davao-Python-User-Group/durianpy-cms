import { createCollectionAccess } from '@/access/checkResourceAccess'
import { COLLECTIONS, COLLECTION_LABELS } from '@/constants/collections'
import { getSidebarGroupLabel, SIDEBAR_GROUPS } from '@/constants/sidebarGroup'
import type { CollectionConfig } from 'payload'

export const Sample: CollectionConfig = {
  slug: 'sample',
  labels: COLLECTION_LABELS.sample,
  access: createCollectionAccess(COLLECTIONS.SAMPLE, true),

  admin: {
    defaultColumns: ['firstName'],
    group: getSidebarGroupLabel(SIDEBAR_GROUPS.DURIANPY_WEBSITE),
  },
  versions: {
    drafts: {
      autosave: {
        showSaveDraftButton: true,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'firstName',
          type: 'text',
          required: true,
        },
        {
          name: 'lastName',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
