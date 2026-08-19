import { USER_ROLES } from '@/constants/userRoles'
import type { Access } from 'payload'

export const adminOrSelf: Access = ({ req: { user } }) => {
  if (!user) return false
  if ('role' in user && user.role) {
    if (user.role.includes(USER_ROLES.ADMIN) || user.role.includes(USER_ROLES.SUPER_ADMIN)) {
      return true
    }
  }
  return { id: { equals: user.id } }
}
