# PayloadCMS Migration Guide (MongoDB)

Since we are using **MongoDB** (a schemaless database), you do **not** need to create migrations for every schema change.

### ❓ When to Migrate?
*   **Optional:** Adding a new field, changing a field label, or adding a new collection. (MongoDB handles these automatically).
*   **Mandatory:** Transforming existing data, renaming a field on old documents, or backfilling default values for existing records.

### 🛠️ CLI Commands
We use the project's `payload` script as a proxy for all migration commands.

| Command | Description |
| :--- | :--- |
| `npm run payload migrate:create <name>` | Create a new blank migration file in `src/migrations/`. |
| `npm run payload migrate` | Run all pending migrations. |
| `npm run payload migrate:status` | Check which migrations have already been applied. |
| `npm run payload migrate:down` | Roll back the last applied migration. |

### 💡 Pro Tip
Migrations run inside a **transaction** by default. If your local MongoDB instance is not a Replica Set, transactions might fail. Ensure your local `DATABASE_URL` includes `?replicaSet=rs0` if needed, or disable transactions in the `mongooseAdapter` config during local dev.
