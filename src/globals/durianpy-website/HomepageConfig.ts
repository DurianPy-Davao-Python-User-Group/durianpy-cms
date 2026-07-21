import { checkCollectionAccess } from '@/access/checkCollectionAccess'
import { getCollectionGroupLabel } from '@/constants/collections'
import { GlobalConfig } from 'payload'

// We will let VS Code import these automatically!
// 1. Click on getCollectionGroupLabel below, press Ctrl + . (or Cmd + .), and click "Update import" or "Add import"
// 2. Click on checkCollectionAccess below, press Ctrl + . (or Cmd + .), and click "Add import"

export const HomepageConfig: GlobalConfig = {
  slug: 'homepage-config',
  admin: {
    group: getCollectionGroupLabel('durianpy-website'),
  },
  access: {
    read: () => true,
    // We explicitly type args as 'any' to satisfy TS, and removed the invalid 'admin' access rule!
    update: (args: any) => checkCollectionAccess(args, 'homepage-config' as any, 'update'),
  },
  versions: {
    // Globals use 'max' instead of 'maxPerDoc'
    max: 50,
    drafts: {
      autosave: {
        showSaveDraftButton: true,
      },
      schedulePublish: true,
    },
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
