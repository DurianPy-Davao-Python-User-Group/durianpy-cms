import { GlobalConfig, AccessArgs } from 'payload'
import { checkCollectionAccess } from '@/access/checkCollectionAccess'
import { getCollectionGroupLabel } from '@/constants/collections'
import { GLOBALS, GLOBAL_LABELS } from '@/constants/globals'

type AccessType = 'create' | 'read' | 'update' | 'delete'

const checkStatisticsConfigAccess = (accessType?: AccessType) => (access: AccessArgs) =>
  checkCollectionAccess(access, GLOBALS.DURIANPY_WEBSITE_STATISTICS_CONFIG, accessType)

export const StatisticsConfig: GlobalConfig = {
  slug: GLOBALS.DURIANPY_WEBSITE_STATISTICS_CONFIG,
  label: GLOBAL_LABELS[GLOBALS.DURIANPY_WEBSITE_STATISTICS_CONFIG].singular,
  admin: {
    group: getCollectionGroupLabel('durianpy-website'),
  },
  versions: {
    drafts: true,
  },
  access: {
    read: () => true,
    update: checkStatisticsConfigAccess('update'),
  },
  fields: [
    {
      name: 'metrics',
      type: 'array',
      label: 'Metrics',
      minRows: 1,
      admin: {
        description: 'Add stat blocks to show on the homepage',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Label',
          admin: {
            placeholder: 'e.g., Active Members',
          },
        },
        {
          name: 'value',
          type: 'number',
          required: true,
          label: 'Value',
          admin: {
            placeholder: 'e.g., 350',
          },
        },
        {
          name: 'large',
          type: 'checkbox',
          label: 'Emphasize Stat Block',
          admin: {
            description: 'Check this to make the stat block span 2 rows on the frontend.',
          },
        },
      ],
    },
  ],
}
