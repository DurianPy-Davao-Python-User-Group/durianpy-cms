import type { AccessArgs } from 'payload'

import type { User } from '@/payload-types'
import {
  getCollectionGroupItems,
  getCollectionSlugType,
  type CollectionGroupSlug,
  type CollectionSlug,
} from '@/constants/collections'
import { anyAdmin } from './anyAdmin'
import { AccessType } from '@/constants/accessTypes'
import { COLLECTION_PERMISSION_TO_ACCESS_TYPES } from '@/constants/collectionPermissions'

export function checkCollectionAccess(
  { req }: AccessArgs<User>,
  collectionSlug: CollectionSlug | string,
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

  if (allowedCollections.length === 0 || !accessType) {
    return false
  }

  return allowedCollections.some((assignment) => {
    const assignedSlug = assignment.collectionOrGroupSlug
    const slugType = getCollectionSlugType(assignedSlug)
    let isApplicable = false

    if (slugType === 'group') {
      const groupItems = getCollectionGroupItems(assignedSlug as CollectionGroupSlug)
      isApplicable = groupItems.includes(collectionSlug)
    } else if (slugType === 'collection') {
      isApplicable = assignedSlug === collectionSlug
    }

    if (isApplicable) {
      const grantedAccessTypes = COLLECTION_PERMISSION_TO_ACCESS_TYPES[assignment.permissions]
      return grantedAccessTypes.includes(accessType)
    }

    return false
  })
}
