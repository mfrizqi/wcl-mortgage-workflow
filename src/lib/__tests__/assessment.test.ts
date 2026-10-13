import { describe, expect, it } from 'vitest'
import { DEFAULTS, COST_FIELD } from '@/config/fields'
import { calculateAssessment } from '../calculations'
import { formatCurrency, formatHours } from '../format'
import { parseInput } from '../validation'

describe('calculateAssessment', () => {
  it('matches hand-calculated defaults', () => {
    const r = calculateAssessment(DEFAULTS)
    expect(r.annualFiles).toBe(720)
    expect(r.documentHours).toBe(360) // 720 x 30 / 60
    expect(r.followUpHours).toBe(60) // 720 x 1 x 5 / 60
    expect(r.totalManualHours).toBe(420) // no double counting: simple sum
    expect(r.hoursRecovered).toBeCloseTo(252) // 420 x 60%
    expect(r.weeklyHoursRecovered).toBeCloseTo(252 / 52)
    expect(r.laborCostValue).toBeCloseTo(7560) // 252 x $30
  })

  it('returns zeros for zero or empty workload', () => {
    const r = calculateAssessment({ ...DEFAULTS, filesPerMonth: 0 })
    expect(r.totalManualHours).toBe(0)
    expect(r.laborCostValue).toBe(0)
  })

  it('handles 0% and 100% automation', () => {
    expect(calculateAssessment({ ...DEFAULTS, automationRate: 0 }).hoursRecovered).toBe(0)
    const full = calculateAssessment({ ...DEFAULTS, automationRate: 100 })
    expect(full.hoursRecovered).toBe(full.totalManualHours)
    expect(full.hoursRemaining).toBe(0)
  })

  it('treats NaN, Infinity and negatives as 0', () => {
    const r = calculateAssessment({ ...DEFAULTS, filesPerMonth: NaN, hourlyCost: -5, followUpsPerFile: Infinity })
    expect(r.totalManualHours).toBe(0)
    expect(r.laborCostValue).toBe(0)
  })
})

describe('parseInput', () => {
  it('accepts decimals and thousands separators', () => {
    expect(parseInput('1,200', COST_FIELD)).toEqual({ value: 1000, error: expect.stringContaining('Maximum') })
    expect(parseInput('2.5', COST_FIELD)).toEqual({ value: 2.5, error: null })
  })
  it('handles empty, negative and non-numeric text', () => {
    expect(parseInput('  ', COST_FIELD).value).toBe(0)
    expect(parseInput('-3', COST_FIELD).value).toBe(0)
    expect(parseInput('abc', COST_FIELD).value).toBeNull()
    expect(parseInput('1e999', COST_FIELD).value).toBe(COST_FIELD.hardMax)
  })
})

describe('format', () => {
  it('rounds for display only', () => {
    expect(formatHours(4.846)).toBe('4.8')
    expect(formatHours(252)).toBe('252')
    expect(formatCurrency(7560)).toBe('$7,560')
    expect(formatCurrency(12_500_000_000)).toBe('$12.5B')
  })
})
