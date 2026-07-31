import { GlobalConfig, AccessArgs } from 'payload'
import { checkCollectionAccess } from '@/access/checkCollectionAccess'
import { getCollectionGroupLabel } from '@/constants/collections'
import { GLOBALS, GLOBAL_LABELS } from '@/constants/globals'

type AccessType = 'create' | 'read' | 'update' | 'delete'

const checkHomepageConfigAccess = (accessType?: AccessType) => (access: AccessArgs) =>
  checkCollectionAccess(access, GLOBALS.DURIANPY_WEBSITE_HOMEPAGE_CONFIG as any, accessType)

export const HomepageConfig: GlobalConfig = {
  slug: GLOBALS.DURIANPY_WEBSITE_HOMEPAGE_CONFIG,
  label: GLOBAL_LABELS[GLOBALS.DURIANPY_WEBSITE_HOMEPAGE_CONFIG].singular,
  admin: {
    group: getCollectionGroupLabel('durianpy-website'),
  },
  versions: {
    drafts: true,
  },
  access: {
    read: () => true,
    update: checkHomepageConfigAccess('update'),
  },

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
