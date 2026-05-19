# Grouping Collections in the Admin UI

You can organize collections into groups in the admin sidebar to keep the interface clean, especially as the number of collections grows.

### How to group
Add the `admin.group` property to your collection configuration file (`src/collections/<Collection>/index.ts`).

```typescript
export const YourCollection: CollectionConfig = {
  slug: 'your-collection',
  admin: {
    group: 'Content', // This will group it under "Content" in the sidebar
    useAsTitle: 'title',
  },
  // ...
}
```

### Recommendation
In this project, we suggest grouping collections that belong to specific features or modules. For example:
- **Project A Data**: Group all related collections under `Project A`.
- **Global Configs**: Use `Settings` or `Globals`.

All collections sharing the same `group` name will be automatically nested under that label in the Payload admin panel.
