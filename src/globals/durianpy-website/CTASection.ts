import { AccessArgs, GlobalConfig } from 'payload'

import { checkCollectionAccess } from '@/access/checkCollectionAccess'
import { getCollectionGroupLabel } from '@/constants/collections'
import { anyone } from '@/access/anyone'
import { AccessType } from '@/constants/accessTypes'
import { GLOBAL_LABELS, GLOBALS } from '@/constants/globals'

const checkCTASectionAccess = (accessType?: AccessType) => (access: AccessArgs) =>
  checkCollectionAccess(access, GLOBALS.DURIANPY_WEBSITE_CTA_SECTION, accessType)

export const CTASection: GlobalConfig = {
  slug: GLOBALS.DURIANPY_WEBSITE_CTA_SECTION,
  label: GLOBAL_LABELS[GLOBALS.DURIANPY_WEBSITE_CTA_SECTION].singular,

  admin: {
    group: getCollectionGroupLabel('durianpy-website'),
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
