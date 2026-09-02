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
      reportFormUrl: 'https://forms.gle/R4MXsc2brwHEmgrE7',
      content: {
        root: {
          type: 'root',
          format: '',
          indent: 0,
          version: 1,
          direction: 'ltr',
          children: [
            {
              type: 'heading',
              tag: 'h1',
              format: '',
              indent: 0,
              version: 1,
              direction: 'ltr',
              children: [
                {
                  type: 'text',
                  text: 'Code of Conduct',
                  format: 0,
                  detail: 0,
                  mode: 'normal',
                  style: '',
                  version: 1,
                },
              ],
            },
            {
              type: 'heading',
              tag: 'h2',
              format: '',
              indent: 0,
              version: 1,
              direction: 'ltr',
              children: [
                {
                  type: 'text',
                  text: 'We value respect and inclusivity in all events.',
                  format: 0,
                  detail: 0,
                  mode: 'normal',
                  style: '',
                  version: 1,
                },
              ],
            },
            {
              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,
              direction: 'ltr',
              children: [
                {
                  type: 'text',
                  text: 'The Python community is made up of members from around the globe with a diverse set of skills, personalities, and experiences. It is through these differences that our community experiences great successes and continued growth.',
                  format: 0,
                  detail: 0,
                  mode: 'normal',
                  style: '',
                  version: 1,
                },
              ],
            },
            {
              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,
              direction: 'ltr',
              children: [
                {
                  type: 'text',
                  text: 'To clarify our expectations, all participants, including attendees, speakers, exhibitors, organizers, and volunteers at any DurianPy event, must adhere to the following ',
                  format: 0,
                  detail: 0,
                  mode: 'normal',
                  style: '',
                  version: 1,
                },
                {
                  type: 'link',
                  fields: {
                    linkType: 'custom',
                    url: 'https://policies.python.org/python.org/code-of-conduct/',
                    newTab: true,
                  },
                  format: '',
                  indent: 0,
                  version: 2,
                  direction: 'ltr',
                  children: [
                    {
                      type: 'text',
                      text: 'Code of Conduct',
                      format: 0,
                      detail: 0,
                      mode: 'normal',
                      style: '',
                      version: 1,
                    },
                  ],
                },
                {
                  type: 'text',
                  text: '.',
                  format: 0,
                  detail: 0,
                  mode: 'normal',
                  style: '',
                  version: 1,
                },
              ],
            },
            {
              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,
              direction: 'ltr',
              children: [
                {
                  type: 'text',
                  text: 'If you witness or experience any violations of the Code of Conduct, please report them using the ',
                  format: 0,
                  detail: 0,
                  mode: 'normal',
                  style: '',
                  version: 1,
                },
                {
                  type: 'link',
                  fields: {
                    linkType: 'custom',
                    url: 'https://forms.gle/R4MXsc2brwHEmgrE7',
                    newTab: true,
                  },
                  format: '',
                  indent: 0,
                  version: 2,
                  direction: 'ltr',
                  children: [
                    {
                      type: 'text',
                      text: 'Code of Conduct Report Form',
                      format: 0,
                      detail: 0,
                      mode: 'normal',
                      style: '',
                      version: 1,
                    },
                  ],
                },
                {
                  type: 'text',
                  text: '.',
                  format: 0,
                  detail: 0,
                  mode: 'normal',
                  style: '',
                  version: 1,
                },
              ],
            },
          ],
        },
      },
      _status: 'published',
    },
    req,
  })
}
