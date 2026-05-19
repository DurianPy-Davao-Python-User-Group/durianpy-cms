# Migration Example: Backfilling a Field

This example demonstrates how to add a default value to an existing field for all documents in a collection. Here's the [docs for more detailed migration guide](https://payloadcms.com/docs/database/migrations#mongodb-migrations)

```typescript
import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-mongodb'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  // Update all posts that are missing the 'archived' field
  await payload.db.updateMany({
    collection: 'posts',
    where: { archived: { exists: false } },
    data: { archived: false },
    req, // Always pass 'req' to keep the operation inside the transaction
  })
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  // Reverse the change
  await payload.db.updateMany({
    collection: 'posts',
    where: { archived: { equals: false } },
    data: { archived: null },
    req,
  })
}
```
