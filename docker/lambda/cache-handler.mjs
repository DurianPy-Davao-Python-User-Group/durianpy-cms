import fs from 'fs'
import path from 'path'

const CACHE_DIR = '/tmp/next-cache'

if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true })
}

export default class CacheHandler {
  options: any
  constructor(options: any) {
    this.options = options
  }

  async get(key: string) {
    const filePath = path.join(CACHE_DIR, `${key}.json`)
    try {
      if (fs.existsSync(filePath)) {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'))
      }
    } catch (e) {
      console.error('Cache get error:', e)
    }
    return null
  }

  async set(key: string, data: any, ctx: any) {
    const filePath = path.join(CACHE_DIR, `${key}.json`)
    try {
      fs.writeFileSync(
        filePath,
        JSON.stringify({
          value: data,
          lastModified: Date.now(),
          tags: ctx.tags,
        }),
        'utf8',
      )
    } catch (e) {
      console.error('Cache set error:', e)
    }
  }

  async revalidateTag(tag: string) {
    try {
      const files = fs.readdirSync(CACHE_DIR)
      for (const file of files) {
        const filePath = path.join(CACHE_DIR, file)
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
        if (data.tags && data.tags.includes(tag)) {
          fs.unlinkSync(filePath)
        }
      }
    } catch (e) {
      console.error('Cache revalidateTag error:', e)
    }
  }
}
