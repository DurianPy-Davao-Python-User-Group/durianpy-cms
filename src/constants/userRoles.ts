export const USER_ROLES = {
  SUPER_ADMIN: 'super-admin',
  ADMIN: 'admin',
  WRITER: 'writer',
  READER: 'reader',
} as const

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES]

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  [USER_ROLES.SUPER_ADMIN]: 'Super Admin',
  [USER_ROLES.ADMIN]: 'Admin',
  [USER_ROLES.WRITER]: 'Writer',
  [USER_ROLES.READER]: 'Reader',
}
