import { Payload, PayloadRequest } from 'payload'

export async function seedUsers({ payload, req }: { payload: Payload; req?: PayloadRequest }) {
  payload.logger.info(`— Seeding demo author and user...`)

  await payload.delete({
    collection: 'users',
    depth: 0,
    where: {
      email: {
        equals: 'demo-author@example.com',
      },
    },
  })

  const demoAuthor = await payload.create({
    collection: 'users',
    draft: false,
    data: {
      firstName: 'Demo',
      lastName: 'Author',
      email: 'demo-author@example.com',
      role: ['admin'],
      password: 'password',
    },
    req,
  })

  return demoAuthor
}
