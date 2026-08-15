import { GlobalConfig } from 'payload'

import { createGlobalAccess } from '@/access/checkResourceAccess'
import { GLOBAL_LABELS, GLOBALS } from '@/constants/globals'
import { getSidebarGroupLabel, SIDEBAR_GROUPS } from '@/constants/sidebarGroup'

export const CTASection: GlobalConfig = {
  slug: GLOBALS.DURIANPY_WEBSITE_CTA_SECTION,
  label: GLOBAL_LABELS[GLOBALS.DURIANPY_WEBSITE_CTA_SECTION],

  admin: {
    group: getSidebarGroupLabel(SIDEBAR_GROUPS.DURIANPY_WEBSITE),
  },

  access: createGlobalAccess(GLOBALS.DURIANPY_WEBSITE_CTA_SECTION, true),

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
