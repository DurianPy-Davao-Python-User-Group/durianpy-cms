import { describe, it, expect } from 'vitest'
import { formatDateTime } from '@/utilities/formatDateTime'

describe('formatDateTime', () => {
  it('should format a valid date string correctly', () => {
    const testDate = new Date(2023, 4, 5) // May 5, 2023
    expect(formatDateTime(testDate.toISOString())).toBe('05/05/2023')
  })

  it('should handle dates with two digits for month and day', () => {
    const testDate = new Date(2023, 10, 15) // Nov 15, 2023
    expect(formatDateTime(testDate.toISOString())).toBe('11/15/2023')
  })
  
  it('should default to current date if timestamp is empty', () => {
    const now = new Date()
    const months = now.getMonth()
    const days = now.getDate()
    
    const MM = months + 1 < 10 ? `0${months + 1}` : months + 1
    const DD = days < 10 ? `0${days}` : days
    const YYYY = now.getFullYear()
    const expected = `${MM}/${DD}/${YYYY}`
    
    expect(formatDateTime('')).toBe(expected)
  })
})
