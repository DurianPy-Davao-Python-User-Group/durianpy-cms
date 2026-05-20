import { Payload } from 'payload'
import { home } from '../../endpoints/seed/home'
import { contact as contactPageData } from '../../endpoints/seed/contact-page'

export async function seedPages({
  payload,
  imageHomeDoc,
  image2Doc,
  contactForm,
}: {
  payload: Payload
  imageHomeDoc: any
  image2Doc: any
  contactForm: any
}) {
  payload.logger.info(`— Seeding pages...`)

  const homePage = await payload.create({
    collection: 'pages',
    depth: 0,
    data: home({ heroImage: imageHomeDoc, metaImage: image2Doc }),
  })

  const contactPage = await payload.create({
    collection: 'pages',
    depth: 0,
    data: contactPageData({ contactForm: contactForm }),
  })

  return { homePage, contactPage }
}
