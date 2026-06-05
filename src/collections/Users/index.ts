import type { CollectionConfig } from 'payload'
import { anyAdmin } from '@/access/anyAdmin'
import { USER_ROLE_LABELS, USER_ROLES } from '@/constants/userRoles'
import { COLLECTION_FOR_PERMISSION_OPTIONS, getCollectionGroupLabel } from '@/constants/collections'
import WelcomeEmail from '@/email/templates/WelcomeEmail'
import type { CollectionAfterChangeHook } from 'payload'
import type { User } from '@/payload-types'
import {
  COLLECTION_PERMISSION_LABELS,
  COLLECTION_PERMISSIONS,
} from '@/constants/collectionPermissions'
import { adminOrSelf } from '@/access/adminOrSelf'

const sendEmailOnUserCreate: CollectionAfterChangeHook<User> = ({ doc, operation, req }) => {
  if (operation === 'create') {
    const email = doc['email']
    const first_name = doc['firstName']

    req.payload.sendEmail({
      to: email,
      subject: 'Welcome to DurianPy CMS!',
      html: WelcomeEmail(first_name),
    })
  }
}

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'User',
    plural: 'Users',
  },
  access: {
    admin: ({ req: { user } }) => {
      const allowedRoles = Object.values(USER_ROLES)
      return Boolean(user && user.role.some((role) => allowedRoles.includes(role)))
    },
    create: anyAdmin,
    delete: anyAdmin,
    read: adminOrSelf,
    update: adminOrSelf,
  },
  hooks: {
    afterChange: [sendEmailOnUserCreate],
  },
  admin: {
    defaultColumns: ['email'],
    useAsTitle: 'email',
    hidden({ user }) {
      if (!user) return true
      return !user.role.includes(USER_ROLES.SUPER_ADMIN) && !user.role.includes(USER_ROLES.ADMIN)
    },
    group: getCollectionGroupLabel('durianpy-website'),
  },
  auth: {
    cookies: {
      secure: true,
      sameSite: 'None',
    },
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'firstName',
          type: 'text',
          required: true,
        },
        {
          name: 'lastName',
          type: 'text',
          required: true,
        },
      ],
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
