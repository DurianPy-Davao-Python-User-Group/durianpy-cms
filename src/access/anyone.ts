import type { Access } from 'payload'

export const anyone: Access = ({ req: { user, headers } }) => {
  if (user) {
    return true
  }
  const authorization = headers.get('authorization')
  if (
    process.env.DRAFT_SECRET_TOKEN &&
    authorization === `Bearer ${process.env.DRAFT_SECRET_TOKEN}`
  ) {
    return true
  }
  return {
    or: [{ _status: { equals: 'published' } }, { _status: { exists: false } }],
  }
}
