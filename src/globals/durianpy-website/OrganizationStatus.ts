import { anyone } from '@/access/anyone'
import { checkCollectionAccess } from '@/access/checkCollectionAccess'
import { AccessType } from '@/constants/accessTypes'
import { getCollectionGroupLabel } from '@/constants/collections'
import { GLOBALS, GLOBAL_LABELS } from '@/constants/globals'
import type { AccessArgs, GlobalConfig } from 'payload'

const checkOrganizationStatusAccess = (accessType?: AccessType) => (access: AccessArgs) =>
  checkCollectionAccess(access, GLOBALS.DURIANPY_WEBSITE_ORGANIZATION_STATUS, accessType)

export const OrganizationStatus: GlobalConfig = {
  slug: GLOBALS.DURIANPY_WEBSITE_ORGANIZATION_STATUS,
  label: GLOBAL_LABELS[GLOBALS.DURIANPY_WEBSITE_ORGANIZATION_STATUS].singular,

  admin: {
    group: getCollectionGroupLabel('durianpy-website'),
  },

  access: {
    read: (access: AccessArgs) => {
      if (access.req?.draft) {
        return checkOrganizationStatusAccess('read')(access)
      }
      return anyone(access)
    },
    readVersions: checkOrganizationStatusAccess('read'),
    update: checkOrganizationStatusAccess('update'),
  },

  versions: {
    drafts: {
      autosave: {
        showSaveDraftButton: true,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
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
      validate: (value: unknown, { siblingData }: any) => {
        if (siblingData?.isPSFPartner && !value) {
          return 'PSF Partner Logo is required when PSF Partner is enabled.'
        }
        return true
      },
    },
  ],
}
