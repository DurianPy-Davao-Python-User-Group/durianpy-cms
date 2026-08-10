import { COLLECTIONS, CollectionSlug } from './collections'
import { GLOBALS, GlobalSlug } from './globals'
import { SidebarGroupSlug, SIDEBAR_GROUPS } from './sidebarGroup'

export const ACCESS_TYPES = {
  ADMIN: 'admin',
  CREATE: 'create',
  DELETE: 'delete',
  READ: 'read',
  UPDATE: 'update',
} as const

export type AccessType = (typeof ACCESS_TYPES)[keyof typeof ACCESS_TYPES]

export function getSlugType(slug: CollectionSlug | SidebarGroupSlug | GlobalSlug) {
  if (Object.values(SIDEBAR_GROUPS).includes(slug as SidebarGroupSlug)) {
    return 'group'
  } else if (
    [...Object.values(COLLECTIONS), ...Object.values(GLOBALS)].includes(
      slug as CollectionSlug | GlobalSlug,
    )
  ) {
    return 'collection'
  } else {
    return
  }
}
