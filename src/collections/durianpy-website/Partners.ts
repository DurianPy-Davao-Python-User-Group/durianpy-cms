import { createCollectionAccess } from '@/access/checkResourceAccess'
import { COLLECTION_LABELS, COLLECTIONS } from '@/constants/collections'
import { SIDEBAR_GROUPS, getSidebarGroupLabel } from '@/constants/sidebarGroup'
import type { CollectionConfig } from 'payload'

export const Partners: CollectionConfig = {
  slug: COLLECTIONS.DURIANPY_WEBSITE_PARTNERS,
  labels: COLLECTION_LABELS[COLLECTIONS.DURIANPY_WEBSITE_PARTNERS],
  access: createCollectionAccess(COLLECTIONS.DURIANPY_WEBSITE_PARTNERS, true),
  admin: {
    defaultColumns: ['name', 'websiteUrl'],
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
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'websiteUrl',
      type: 'text',
      label: 'Website URL',
      validate: (value: string | null | undefined) => {
        if (!value) return true
        try {
          new URL(value)
          return true
        } catch {
          return 'Please enter a valid URL.'
        }
      },
    },
  ],
}
