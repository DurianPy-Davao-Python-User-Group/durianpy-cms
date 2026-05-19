# GraphQL API CRUD Examples

The GraphQL endpoint is available at `https://cms.durianpy.org/api/graphql`.

### 🔍 Read (Query)
**Fetch all posts with titles and slugs:**
```graphql
query {
  Posts {
    docs {
      id
      title
      slug
    }
  }
}
```

### 🆕 Create (Mutation)
```graphql
mutation {
  createPost(data: { title: "Hello World" }) {
    id
    title
  }
}
```

### ✏️ Update (Mutation)
```graphql
mutation {
  updatePost(id: "<id>", data: { title: "Updated Title" }) {
    id
    title
  }
}
```

### ❌ Delete (Mutation)
```graphql
mutation {
  deletePost(id: "<id>") {
    id
  }
}
```
