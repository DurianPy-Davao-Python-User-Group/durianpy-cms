/*
 * This file defines constants for collection names used in the CMS
 * To be used for selecting collections access for users and for referencing collections
 * in code to avoid hardcoding strings throughout the codebase
 */

/**
 * The enum for collection slugs
 */
export const COLLECTIONS = {
  CATEGORIES: 'categories',
  MEDIA: 'media',
  USERS: 'users',
  SAMPLE: 'sample',
} as const

export type CollectionSlug = (typeof COLLECTIONS)[keyof typeof COLLECTIONS]

export const COLLECTION_LABELS: Record<CollectionSlug, { singular: string; plural: string }> = {
  [COLLECTIONS.SAMPLE]: { singular: 'Sample', plural: 'Samples' },
  [COLLECTIONS.CATEGORIES]: { singular: 'Category', plural: 'Categories' },
  [COLLECTIONS.MEDIA]: { singular: 'Media Item', plural: 'Media' },
  [COLLECTIONS.USERS]: { singular: 'User', plural: 'Users' },
}

/**
 * The enum for collection groups. Collections are usually grouped by project/website.
 * This is used to group collections in the admin sidebar and for giving access to a collection group.
 */
export const COLLECTION_GROUPS = {
  ADMIN: 'admin',
  DEFAULT: undefined, // Default puts the collection into the sidebar directly
  DURIANPY_WEBSITE: 'durianpy-website',
} as const

export type CollectionGroupSlug = Exclude<
  (typeof COLLECTION_GROUPS)[keyof typeof COLLECTION_GROUPS],
  undefined
>

export const COLLECTION_GROUPS_LABEL: Record<CollectionGroupSlug, string> = {
  'durianpy-website': 'DurianPy Website',
  admin: 'Admin',
} as const

export function getCollectionGroupLabel(groupSlug: CollectionGroupSlug) {
  return COLLECTION_GROUPS_LABEL[groupSlug]
}

export const COLLECTION_GROUP_ITEMS: Record<CollectionGroupSlug, string[]> = {
  'durianpy-website': ['sample', 'organization-status'],
  admin: ['users'],
} as const

export function getCollectionGroupItems(groupSlug: CollectionGroupSlug) {
  return COLLECTION_GROUP_ITEMS[groupSlug]
}

export type PermissionOption = {
  slug: CollectionSlug | CollectionGroupSlug
  label: string
}

export const COLLECTION_FOR_PERMISSION_OPTIONS: PermissionOption[] = [
  ...Object.values(COLLECTION_GROUPS)
    .filter((x) => x !== undefined)
    .map((x) => ({
      slug: x,
      label: COLLECTION_GROUPS_LABEL[x],
    })),
  ...Object.values(COLLECTIONS).map((x) => ({
    slug: x,
    label: COLLECTION_LABELS[x].plural,
  })),
] as const

export function getCollectionSlugType(slug: CollectionSlug | CollectionGroupSlug) {
  if (Object.values(COLLECTION_GROUPS).includes(slug as CollectionGroupSlug)) {
    return 'group'
  } else if (Object.values(COLLECTIONS).includes(slug as CollectionSlug)) {
    return 'collection'
  } else {
    return
  }
}
