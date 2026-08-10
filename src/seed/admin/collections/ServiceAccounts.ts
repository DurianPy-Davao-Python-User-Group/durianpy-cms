import { Payload, PayloadRequest } from 'payload'
import { COLLECTIONS } from '@/constants/collections'
import { USER_ROLES } from '@/constants/userRoles'

export async function seedServiceAccounts({
  payload,
  req,
}: {
  payload: Payload
  req?: PayloadRequest
}) {
  const serviceAccounts = [
    {
      name: 'GitHub Actions Bot',
      role: [USER_ROLES.SUPER_ADMIN],
      enableAPIKey: true,
    },
    {
      name: 'Integration Service',
      role: [USER_ROLES.ADMIN],
      enableAPIKey: true,
    },
  ]

  const docs = await Promise.all(
    serviceAccounts.map((account) =>
      payload.create({
        collection: COLLECTIONS.SERVICE_ACCOUNTS,
        data: account,
        req,
      }),
    ),
  )

  return docs
}
