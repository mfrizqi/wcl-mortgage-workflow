import type { AssessmentResults, AssessmentValues } from '@/types/assessment'

const MONTHS_PER_YEAR = 12
const WEEKS_PER_YEAR = 52
const MINUTES_PER_HOUR = 60

/** Non-finite or negative numbers never reach the formulas. */
const safe = (n: number): number => (Number.isFinite(n) && n > 0 ? n : 0)

/**
 * Pure calculation. No rounding happens here; rounding is a display concern
 * (see lib/format.ts) so results stay consistent when inputs change.
 *
 * Document-handling minutes are defined as EXCLUDING follow-up time, so the two
 * workloads are simply added with no overlap.
 */
export function calculateAssessment(values: AssessmentValues): AssessmentResults {
  const filesPerMonth = safe(values.filesPerMonth)
  const docMinutes = safe(values.docMinutesPerFile)
  const followUps = safe(values.followUpsPerFile)
  const followUpMinutes = safe(values.minutesPerFollowUp)
  const hourlyCost = safe(values.hourlyCost)
  const automation = Math.min(safe(values.automationRate), 100) / 100

  const annualFiles = filesPerMonth * MONTHS_PER_YEAR
  const documentHours = (annualFiles * docMinutes) / MINUTES_PER_HOUR
  const followUpHours = (annualFiles * followUps * followUpMinutes) / MINUTES_PER_HOUR
  const totalManualHours = documentHours + followUpHours
  const hoursRecovered = totalManualHours * automation

  return {
    annualFiles,
    documentHours,
    followUpHours,
    totalManualHours,
    hoursRecovered,
    hoursRemaining: totalManualHours - hoursRecovered,
    weeklyHoursRecovered: hoursRecovered / WEEKS_PER_YEAR,
    laborCostValue: hoursRecovered * hourlyCost,
  }
}
