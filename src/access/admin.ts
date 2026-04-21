import type { AccessArgs } from 'payload'

import type { User } from '@/payload-types'
import { USER_ROLES } from '@/constants/userRoles'

type isAuthenticated = (args: AccessArgs<User>) => boolean

export const admin: isAuthenticated = ({ req: { user } }) => {
  return Boolean(user && user.role.includes(USER_ROLES.ADMIN))
}
