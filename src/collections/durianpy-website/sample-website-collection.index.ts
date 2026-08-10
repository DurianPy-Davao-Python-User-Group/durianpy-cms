import { anyone } from '@/access/anyone'
import { checkResourceAccess } from '@/access/checkResourceAccess'
import { AccessType } from '@/constants/accessTypes'
import { COLLECTION_LABELS } from '@/constants/collections'
import { getSidebarGroupLabel, SIDEBAR_GROUPS } from '@/constants/sidebarGroup'
import type { AccessArgs, CollectionConfig } from 'payload'

const checkSampleAccess = (accessType?: AccessType) => (access: AccessArgs) =>
  checkResourceAccess(access, 'sample', accessType)

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
