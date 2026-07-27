import { getPayload, Payload } from 'payload'
import config from '@/payload.config'
import { GET as getDurianTypes } from '@/app/(payload)/api/durianpy-website-types/route'

import { describe, it, beforeAll, expect } from 'vitest'

let payload: Payload

describe('API', () => {
  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })
  })

  it('fetches users', async () => {
    const users = await payload.find({
      collection: 'users',
    })
    expect(users).toBeDefined()
  })

  it('returns only durianpy-website collection interfaces', async () => {
    const response = await getDurianTypes()

    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toContain('text/plain')

    const body = await response.text()

    expect(body).toContain('Group: durianpy-website')
    expect(body).toContain('Collections: sample, users')
    expect(body).toContain('export interface Sample')
    expect(body).toContain('export interface User')

    // Ensure non-group collections are excluded.
    expect(body).not.toContain('export interface Media')
    expect(body).not.toContain('export interface Category')
  })
})
