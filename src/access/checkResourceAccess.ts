import type { AccessArgs, Where, CollectionConfig, GlobalConfig } from 'payload'
import type { User } from '@/payload-types'
import { anyAdmin } from './anyAdmin'
import { AccessType, getSlugType } from '@/constants/accessTypes'
import { PERMISSION_TO_ACCESS_TYPES } from '@/constants/permissions'
import { GlobalSlug } from '@/constants/globals'
import { CollectionSlug } from '@/constants/collections'
import { getSidebarGroupItems, SidebarGroupSlug } from '@/constants/sidebarGroup'

export function checkResourceAccess(
  { req }: AccessArgs<User>,
  resourceSlug: CollectionSlug | SidebarGroupSlug | GlobalSlug,
  accessType?: AccessType,
) {
  const user = req.user

  if (!user) {
    return false
  }

  if (anyAdmin({ req })) {
    return true
  }

  const permissions = user.permissions || []

  if (permissions.length === 0 || !accessType) {
    return false
  }

  return permissions.some((assignment) => {
    const assignedSlug = assignment.resource
    const slugType = getSlugType(assignedSlug)
    let isApplicable = false

    if (slugType === 'group') {
      const groupItems = getSidebarGroupItems(assignedSlug as SidebarGroupSlug)
      isApplicable = groupItems.includes(resourceSlug as CollectionSlug)
    } else if (slugType === 'collection') {
      isApplicable = assignedSlug === resourceSlug
    }

    if (isApplicable) {
      const grantedAccessTypes = PERMISSION_TO_ACCESS_TYPES[assignment.accessLevel]
      return grantedAccessTypes.includes(accessType)
    }

    return false
  })
}

/**
 * Verifies read access for a resource and enforces draft visibility rules.
 * Service accounts can only access drafts if they are also granted write (update) access.
 */
export function checkReadAccess(
  accessArgs: AccessArgs<User>,
  resourceSlug: CollectionSlug | GlobalSlug,
  hasDrafts: boolean = false,
): boolean | Where {
  const hasRead = checkResourceAccess(accessArgs, resourceSlug, 'read')
  if (!hasRead) return false

  if (hasDrafts) {
    const hasUpdate = checkResourceAccess(accessArgs, resourceSlug, 'update')
    if (hasUpdate) return true
    return { _status: { equals: 'published' } }
  }

  return true
}

/**
 * Factory function to create standard access control methods for a Collection.
 */
export const createCollectionAccess = (
  resourceSlug: CollectionSlug,
  hasDrafts = false,
): CollectionConfig['access'] => ({
  admin: (access) => checkResourceAccess(access, resourceSlug, 'admin') as boolean,
  create: (access) => checkResourceAccess(access, resourceSlug, 'create') as boolean,
  delete: (access) => checkResourceAccess(access, resourceSlug, 'delete') as boolean,
  read: (access) => checkReadAccess(access, resourceSlug, hasDrafts),
  update: (access) => checkResourceAccess(access, resourceSlug, 'update') as boolean,
})

/**
 * Factory function to create standard access control methods for a Global.
 */
export const createGlobalAccess = (
  resourceSlug: GlobalSlug,
  hasDrafts = false,
): GlobalConfig['access'] => ({
  read: (access) => checkReadAccess(access, resourceSlug, hasDrafts),
  update: (access) => checkResourceAccess(access, resourceSlug, 'update') as boolean,
})
