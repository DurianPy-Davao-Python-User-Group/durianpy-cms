import { Payload, PayloadRequest } from 'payload'
import { GLOBALS } from '@/constants/globals'

export async function seedStatisticsConfig({
  payload,
  req,
}: {
  payload: Payload
  req?: PayloadRequest
}) {
  await payload.updateGlobal({
    slug: GLOBALS.DURIANPY_WEBSITE_STATISTICS_CONFIG,
    data: {
      metrics: [
        { label: 'Active Members', value: 350, large: true },
        { label: 'Events Hosted', value: 24, large: false },
        { label: 'Sponsors', value: 10, large: false },
      ],
      _status: 'published',
    },
  })
}
