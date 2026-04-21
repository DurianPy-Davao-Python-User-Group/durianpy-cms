import type { AccessArgs } from 'payload'

import type { User } from '@/payload-types'
import type { CollectionSlug } from '@/constants/collections'
import { anyAdmin } from './anyAdmin'
import { AccessType } from '@/constants/accessTypes'
import { COLLECTION_PERMISSION_TO_ACCESS_TYPES } from '@/constants/collectionPermissions'

export function checkCollectionAccess(
  { req }: AccessArgs<User>,
  collectionSlug: CollectionSlug,
  accessType?: AccessType,
) {
  const user = req.user

  if (!user) {
    return false
  }

  if (anyAdmin({ req })) {
    return true
  }

  const allowedCollections = user.allowedCollections || []

  if (allowedCollections.length === 0) {
    return false
  }

  const slugPermissions = allowedCollections.find((x) => x.collectionSlug === collectionSlug)

  if (!slugPermissions) {
    return false
  }

  if (accessType) {
    const access = slugPermissions.permissions
    const accessTypesForPermission = COLLECTION_PERMISSION_TO_ACCESS_TYPES[access]

    return accessTypesForPermission.includes(accessType)
  }

  return false
}
