import { Payload } from 'payload'
import { contactForm as contactFormData } from '../../endpoints/seed/contact-form'

export async function seedForms({ payload }: { payload: Payload }) {
  payload.logger.info(`— Seeding contact form...`)

  const contactForm = await payload.create({
    collection: 'forms',
    depth: 0,
    data: contactFormData,
  })

  return contactForm
}
