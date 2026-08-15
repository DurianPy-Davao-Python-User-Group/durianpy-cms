import { createGlobalAccess } from '@/access/checkResourceAccess'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  StrikethroughFeature,
} from '@payloadcms/richtext-lexical'
import { GLOBALS, GLOBAL_LABELS } from '@/constants/globals'
import type { GlobalConfig } from 'payload'
import { getSidebarGroupLabel, SIDEBAR_GROUPS } from '@/constants/sidebarGroup'

export const CodeOfConduct: GlobalConfig = {
  slug: GLOBALS.DURIANPY_WEBSITE_CODE_OF_CONDUCT,
  label: GLOBAL_LABELS[GLOBALS.DURIANPY_WEBSITE_CODE_OF_CONDUCT],

  access: createGlobalAccess(GLOBALS.DURIANPY_WEBSITE_CODE_OF_CONDUCT, true),
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
