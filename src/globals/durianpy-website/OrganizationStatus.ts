import { createGlobalAccess } from '@/access/checkResourceAccess'
import { GLOBALS, GLOBAL_LABELS } from '@/constants/globals'
import { getSidebarGroupLabel, SIDEBAR_GROUPS } from '@/constants/sidebarGroup'
import type { GlobalConfig } from 'payload'

export const OrganizationStatus: GlobalConfig = {
  slug: GLOBALS.DURIANPY_WEBSITE_ORGANIZATION_STATUS,
  label: GLOBAL_LABELS[GLOBALS.DURIANPY_WEBSITE_ORGANIZATION_STATUS],

  admin: {
    group: getSidebarGroupLabel(SIDEBAR_GROUPS.DURIANPY_WEBSITE),
  },

  access: createGlobalAccess(GLOBALS.DURIANPY_WEBSITE_ORGANIZATION_STATUS, true),

  versions: {
    drafts: {
      autosave: {
        showSaveDraftButton: true,
      },
      schedulePublish: true,
    },
    max: 50,
  },

  fields: [
    {
      name: 'isPSFPartner',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Toggle visibility of the PSF banner',
      },
    },
    {
      name: 'psfPartnerLogo',
      type: 'upload',
      relationTo: 'media',
      validate: (value: unknown, { siblingData }: { siblingData?: Record<string, unknown> }) => {
        if (siblingData?.isPSFPartner && !value) {
          return 'PSF Partner Logo is required when PSF Partner is enabled.'
        }
        return true
      },
    },
  ],
}
