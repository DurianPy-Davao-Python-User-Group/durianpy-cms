import { AccessArgs, GlobalConfig } from 'payload'

import { checkResourceAccess } from '@/access/checkResourceAccess'
import { anyone } from '@/access/anyone'
import { AccessType } from '@/constants/accessTypes'
import { GLOBAL_LABELS, GLOBALS } from '@/constants/globals'
import { getSidebarGroupLabel, SIDEBAR_GROUPS } from '@/constants/sidebarGroup'

const checkCTASectionAccess = (accessType?: AccessType) => (access: AccessArgs) =>
  checkResourceAccess(access, GLOBALS.DURIANPY_WEBSITE_CTA_SECTION, accessType)

export const CTASection: GlobalConfig = {
  slug: GLOBALS.DURIANPY_WEBSITE_CTA_SECTION,
  label: GLOBAL_LABELS[GLOBALS.DURIANPY_WEBSITE_CTA_SECTION],

  admin: {
    group: getSidebarGroupLabel(SIDEBAR_GROUPS.DURIANPY_WEBSITE),
  },

  access: {
    read: anyone,
    update: checkCTASectionAccess('update'),
  },

  versions: {
    drafts: true,
  },

  fields: [
    {
      name: 'cards',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 3,
      fields: [
        {
          name: 'link',
          type: 'text',
          required: true,
        },
        {
          name: 'whiteText',
          type: 'text',
          required: true,
        },
        {
          name: 'yellowText',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
