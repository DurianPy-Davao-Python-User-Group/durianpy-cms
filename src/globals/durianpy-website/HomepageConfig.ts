import { GlobalConfig } from 'payload'
import { createGlobalAccess } from '@/access/checkResourceAccess'
import { GLOBALS, GLOBAL_LABELS } from '@/constants/globals'
import { getSidebarGroupLabel, SIDEBAR_GROUPS } from '@/constants/sidebarGroup'

export const HomepageConfig: GlobalConfig = {
  slug: GLOBALS.DURIANPY_WEBSITE_HOMEPAGE_CONFIG,
  label: GLOBAL_LABELS[GLOBALS.DURIANPY_WEBSITE_HOMEPAGE_CONFIG],
  admin: {
    group: getSidebarGroupLabel(SIDEBAR_GROUPS.DURIANPY_WEBSITE),
  },
  versions: {
    drafts: true,
  },
  access: createGlobalAccess(GLOBALS.DURIANPY_WEBSITE_HOMEPAGE_CONFIG, true),

  fields: [
    {
      name: 'heroImageDesktop',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Hero Image (Desktop)',
    },
    {
      name: 'heroImageMobile',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Hero Image (Mobile)',
    },
    {
      name: 'heroTitle',
      type: 'text',
      label: 'Hero Title',
    },
    {
      name: 'heroSubtitle',
      type: 'text',
      label: 'Hero Subtitle',
    },
  ],
}
