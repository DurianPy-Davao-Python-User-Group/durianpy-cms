import { describe, it, expect, vi, beforeEach } from 'vitest'
import { checkResourceAccess, checkReadAccess } from '@/access/checkResourceAccess'
import { anyAdmin } from '@/access/anyAdmin'
import { ACCESS_TYPES } from '@/constants/accessTypes'
import { PERMISSIONS } from '@/constants/permissions'
import { COLLECTIONS } from '@/constants/collections'
import { GLOBALS } from '@/constants/globals'
import { SIDEBAR_GROUPS } from '@/constants/sidebarGroup'
import type { AccessArgs } from 'payload'
import type { User } from '@/payload-types'

// Mock the anyAdmin utility
vi.mock('@/access/anyAdmin', () => ({
  anyAdmin: vi.fn(),
}))

describe('checkResourceAccess', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return false if req.user is undefined', () => {
    const args = { req: {} } as AccessArgs<User>
    expect(checkResourceAccess(args, COLLECTIONS.USERS, ACCESS_TYPES.READ)).toBe(false)
  })

  it('should return true if user is anyAdmin', () => {
    vi.mocked(anyAdmin).mockReturnValue(true)
    const args = { req: { user: { id: 1 } } } as unknown as AccessArgs<User>
    expect(checkResourceAccess(args, COLLECTIONS.USERS, ACCESS_TYPES.READ)).toBe(true)
  })

  it('should return false if user has no permissions', () => {
    vi.mocked(anyAdmin).mockReturnValue(false)
    const args = { req: { user: { id: 1 } } } as unknown as AccessArgs<User>
    expect(checkResourceAccess(args, COLLECTIONS.USERS, ACCESS_TYPES.READ)).toBe(false)
  })

  it('should return false if accessType is not provided', () => {
    vi.mocked(anyAdmin).mockReturnValue(false)
    const args = {
      req: {
        user: {
          id: 1,
          permissions: [{ resource: COLLECTIONS.USERS, accessLevel: PERMISSIONS.READ }],
        },
      },
    } as unknown as AccessArgs<User>
    expect(checkResourceAccess(args, COLLECTIONS.USERS)).toBe(false)
  })

  describe('slugType === group', () => {
    it('should return true if group contains the resource and access level grants the access type', () => {
      vi.mocked(anyAdmin).mockReturnValue(false)
      const args = {
        req: {
          user: {
            id: 1,
            permissions: [{ resource: SIDEBAR_GROUPS.ADMIN, accessLevel: PERMISSIONS.READ_WRITE }],
          },
        },
      } as unknown as AccessArgs<User>
      // USERS is in SIDEBAR_GROUPS.ADMIN
      expect(checkResourceAccess(args, COLLECTIONS.USERS, ACCESS_TYPES.CREATE)).toBe(true)
      expect(checkResourceAccess(args, COLLECTIONS.USERS, ACCESS_TYPES.UPDATE)).toBe(true)
      expect(checkResourceAccess(args, COLLECTIONS.USERS, ACCESS_TYPES.READ)).toBe(true)
    })

    it('should return true if group contains the global resource and access level grants the access type', () => {
      vi.mocked(anyAdmin).mockReturnValue(false)
      const args = {
        req: {
          user: {
            id: 1,
            permissions: [
              { resource: SIDEBAR_GROUPS.DURIANPY_WEBSITE, accessLevel: PERMISSIONS.READ_WRITE },
            ],
          },
        },
      } as unknown as AccessArgs<User>
      // DURIANPY_WEBSITE_HOMEPAGE_CONFIG is in SIDEBAR_GROUPS.DURIANPY_WEBSITE
      expect(
        checkResourceAccess(args, GLOBALS.DURIANPY_WEBSITE_HOMEPAGE_CONFIG, ACCESS_TYPES.CREATE),
      ).toBe(true)
      expect(
        checkResourceAccess(args, GLOBALS.DURIANPY_WEBSITE_HOMEPAGE_CONFIG, ACCESS_TYPES.UPDATE),
      ).toBe(true)
      expect(
        checkResourceAccess(args, GLOBALS.DURIANPY_WEBSITE_HOMEPAGE_CONFIG, ACCESS_TYPES.READ),
      ).toBe(true)
    })

    it('should return false if group contains the resource but access level does not grant the access type', () => {
      vi.mocked(anyAdmin).mockReturnValue(false)
      const args = {
        req: {
          user: {
            id: 1,
            permissions: [{ resource: SIDEBAR_GROUPS.ADMIN, accessLevel: PERMISSIONS.READ }],
          },
        },
      } as unknown as AccessArgs<User>
      // USERS is in SIDEBAR_GROUPS.ADMIN but only READ is granted
      expect(checkResourceAccess(args, COLLECTIONS.USERS, ACCESS_TYPES.CREATE)).toBe(false)
    })

    it('should return false if group does not contain the resource', () => {
      vi.mocked(anyAdmin).mockReturnValue(false)
      const args = {
        req: {
          user: {
            id: 1,
            permissions: [
              { resource: SIDEBAR_GROUPS.DURIANPY_WEBSITE, accessLevel: PERMISSIONS.FULL_ACCESS },
            ],
          },
        },
      } as unknown as AccessArgs<User>
      // USERS is NOT in SIDEBAR_GROUPS.DURIANPY_WEBSITE
      expect(checkResourceAccess(args, COLLECTIONS.USERS, ACCESS_TYPES.READ)).toBe(false)
    })

    it('should return false if group does not contain the global resource', () => {
      vi.mocked(anyAdmin).mockReturnValue(false)
      const args = {
        req: {
          user: {
            id: 1,
            permissions: [{ resource: SIDEBAR_GROUPS.ADMIN, accessLevel: PERMISSIONS.FULL_ACCESS }],
          },
        },
      } as unknown as AccessArgs<User>
      // DURIANPY_WEBSITE_HOMEPAGE_CONFIG is NOT in SIDEBAR_GROUPS.ADMIN
      expect(
        checkResourceAccess(args, GLOBALS.DURIANPY_WEBSITE_HOMEPAGE_CONFIG, ACCESS_TYPES.READ),
      ).toBe(false)
    })
  })

  describe('slugType === collection / global', () => {
    it('should return true if collection resource matches exactly and access level grants the access type', () => {
      vi.mocked(anyAdmin).mockReturnValue(false)
      const args = {
        req: {
          user: {
            id: 1,
            permissions: [{ resource: COLLECTIONS.USERS, accessLevel: PERMISSIONS.READ }],
          },
        },
      } as unknown as AccessArgs<User>
      expect(checkResourceAccess(args, COLLECTIONS.USERS, ACCESS_TYPES.READ)).toBe(true)
    })

    it('should return true if global resource matches exactly and access level grants the access type', () => {
      vi.mocked(anyAdmin).mockReturnValue(false)
      const args = {
        req: {
          user: {
            id: 1,
            permissions: [
              { resource: GLOBALS.DURIANPY_WEBSITE_HOMEPAGE_CONFIG, accessLevel: PERMISSIONS.READ },
            ],
          },
        },
      } as unknown as AccessArgs<User>
      expect(
        checkResourceAccess(args, GLOBALS.DURIANPY_WEBSITE_HOMEPAGE_CONFIG, ACCESS_TYPES.READ),
      ).toBe(true)
    })

    it('should return false if resource matches exactly but access level does not grant the access type', () => {
      vi.mocked(anyAdmin).mockReturnValue(false)
      const args = {
        req: {
          user: {
            id: 1,
            permissions: [{ resource: COLLECTIONS.USERS, accessLevel: PERMISSIONS.READ }],
          },
        },
      } as unknown as AccessArgs<User>
      expect(checkResourceAccess(args, COLLECTIONS.USERS, ACCESS_TYPES.UPDATE)).toBe(false)
    })

    it('should return false if global resource matches exactly but access level does not grant the access type', () => {
      vi.mocked(anyAdmin).mockReturnValue(false)
      const args = {
        req: {
          user: {
            id: 1,
            permissions: [
              { resource: GLOBALS.DURIANPY_WEBSITE_HOMEPAGE_CONFIG, accessLevel: PERMISSIONS.READ },
            ],
          },
        },
      } as unknown as AccessArgs<User>
      expect(
        checkResourceAccess(args, GLOBALS.DURIANPY_WEBSITE_HOMEPAGE_CONFIG, ACCESS_TYPES.UPDATE),
      ).toBe(false)
    })

    it('should return false if resource does not match exactly', () => {
      vi.mocked(anyAdmin).mockReturnValue(false)
      const args = {
        req: {
          user: {
            id: 1,
            permissions: [{ resource: COLLECTIONS.MEDIA, accessLevel: PERMISSIONS.FULL_ACCESS }],
          },
        },
      } as unknown as AccessArgs<User>
      expect(checkResourceAccess(args, COLLECTIONS.USERS, ACCESS_TYPES.READ)).toBe(false)
    })
  })

  it('should return false if slugType is undefined or unhandled', () => {
    vi.mocked(anyAdmin).mockReturnValue(false)
    const args = {
      req: {
        user: {
          id: 1,
          permissions: [{ resource: 'invalid-resource', accessLevel: PERMISSIONS.FULL_ACCESS }],
        },
      },
    } as unknown as AccessArgs<User>
    expect(checkResourceAccess(args, COLLECTIONS.USERS, ACCESS_TYPES.READ)).toBe(false)
  })

  describe('checkReadAccess', () => {
    it('should return false if user has no read access', () => {
      vi.mocked(anyAdmin).mockReturnValue(false)
      const args = { req: { user: { id: 1, permissions: [] } } } as unknown as AccessArgs<User>
      expect(checkReadAccess(args, COLLECTIONS.USERS)).toBe(false)
    })

    it('should return true if user has read access and drafts are not enabled', () => {
      vi.mocked(anyAdmin).mockReturnValue(false)
      const args = {
        req: {
          user: {
            id: 1,
            permissions: [{ resource: COLLECTIONS.CATEGORIES, accessLevel: PERMISSIONS.READ }],
          },
        },
      } as unknown as AccessArgs<User>
      expect(checkReadAccess(args, COLLECTIONS.CATEGORIES, false)).toBe(true)
    })

    it('should return { _status: { equals: "published" } } if user has read but no update access, and drafts are enabled', () => {
      vi.mocked(anyAdmin).mockReturnValue(false)
      const args = {
        req: {
          user: {
            id: 1,
            permissions: [
              { resource: COLLECTIONS.DURIANPY_WEBSITE_EVENTS, accessLevel: PERMISSIONS.READ },
            ],
          },
        },
      } as unknown as AccessArgs<User>
      expect(checkReadAccess(args, COLLECTIONS.DURIANPY_WEBSITE_EVENTS, true)).toEqual({
        _status: { equals: 'published' },
      })
    })

    it('should return true if user has read and update access, and drafts are enabled', () => {
      vi.mocked(anyAdmin).mockReturnValue(false)
      const args = {
        req: {
          user: {
            id: 1,
            permissions: [
              {
                resource: COLLECTIONS.DURIANPY_WEBSITE_EVENTS,
                accessLevel: PERMISSIONS.READ_WRITE,
              },
            ],
          },
        },
      } as unknown as AccessArgs<User>
      expect(checkReadAccess(args, COLLECTIONS.DURIANPY_WEBSITE_EVENTS, true)).toBe(true)
    })
  })
})
