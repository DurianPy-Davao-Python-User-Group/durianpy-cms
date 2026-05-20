import { Payload } from 'payload'

export async function seedCategories({ payload }: { payload: Payload }) {
  const categories = ['Technology', 'News', 'Finance', 'Design', 'Software', 'Engineering']
  
  const docs = await Promise.all(
    categories.map((category) =>
      payload.create({
        collection: 'categories',
        data: {
          title: category,
          slug: category,
        },
      }),
    ),
  )

  return docs
}
