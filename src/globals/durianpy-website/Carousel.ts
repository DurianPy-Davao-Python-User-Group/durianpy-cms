import { anyAdmin } from '@/access/anyAdmin'
import { checkCollectionAccess } from '@/access/checkCollectionAccess'
import { AccessType } from '@/constants/accessTypes'
import { getCollectionGroupLabel } from '@/constants/collections'
import { GLOBALS, GLOBAL_LABELS } from '@/constants/globals'
import type { User } from '@/payload-types'
import type { AccessArgs, GlobalConfig } from 'payload'

const checkCarouselAccess = (accessType?: AccessType) => (access: AccessArgs) =>
  checkCollectionAccess(access, GLOBALS.DURIANPY_WEBSITE_CAROUSEL, accessType)

const adminAccess = (access: AccessArgs<User>) =>
  Boolean(checkCarouselAccess('admin')(access) && anyAdmin(access))

export const Carousel: GlobalConfig = {
  slug: GLOBALS.DURIANPY_WEBSITE_CAROUSEL,
  label: GLOBAL_LABELS[GLOBALS.DURIANPY_WEBSITE_CAROUSEL].singular,
  access: {
    read: (access) => {
      if (adminAccess(access)) {
        return true
      }

      return {
        _status: {
          equals: 'published',
        },
      }
    },
    readVersions: adminAccess,
    update: adminAccess,
  },
  admin: {
    group: getCollectionGroupLabel('durianpy-website'),
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      required: true,
    },
    {
      name: 'photos',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
