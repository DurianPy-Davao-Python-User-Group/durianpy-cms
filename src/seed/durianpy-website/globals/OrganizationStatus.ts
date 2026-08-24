import { Payload, PayloadRequest } from 'payload'
import { GLOBALS } from '@/constants/globals'
import { COLLECTIONS } from '@/constants/collections'

export async function seedOrganizationStatus({
  payload,
  req,
}: {
  payload: Payload
  req?: PayloadRequest
}) {
  const { docs: mediaDocs } = await payload.find({
    collection: COLLECTIONS.MEDIA,
    limit: 1,
    req,
  })
  const mediaId = mediaDocs[0]?.id

  await payload.updateGlobal({
    slug: GLOBALS.DURIANPY_WEBSITE_ORGANIZATION_STATUS,
    data: {
      isPSFPartner: true,
      psfPartnerLogo: mediaId,
      _status: 'published',
    },
    req,
  })
}
