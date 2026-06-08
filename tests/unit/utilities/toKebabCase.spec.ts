import { describe, it, expect } from 'vitest'
import { toKebabCase } from '@/utilities/toKebabCase'

describe('toKebabCase', () => {
  it('should convert camelCase to kebab-case', () => {
    expect(toKebabCase('camelCaseString')).toBe('camel-case-string')
  })

  it('should convert spaces to hyphens', () => {
    expect(toKebabCase('string with spaces')).toBe('string-with-spaces')
  })

  it('should handle PascalCase', () => {
    expect(toKebabCase('PascalCaseString')).toBe('pascal-case-string')
  })

  it('should handle empty strings', () => {
    expect(toKebabCase('')).toBe('')
  })

  it('should handle undefined gracefully', () => {
    expect(toKebabCase(undefined as any)).toBeUndefined()
  })
})
