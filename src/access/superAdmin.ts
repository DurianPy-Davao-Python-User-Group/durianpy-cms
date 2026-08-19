import type { AccessArgs } from 'payload'

import type { User } from '@/payload-types'

export const superAdmin = ({ req: { user } }: AccessArgs<User>) => {
  if (!user || !('role' in user) || !user.role) return false
  return Boolean(user.role.includes('super-admin'))
}
