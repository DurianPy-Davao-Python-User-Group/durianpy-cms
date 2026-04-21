import type { AccessArgs } from 'payload'

import type { User } from '@/payload-types'

export const superAdmin = ({ req: { user } }: AccessArgs<User>) => {
  return Boolean(user && user.role.includes('super-admin'))
}
