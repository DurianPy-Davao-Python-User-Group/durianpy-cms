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

## 1. Test Case Planning & Approval (Pre-Development)
Before writing any code, you must define how the feature will be tested.

1. **Write Test Cases:** Based on the feature requirements, write out clear, step-by-step test cases.
2. **Post for Approval:** Comment your proposed test cases on the GitHub Issue assigned to you.
3. **Wait for Approval:** The Project Lead must approve these test cases. Do not start development until approval is granted.
4. **Unit Tests:** While End-to-End (E2E) testing infrastructure is planned for the future, you are strongly encouraged to write unit tests for your logic during this phase.

#### Example: Proposed Test Cases for a new "Events" Collection

| TC Number | Title | Description / Expected Result |
| :--- | :--- | :--- |
| **TC-001** | Admin UI - Create Event | **Action:** Log into the Payload Admin UI. Navigate to the 'Events' collection. Click 'Create New'. Fill in the required fields (Title, Date, Location). Click 'Save'. <br>**Expected Result:** The event saves successfully without errors and appears correctly in the Events list view. |
| **TC-002** | Admin UI - Field Validation | **Action:** In the Admin UI, attempt to save a new Event while leaving the 'Title' or 'Date' fields empty. <br>**Expected Result:** The system prevents the save operation and displays clear validation error messages next to the missing required fields. |
| **TC-003** | API - Fetch Events (REST) | **Action:** Send a `GET` request to the `/api/events` endpoint (unauthenticated). <br>**Expected Result:** The server returns a `200 OK` status and a JSON payload containing a paginated list of published events. |
| **TC-004** | API - Create Event (GraphQL) | **Action:** Using an authenticated API key or admin session, execute a GraphQL `createEvent` mutation with valid data. <br>**Expected Result:** The mutation succeeds and returns the newly created event's ID and title. |
| **TC-005** | API - Access Control | **Action:** Send an *unauthenticated* `POST` request to `/api/events`. <br>**Expected Result:** The server returns a `401 Unauthorized` or `403 Forbidden` status, proving that public users cannot maliciously create events. |

## 2. Create the Collection (Schema)

When adding a new content type:

1. Create your collection configuration file in `src/collections/<CollectionName>/index.ts`.
2. Register the new collection inside the `collections` array in `src/payload.config.ts`.
3. Update the enums and types accordingly in `src/constants/collections.ts`
   _(See [Adding Collections](../adding-collections/ADDING_COLLECTIONS.md) for detailed instructions)._

## 3. Create the Seeder (Mock Data)

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

## 4. Data Migrations (Only if necessary)

Because we use MongoDB, **you do not need a migration just for creating a new collection or adding a field.** MongoDB handles this automatically.

You **ONLY** need a migration if you are transforming _existing_ data (e.g., retroactively adding a default value to thousands of existing records).

> ⚠️ **Important Note on Migrations:** Payload does **not** automatically run migrations when the server starts. Migrations must be explicitly triggered. For local development, run `npm run payload migrate`. In production, this is handled by our CI/CD pipeline.

_(See the [Migrations Guide](../migrations/MIGRATION_GUIDE.md) for more info)._

## 5. Review & Deploy

1. **Pull Request:** Push your branch and open a PR. Ensure your code passes the linter (`npm run lint`) and tests (`npm run test:int`).
2. **Visual Proof (Mandatory):** You must attach screenshots or a screen recording to your Pull Request proving that the test cases approved in Phase 1 have successfully passed.
3. **CI/CD Pipeline:** Once merged to `main`, GitHub Actions automatically:
   - Validates the codebase and runs security scans.
   - Builds the Docker image.
   - Runs pending database migrations.
   - Deploys the updated image to the AWS Lambda production environment.
