import { admin } from './admin'
import { superAdmin } from './superAdmin'
import type { AccessArgs } from 'payload'
import type { User } from '@/payload-types'

export const anyAdmin = (args: AccessArgs<User>) => {
  return admin(args) || superAdmin(args)
}
