import { Payload, PayloadRequest } from 'payload'

export async function seedCategories({ payload, req }: { payload: Payload; req?: PayloadRequest }) {
  const categories = ['Technology', 'News', 'Finance', 'Design', 'Software', 'Engineering']

  const docs = await Promise.all(
    categories.map((category) =>
      payload.create({
        collection: 'categories',
        data: {
          title: category,
          slug: category,
        },
        req,
      }),
    ),
  )

  return docs
}
