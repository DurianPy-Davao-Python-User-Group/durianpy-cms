import { describe, it, expect } from 'vitest'
import deepMerge, { isObject } from '@/utilities/deepMerge'

describe('deepMerge utilities', () => {
  describe('isObject', () => {
    it('should return true for objects', () => {
      expect(isObject({})).toBe(true)
      expect(isObject({ a: 1 })).toBe(true)
    })

    it('should return false for arrays and nulls', () => {
      expect(isObject([])).toBe(false)
      expect(isObject(null)).toBe(false)
      expect(isObject('string')).toBe(false)
    })
  })

  describe('deepMerge', () => {
    it('should merge two simple objects', () => {
      const target = { a: 1 }
      const source = { b: 2 }
      expect(deepMerge(target, source)).toEqual({ a: 1, b: 2 })
    })

    it('should merge nested objects', () => {
      const target = { a: { b: 1 } }
      const source = { a: { c: 2 }, d: 3 }
      expect(deepMerge(target, source)).toEqual({ a: { b: 1, c: 2 }, d: 3 })
    })

    it('should override primitive values', () => {
      const target = { a: 1, b: 2 }
      const source = { a: 3 }
      expect(deepMerge(target, source)).toEqual({ a: 3, b: 2 })
    })

    it('should not mutate the original target object', () => {
      const target = { a: 1 }
      const source = { b: 2 }
      deepMerge(target, source)
      expect(target).toEqual({ a: 1 })
    })
  })
})
