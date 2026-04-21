import { USER_ROLES } from '@/constants/userRoles'
import type { Access } from 'payload'

export const adminOrSelf: Access = ({ req: { user } }) => {
  if (!user) return false
  return (
    user.role.includes(USER_ROLES.ADMIN) ||
    user.role.includes(USER_ROLES.SUPER_ADMIN) || { id: { equals: user.id } }
  )
}
