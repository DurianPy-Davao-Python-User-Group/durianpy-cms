# Developer Workflow: Feature to Production

This guide outlines the standard lifecycle for developing a new feature and pushing it to production.

---

## 🚦 Git Lifecycle

All contributors must follow this sequence for every task:

1.  **Ticket Assignment**: Ensure you are assigned to a ticket in GitHub Projects/Jira.
2.  **Branch Creation**: Create a new branch from `main` using the naming convention: `<type>/<ticket-id>-task-title`.
3.  **Environment Setup**: Once in your branch (and inside the DevContainer), prepare your environment:
    ```bash
    npm i && npx prek install --hook-type pre-commit --hook-type commit-msg --prepare-hooks
    ```
4.  **Implementation**: Create your changes (Schema, Seeders, Logic).
5.  **Syncing**: Periodically rebase from `main` to resolve conflicts early: `git fetch origin && git rebase origin/main -r`.
6.  **Committing**: Commit your changes using [Conventional Commits](https://www.conventionalcommits.org/).
7.  **Pull Request**: Push your branch and create a PR using the repository template.

---

## 1. Create the Collection (Schema)

When adding a new content type:

1. Create your collection configuration file in `src/collections/<CollectionName>/index.ts`.
2. Register the new collection inside the `collections` array in `src/payload.config.ts`.
3. Update the enums and types accordingly in `src/constants/collections.ts`
   _(See [Adding Collections](../adding-collections/ADDING_COLLECTIONS.md) for detailed instructions)._

## 2. Create the Seeder (Mock Data)

To ensure other developers and test environments have sample data to work with, you must create a seeder for your new collection.

1. **Create the file:** Create `src/seed/collections/<CollectionName>.ts`.
2. **Write the logic:** Use the Payload Local API to generate 2-3 sample records.

```typescript
// Example: src/seed/collections/Products.ts
import { Payload } from 'payload'

export async function seedProducts(payload: Payload) {
  payload.logger.info('Seeding Products...')

  await payload.create({
    collection: 'products',
    data: {
      title: 'Sample Product 1',
      price: 100,
    },
  })
}
```

3. **Register the seeder:** Ensure your new function is imported and called inside your main seed script (e.g., `src/seed/index.ts`).

## 3. Data Migrations (Only if necessary)

Because we use MongoDB, **you do not need a migration just for creating a new collection or adding a field.** MongoDB handles this automatically.

You **ONLY** need a migration if you are transforming _existing_ data (e.g., retroactively adding a default value to thousands of existing records).

> ⚠️ **Important Note on Migrations:** Payload does **not** automatically run migrations when the server starts. Migrations must be explicitly triggered. For local development, run `npm run payload migrate`. In production, this is handled by our CI/CD pipeline.

_(See the [Migrations Guide](../migrations/MIGRATION_GUIDE.md) for more info)._

## 4. Review & Deploy

1. **Pull Request:** Push your branch and open a PR. Ensure your code passes the linter (`npm run lint`) and tests (`npm run test:int`).
2. **CI/CD Pipeline:** Once merged to `main`, GitHub Actions automatically:
   - Validates the codebase and runs security scans.
   - Builds the Docker image.
   - Runs pending database migrations.
   - Deploys the updated image to the AWS Lambda production environment.
