const fs = require('fs');
const path = require('path');

const CACHE_DIR = '/tmp/next-cache';

if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

module.exports = class CacheHandler {
  constructor(options) {
    this.options = options;
  }

  async get(key) {
    const filePath = path.join(CACHE_DIR, `${key}.json`);
    try {
      if (fs.existsSync(filePath)) {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
      }
    } catch (e) {
      console.error('Cache get error:', e);
    }
    return null;
  }

  async set(key, data, ctx) {
    const filePath = path.join(CACHE_DIR, `${key}.json`);
    try {
      fs.writeFileSync(filePath, JSON.stringify({
        value: data,
        lastModified: Date.now(),
        tags: ctx.tags,
      }), 'utf8');
    } catch (e) {
      console.error('Cache set error:', e);
    }
  }

  async revalidateTag(tag) {
    // In-memory or /tmp file-based revalidation is limited, but this prevents errors
    try {
      const files = fs.readdirSync(CACHE_DIR);
      for (const file of files) {
        const filePath = path.join(CACHE_DIR, file);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        if (data.tags && data.tags.includes(tag)) {
          fs.unlinkSync(filePath);
        }
      }
    } catch (e) {
      console.error('Cache revalidateTag error:', e);
    }
  }
};
