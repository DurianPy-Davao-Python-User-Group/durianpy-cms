import { anyone } from '@/access/anyone'
import { checkResourceAccess } from '@/access/checkResourceAccess'
import { AccessType } from '@/constants/accessTypes'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  StrikethroughFeature,
} from '@payloadcms/richtext-lexical'
import { GLOBALS, GLOBAL_LABELS } from '@/constants/globals'
import type { AccessArgs, GlobalConfig } from 'payload'
import { getSidebarGroupLabel, SIDEBAR_GROUPS } from '@/constants/sidebarGroup'

const checkCodeOfConductAccess = (accessType?: AccessType) => (access: AccessArgs) =>
  checkResourceAccess(access, GLOBALS.DURIANPY_WEBSITE_CODE_OF_CONDUCT, accessType)

export const CodeOfConduct: GlobalConfig = {
  slug: GLOBALS.DURIANPY_WEBSITE_CODE_OF_CONDUCT,
  label: GLOBAL_LABELS[GLOBALS.DURIANPY_WEBSITE_CODE_OF_CONDUCT],

  access: {
    read: anyone,
    update: checkCodeOfConductAccess('update'),
  },
  admin: {
    group: getSidebarGroupLabel(SIDEBAR_GROUPS.DURIANPY_WEBSITE),
  },

  versions: {
    drafts: true,
  },

  fields: [
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures, rootFeatures }) => {
          return [
            ...defaultFeatures,
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            StrikethroughFeature(),
          ]
        },
      }),
      required: true,
    },
    {
      name: 'reportFormUrl',
      type: 'text',
      required: true,
      admin: {
        description: 'URL for the Google Form to report violations',
      },
    },
  ],
}
