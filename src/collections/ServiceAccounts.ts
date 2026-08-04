import type { CollectionConfig } from 'payload'
import { anyAdmin } from '@/access/anyAdmin'
import { USER_ROLE_LABELS, USER_ROLES } from '@/constants/userRoles'
import {
  COLLECTIONS,
  COLLECTION_FOR_PERMISSION_OPTIONS,
  COLLECTION_GROUPS,
  COLLECTION_LABELS,
  getCollectionGroupLabel,
} from '@/constants/collections'
import {
  COLLECTION_PERMISSION_LABELS,
  COLLECTION_PERMISSIONS,
} from '@/constants/collectionPermissions'
import { adminOrSelf } from '@/access/adminOrSelf'

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
    group: getCollectionGroupLabel(COLLECTION_GROUPS.ADMIN),
  },
  auth: {
    useAPIKey: true,
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
      name: 'allowedCollections',
      type: 'array',
      access: {
        create: ({ req }) => anyAdmin({ req }),
        update: ({ req }) => anyAdmin({ req }),
      },
      fields: [
        {
          name: 'collectionOrGroupSlug',
          type: 'select',
          hasMany: false,
          required: true,
          options: COLLECTION_FOR_PERMISSION_OPTIONS.map(({ slug, label }) => ({
            value: slug,
            label,
          })),
        },
        {
          name: 'permissions',
          type: 'radio',
          required: true,
          options: Object.values(COLLECTION_PERMISSIONS).map((permission) => ({
            value: permission,
            label: COLLECTION_PERMISSION_LABELS[permission],
          })),
        },
      ],
    },
  ],
  timestamps: true,
}
