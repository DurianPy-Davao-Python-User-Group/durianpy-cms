import { anyAdmin } from '@/access/anyAdmin'
import { checkResourceAccess } from '@/access/checkResourceAccess'
import { AccessType } from '@/constants/accessTypes'
import { GLOBALS, GLOBAL_LABELS } from '@/constants/globals'
import { getSidebarGroupLabel, SIDEBAR_GROUPS } from '@/constants/sidebarGroup'
import type { User } from '@/payload-types'
import type { AccessArgs, GlobalConfig } from 'payload'

const checkCarouselAccess = (accessType?: AccessType) => (access: AccessArgs) =>
  checkResourceAccess(access, GLOBALS.DURIANPY_WEBSITE_CAROUSEL, accessType)

const adminAccess = (access: AccessArgs<User>) =>
  Boolean(checkCarouselAccess('admin')(access) && anyAdmin(access))

export const Carousel: GlobalConfig = {
  slug: GLOBALS.DURIANPY_WEBSITE_CAROUSEL,
  label: GLOBAL_LABELS[GLOBALS.DURIANPY_WEBSITE_CAROUSEL],
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
    group: getSidebarGroupLabel(SIDEBAR_GROUPS.DURIANPY_WEBSITE),
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
