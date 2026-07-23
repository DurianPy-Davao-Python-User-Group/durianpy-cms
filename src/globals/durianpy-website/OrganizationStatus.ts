import type { AccessArgs, GlobalConfig } from 'payload'

import { checkCollectionAccess } from '@/access/checkCollectionAccess'
import { AccessType } from '@/constants/accessTypes'
import { getCollectionGroupLabel } from '@/constants/collections'

const checkOrganizationStatusAccess = (accessType?: AccessType) => (access: AccessArgs) =>
  checkCollectionAccess(access, 'organization-status', accessType)

export const OrganizationStatus: GlobalConfig = {
  slug: 'organization-status',
  access: {
    read: (access: AccessArgs) => {
      const isDraft =
        Boolean((access.req as { draft?: boolean }).draft) || access.req.query?.draft === 'true'
      if (isDraft) {
        return checkOrganizationStatusAccess('read')(access)
      }
      return true
    },
    update: checkOrganizationStatusAccess('update'),
  },
  admin: {
    group: getCollectionGroupLabel('durianpy-website'),
  },
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
      label: 'Is PSF Partner',
      defaultValue: false,
    },
    {
      name: 'psfPartnerLogo',
      type: 'upload',
      relationTo: 'media',
      label: 'PSF Partner Logo',
      admin: {
        condition: (data) => Boolean(data?.isPSFPartner),
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'Pending', value: 'pending' },
      ],
      defaultValue: 'active',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Status Message',
    },
  ],
}
