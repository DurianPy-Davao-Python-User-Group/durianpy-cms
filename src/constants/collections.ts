/*
 * This file defines constants for collection names used in the CMS
 * To be used for selecting collections access for users and for referencing collections
 * in code to avoid hardcoding strings throughout the codebase
 */

import { DURIANPY_WEBSITE_COLLECTIONS, DURIANPY_WEBSITE_COLLECTIONS_LABELS } from './durianpy'

/**
 * The enum for collection slugs
 */
export const COLLECTIONS = {
  CATEGORIES: 'categories',
  MEDIA: 'media',
  USERS: 'users',
  SAMPLE: 'sample',
  SERVICE_ACCOUNTS: 'service-accounts',
  ...DURIANPY_WEBSITE_COLLECTIONS,
} as const

export type CollectionSlug = (typeof COLLECTIONS)[keyof typeof COLLECTIONS]

export const COLLECTION_LABELS: Record<CollectionSlug, { singular: string; plural: string }> = {
  [COLLECTIONS.SAMPLE]: { singular: 'Sample', plural: 'Samples' },
  [COLLECTIONS.CATEGORIES]: { singular: 'Category', plural: 'Categories' },
  [COLLECTIONS.MEDIA]: { singular: 'Media Item', plural: 'Media' },
  [COLLECTIONS.USERS]: { singular: 'User', plural: 'Users' },
  [COLLECTIONS.SERVICE_ACCOUNTS]: { singular: 'Service Account', plural: 'Service Accounts' },
  ...DURIANPY_WEBSITE_COLLECTIONS_LABELS,
}
