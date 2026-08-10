import { ACCESS_TYPES, AccessType } from './accessTypes'
import { COLLECTIONS, COLLECTION_LABELS } from './collections'
import { GLOBAL_LABELS, GLOBALS } from './globals'
import { PermissionOption, SIDEBAR_GROUPS, SIDEBAR_GROUPS_LABEL } from './sidebarGroup'

export const PERMISSIONS = {
  READ: 'read',
  READ_WRITE: 'read-write',
  FULL_ACCESS: 'full-access',
} as const

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS]

export const PERMISSION_LABELS: Record<Permission, string> = {
  [PERMISSIONS.READ]: 'Read',
  [PERMISSIONS.READ_WRITE]: 'Read & Write',
  [PERMISSIONS.FULL_ACCESS]: 'Full Access',
}

export const PERMISSION_TO_ACCESS_TYPES: Record<Permission, AccessType[]> = {
  [PERMISSIONS.READ]: [ACCESS_TYPES.READ],
  [PERMISSIONS.READ_WRITE]: [ACCESS_TYPES.READ, ACCESS_TYPES.CREATE, ACCESS_TYPES.UPDATE],
  [PERMISSIONS.FULL_ACCESS]: [
    ACCESS_TYPES.ADMIN,
    ACCESS_TYPES.CREATE,
    ACCESS_TYPES.DELETE,
    ACCESS_TYPES.READ,
    ACCESS_TYPES.UPDATE,
  ],
}

export const PERMISSION_RESOURCE_OPTIONS: PermissionOption[] = [
  ...Object.values(SIDEBAR_GROUPS)
    .filter((x) => x !== undefined)
    .map((x) => ({
      slug: x,
      label: SIDEBAR_GROUPS_LABEL[x],
    })),
  ...Object.values(GLOBALS).map((x) => ({
    slug: x,
    label: GLOBAL_LABELS[x],
  })),
  ...Object.values(COLLECTIONS).map((x) => ({
    slug: x,
    label: COLLECTION_LABELS[x].plural,
  })),
] as const
