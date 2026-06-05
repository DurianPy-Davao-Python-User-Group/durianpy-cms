import { anyone } from '@/access/anyone'
import { checkCollectionAccess } from '@/access/checkCollectionAccess'
import { AccessType } from '@/constants/accessTypes'
import { COLLECTION_LABELS, getCollectionGroupLabel } from '@/constants/collections'
import type { AccessArgs, CollectionConfig } from 'payload'

const checkSampleAccess = (accessType?: AccessType) => (access: AccessArgs) =>
  checkCollectionAccess(access, 'sample', accessType)

export const Sample: CollectionConfig = {
  slug: 'sample',
  labels: COLLECTION_LABELS.sample,
  access: {
    admin: checkSampleAccess('admin'),
    create: checkSampleAccess('create'),
    delete: checkSampleAccess('delete'),
    read: anyone,
    update: checkSampleAccess('update'),
  },

  admin: {
    defaultColumns: ['firstName'],
    group: getCollectionGroupLabel('durianpy-website'),
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
