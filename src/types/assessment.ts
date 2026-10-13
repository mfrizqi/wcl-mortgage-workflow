export type InputKey =
  | 'filesPerMonth'
  | 'docMinutesPerFile'
  | 'followUpsPerFile'
  | 'minutesPerFollowUp'
  | 'hourlyCost'
  | 'automationRate'

/** All user-controlled values. `automationRate` is a percentage (0-100). */
export type AssessmentValues = Record<InputKey, number>

export type FieldUnit = 'count' | 'min' | 'usd' | 'percent'

export interface FieldConfig {
  key: InputKey
  label: string
  hint: string
  unit: FieldUnit
  /** Adornments shown inside the number input. */
  prefix?: string
  suffix?: string
  defaultValue: number
  /** Largest value the number input accepts; larger entries are clamped. */
  hardMax: number
  /** Range of the slider. The number input may go beyond it, up to hardMax. */
  slider: { min: number; max: number; step: number }
}

export interface AssessmentResults {
  annualFiles: number
  documentHours: number
  followUpHours: number
  totalManualHours: number
  hoursRecovered: number
  hoursRemaining: number
  weeklyHoursRecovered: number
  laborCostValue: number
}
