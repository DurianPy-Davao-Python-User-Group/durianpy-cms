import type { AccessArgs } from 'payload'
import type { User } from '@/payload-types'
import { anyAdmin } from './anyAdmin'
import { AccessType, getSlugType } from '@/constants/accessTypes'
import { PERMISSION_TO_ACCESS_TYPES } from '@/constants/permissions'
import { GlobalSlug } from '@/constants/globals'
import { CollectionSlug } from '@/constants/collections'
import { getSidebarGroupItems, SidebarGroupSlug } from '@/constants/sidebarGroup'

export function checkResourceAccess(
  { req }: AccessArgs<User>,
  resourceSlug: CollectionSlug | GlobalSlug,
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
