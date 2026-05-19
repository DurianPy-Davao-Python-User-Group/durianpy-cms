# Migration Template

Use this boilerplate when creating a new migration file manually or as a reference for `migrate:create`.

```typescript
import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-mongodb'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  // Your 'Up' logic here (e.g. data transformation)
  // Use payload.db.<operation> or payload.<operation>
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  // Your 'Down' logic here (to revert the 'Up' logic)
}
```
