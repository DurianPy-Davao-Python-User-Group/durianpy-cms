import { Payload, PayloadRequest } from 'payload'

export async function seedSample({ payload, req }: { payload: Payload; req?: PayloadRequest }) {
  const samples = [
    {
      firstName: 'John',
      lastName: 'Doe',
      _status: 'published',
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      _status: 'published',
    },
  ] as const

  const docs = await Promise.all(
    samples.map((sample) =>
      payload.create({
        collection: 'sample',
        data: sample,
        req,
      }),
    ),
  )

  return docs
}
