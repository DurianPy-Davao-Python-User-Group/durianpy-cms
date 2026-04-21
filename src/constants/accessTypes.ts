export const ACCESS_TYPES = {
  ADMIN: 'admin',
  CREATE: 'create',
  DELETE: 'delete',
  READ: 'read',
  UPDATE: 'update',
} as const

export type AccessType = (typeof ACCESS_TYPES)[keyof typeof ACCESS_TYPES]
