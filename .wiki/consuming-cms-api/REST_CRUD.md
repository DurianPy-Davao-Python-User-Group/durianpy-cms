# REST API CRUD Examples

All examples assume a base URL of `https://cms.durianpy.org/api`.

### 🔍 Read (GET)
**List all posts:**
```bash
curl https://cms.durianpy.org/api/posts
```
**Get a single post by ID:**
```bash
curl https://cms.durianpy.org/api/posts/<id>
```

### 🆕 Create (POST)
```bash
curl -X POST https://cms.durianpy.org/api/posts \
  -H "Content-Type: application/json" \
  -d '{"title": "My New Post", "content": "Post content here..."}'
```

### ✏️ Update (PATCH)
```bash
curl -X PATCH https://cms.durianpy.org/api/posts/<id> \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Title"}'
```

### ❌ Delete (DELETE)
```bash
curl -X DELETE https://cms.durianpy.org/api/posts/<id>
```
