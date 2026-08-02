import { anyone } from '@/access/anyone'
import { checkCollectionAccess } from '@/access/checkCollectionAccess'
import { AccessType } from '@/constants/accessTypes'
import {
  COLLECTION_LABELS,
  getCollectionGroupLabel,
  COLLECTION_GROUPS,
  COLLECTIONS,
} from '@/constants/collections'
import type { AccessArgs, CollectionConfig } from 'payload'

const checkSIGsAccess = (accessType?: AccessType) => (access: AccessArgs) =>
  checkCollectionAccess(access, COLLECTIONS.DURIANPY_WEBSITE_SIGS, accessType)

export const SIGs: CollectionConfig = {
  slug: COLLECTIONS.DURIANPY_WEBSITE_SIGS,
  labels: COLLECTION_LABELS[COLLECTIONS.DURIANPY_WEBSITE_SIGS],
  access: {
    admin: checkSIGsAccess('admin'),
    create: checkSIGsAccess('create'),
    delete: checkSIGsAccess('delete'),
    read: anyone,
    update: checkSIGsAccess('update'),
  },

  admin: {
    defaultColumns: ['title', 'icon', 'isActive', 'createdAt'],
    group: getCollectionGroupLabel(COLLECTION_GROUPS.DURIANPY_WEBSITE),
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
