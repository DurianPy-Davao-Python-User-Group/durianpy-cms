import { Payload, PayloadRequest } from 'payload'
import { GLOBALS } from '@/constants/globals'

export async function seedCodeOfConduct({
  payload,
  req,
}: {
  payload: Payload
  req?: PayloadRequest
}) {
  await payload.updateGlobal({
    slug: GLOBALS.DURIANPY_WEBSITE_CODE_OF_CONDUCT,
    data: {
      reportFormUrl: 'https://forms.gle/example',
      content: {
        root: {
          type: 'root',
          format: '',
          indent: 0,
          version: 1,
          children: [
            {
              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  mode: 'normal',
                  text: 'DurianPy is dedicated to providing a harassment-free community experience for everyone.',
                  type: 'text',
                  style: '',
                  detail: 0,
                  format: 0,
                  version: 1,
                },
              ],
            },
          ],
        },
      },
      _status: 'published',
    },
  })
}
