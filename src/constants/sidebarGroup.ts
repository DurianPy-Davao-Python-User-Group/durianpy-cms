import { COLLECTION_LABELS, COLLECTIONS, CollectionSlug } from './collections'
import { DURIANPY_WEBSITE_ITEMS } from './durianpy'
import { GLOBALS, GlobalSlug } from './globals'

/**
 * The enum for collection groups. Collections are usually grouped by project/website.
 * This is used to group collections in the admin sidebar and for giving access to a collection group.
 */
export const SIDEBAR_GROUPS = {
  ADMIN: 'admin',
  DEFAULT: undefined, // Default puts the collection into the sidebar directly
  DURIANPY_WEBSITE: 'durianpy-website',
} as const

export type SidebarGroupSlug = Exclude<
  (typeof SIDEBAR_GROUPS)[keyof typeof SIDEBAR_GROUPS],
  undefined
>

export const SIDEBAR_GROUPS_LABEL: Record<SidebarGroupSlug, string> = {
  'durianpy-website': 'DurianPy Website',
  admin: 'Admin',
} as const

export function getSidebarGroupLabel(groupSlug: SidebarGroupSlug) {
  return SIDEBAR_GROUPS_LABEL[groupSlug]
}

export const SIDEBAR_GROUP_ITEMS: Record<SidebarGroupSlug, (GlobalSlug | CollectionSlug)[]> = {
  'durianpy-website': DURIANPY_WEBSITE_ITEMS,
  admin: [COLLECTIONS.USERS, COLLECTIONS.SERVICE_ACCOUNTS],
} as const

export function getSidebarGroupItems(groupSlug: SidebarGroupSlug) {
  return SIDEBAR_GROUP_ITEMS[groupSlug]
}

export type PermissionOption = {
  slug: CollectionSlug | SidebarGroupSlug | GlobalSlug
  label: string
}
