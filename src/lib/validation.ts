import type { FieldConfig } from '@/types/assessment'
import { formatFieldValue } from './format'

export interface ParseResult {
  /** Sanitized value to store, or null when the text is not a number (keep the previous value). */
  value: number | null
  /** Message to show next to the field, or null when the entry is fine. */
  error: string | null
}

/**
 * Turns what the user typed into a safe number.
 * - empty        -> 0, with a prompt to enter a number
 * - not numeric  -> keep previous value, explain what is accepted
 * - negative     -> 0
 * - above max    -> clamped to the field's hard maximum
 * Decimals and thousands separators ("1,200") are accepted.
 */
export function parseInput(raw: string, field: FieldConfig): ParseResult {
  const text = raw.trim().replace(/,/g, '')

  if (text === '') return { value: 0, error: 'Enter a number. Results use 0 until you do.' }

  const n = Number(text)
  if (Number.isNaN(n)) return { value: null, error: 'Use numbers only, for example 45 or 2.5.' }
  if (n < 0) return { value: 0, error: 'Enter 0 or more. Negative values are not used.' }
  if (n > field.hardMax) {
    return { value: field.hardMax, error: `Maximum is ${formatFieldValue(field, field.hardMax)}. Using that value.` }
  }
  return { value: n, error: null }
}
