# Adding a New Collection

Follow these steps to add a new collection to the CMS. 

### 1. Create the configuration
Create a new directory in `src/collections/` and an `index.ts` file inside it (e.g., `src/collections/Products/index.ts`).

*For a consistent style, refer to `src/collections/Posts/index.ts`.*

```typescript
import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'

export const Products: CollectionConfig = {
  slug: 'products',
  access: {
    read: () => true, // Publicly readable
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    // ... add more fields
  ],
}
```

### 2. Register the collection
Import your collection in `src/payload.config.ts` and add it to the `collections` array.

```typescript
import { Products } from './collections/Products' // 1. Import

export default buildConfig({
  // ...
  collections: [
    Pages,
    Posts,
    Media,
    Categories,
    Users,
    Products, // 2. Add to array
  ],
  // ...
})
```
