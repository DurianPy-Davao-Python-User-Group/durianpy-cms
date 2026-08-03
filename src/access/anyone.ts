import type { Access } from 'payload'

export const anyone: Access = ({ req: { user, headers, query, routeParams, pathname } }) => {
  if (user) {
    return true
  }

  const authorization = headers.get('authorization')
  if (
    authorization &&
    process.env.DRAFT_SECRET_TOKEN &&
    authorization === `Bearer ${process.env.DRAFT_SECRET_TOKEN}`
  ) {
    return true
  }

  const isGlobalRequest =
    typeof routeParams?.global === 'string' ||
    (typeof pathname === 'string' && pathname.includes('/api/globals/'))

  // Global reads should return boolean access, not a where clause.
  if (isGlobalRequest) {
    const draftParam = query?.draft
    const isDraftRequested = draftParam === true || draftParam === 'true'
    return !isDraftRequested
  }

  return {
    or: [{ _status: { equals: 'published' } }, { _status: { exists: false } }],
  }
}
