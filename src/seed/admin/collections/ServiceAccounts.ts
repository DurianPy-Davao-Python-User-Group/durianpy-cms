import { Payload, PayloadRequest } from 'payload'
import { COLLECTIONS } from '@/constants/collections'
import { PERMISSIONS } from '@/constants/permissions'
import { SIDEBAR_GROUPS } from '@/constants/sidebarGroup'

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
      permissions: [
        {
          resource: SIDEBAR_GROUPS.ADMIN,
          accessLevel: PERMISSIONS.FULL_ACCESS,
        },
      ],
      enableAPIKey: true,
    },
    {
      name: 'Integration Service',
      permissions: [
        {
          resource: SIDEBAR_GROUPS.DURIANPY_WEBSITE,
          accessLevel: PERMISSIONS.READ,
        },
      ],
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
