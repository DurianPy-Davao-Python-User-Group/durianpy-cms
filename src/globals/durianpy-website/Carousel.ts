import { anyAdmin } from '@/access/anyAdmin'
import { createGlobalAccess, checkResourceAccess } from '@/access/checkResourceAccess'
import { GLOBALS, GLOBAL_LABELS } from '@/constants/globals'
import { getSidebarGroupLabel, SIDEBAR_GROUPS } from '@/constants/sidebarGroup'
import type { User } from '@/payload-types'
import type { AccessArgs, GlobalConfig } from 'payload'

const adminAccess = (access: AccessArgs<User>) =>
  Boolean(
    checkResourceAccess(access, GLOBALS.DURIANPY_WEBSITE_CAROUSEL, 'admin') && anyAdmin(access),
  )

export const Carousel: GlobalConfig = {
  slug: GLOBALS.DURIANPY_WEBSITE_CAROUSEL,
  label: GLOBAL_LABELS[GLOBALS.DURIANPY_WEBSITE_CAROUSEL],
  access: {
    ...createGlobalAccess(GLOBALS.DURIANPY_WEBSITE_CAROUSEL, true),
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
