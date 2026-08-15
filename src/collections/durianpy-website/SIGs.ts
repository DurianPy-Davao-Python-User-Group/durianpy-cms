import { createCollectionAccess } from '@/access/checkResourceAccess'
import { COLLECTION_LABELS, COLLECTIONS } from '@/constants/collections'
import { getSidebarGroupLabel, SIDEBAR_GROUPS } from '@/constants/sidebarGroup'
import type { CollectionConfig } from 'payload'

export const SIGs: CollectionConfig = {
  slug: COLLECTIONS.DURIANPY_WEBSITE_SIGS,
  labels: COLLECTION_LABELS[COLLECTIONS.DURIANPY_WEBSITE_SIGS],
  access: createCollectionAccess(COLLECTIONS.DURIANPY_WEBSITE_SIGS, true),

  admin: {
    defaultColumns: ['title', 'icon', 'isActive', 'createdAt'],
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
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'isActive',
      defaultValue: true,
      type: 'checkbox',
      admin: {
        description: 'Uncheck to hide defunct SIGs without deleting data',
      },
    },
  ],
}
