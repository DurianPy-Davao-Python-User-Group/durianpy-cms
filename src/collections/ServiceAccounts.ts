import type { CollectionConfig } from 'payload'
import { anyAdmin } from '@/access/anyAdmin'
import { USER_ROLE_LABELS, USER_ROLES } from '@/constants/userRoles'
import { COLLECTIONS, COLLECTION_LABELS } from '@/constants/collections'
import { adminOrSelf } from '@/access/adminOrSelf'
import { getSidebarGroupLabel, SIDEBAR_GROUPS } from '@/constants/sidebarGroup'
import {
  PERMISSION_LABELS,
  PERMISSION_RESOURCE_OPTIONS,
  PERMISSIONS,
} from '@/constants/permissions'

export const ServiceAccounts: CollectionConfig = {
  slug: COLLECTIONS.SERVICE_ACCOUNTS,
  labels: COLLECTION_LABELS[COLLECTIONS.SERVICE_ACCOUNTS],
  access: {
    admin: anyAdmin,
    create: anyAdmin,
    delete: anyAdmin,
    read: adminOrSelf,
    update: adminOrSelf,
  },
  admin: {
    defaultColumns: ['name', 'email', 'createdAt'],
    useAsTitle: 'name',
    hidden({ user }) {
      if (!user) return true
      return !user.role.includes(USER_ROLES.SUPER_ADMIN) && !user.role.includes(USER_ROLES.ADMIN)
    },
    group: getSidebarGroupLabel(SIDEBAR_GROUPS.ADMIN),
  },
  auth: {
    useAPIKey: true,
    disableLocalStrategy: true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Service Account Name',
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      saveToJWT: true,
      hasMany: true,
      access: {
        create: ({ req }) => anyAdmin({ req }),
        update: ({ req }) => anyAdmin({ req }),
      },
      options: Object.values(USER_ROLES).map((value) => ({
        value,
        label: USER_ROLE_LABELS[value],
      })),
    },
    {
      name: 'permissions',
      type: 'array',
      access: {
        create: ({ req }) => anyAdmin({ req }),
        update: ({ req }) => anyAdmin({ req }),
      },
      fields: [
        {
          name: 'resource',
          type: 'select',
          hasMany: false,
          required: true,
          options: PERMISSION_RESOURCE_OPTIONS.map(({ slug, label }) => ({
            value: slug,
            label,
          })),
        },
        {
          name: 'accessLevel',
          type: 'radio',
          required: true,
          options: Object.values(PERMISSIONS).map((permission) => ({
            value: permission,
            label: PERMISSION_LABELS[permission],
          })),
        },
      ],
    },
  ],
  timestamps: true,
}
