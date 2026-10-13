import type { FieldConfig } from '@/types/assessment'

const integer = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 })
const oneDecimal = new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 })
const twoDecimals = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 })
const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
const usdCompact = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
  maximumFractionDigits: 1,
})

/** Whole hours, with one decimal only for small values (e.g. 4.8). */
export const formatHours = (n: number): string => (n < 10 ? oneDecimal.format(n) : integer.format(n))

export const formatWeeklyHours = (n: number): string => oneDecimal.format(n)

/** Whole dollars; very large values switch to compact notation (e.g. $12.5B). */
export const formatCurrency = (n: number): string => (n >= 1e9 ? usdCompact.format(n) : usd.format(n))

export const formatPercent = (n: number): string => `${integer.format(n)}%`

/** Compact label for slider ends and aria-valuetext. */
export function formatFieldValue(field: FieldConfig, n: number): string {
  const text = twoDecimals.format(n)
  switch (field.unit) {
    case 'usd':
      return `$${text}`
    case 'min':
      return `${text} min`
    case 'percent':
      return `${text}%`
    default:
      return text
  }
}
