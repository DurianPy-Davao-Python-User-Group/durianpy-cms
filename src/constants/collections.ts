/*
 * This file defines constants for collection names used in the CMS
 * To be used for selecting collections access for users and for referencing collections
 * in code to avoid hardcoding strings throughout the codebase
 */

export const COLLECTIONS = {
  PAGES: 'pages',
  POSTS: 'posts',
  CATEGORIES: 'categories',
  MEDIA: 'media',
  USERS: 'users',
} as const

export type CollectionSlug = (typeof COLLECTIONS)[keyof typeof COLLECTIONS]

export const COLLECTION_LABELS: Record<CollectionSlug, { singular: string; plural: string }> = {
  [COLLECTIONS.PAGES]: { singular: 'Page', plural: 'Pages' },
  [COLLECTIONS.POSTS]: { singular: 'Post', plural: 'Posts' },
  [COLLECTIONS.CATEGORIES]: { singular: 'Category', plural: 'Categories' },
  [COLLECTIONS.MEDIA]: { singular: 'Media Item', plural: 'Media' },
  [COLLECTIONS.USERS]: { singular: 'User', plural: 'Users' },
}
