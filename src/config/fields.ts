import type { AssessmentValues, FieldConfig } from '@/types/assessment'

export const WORKLOAD_FIELDS: FieldConfig[] = [
  {
    key: 'filesPerMonth',
    label: 'Loan files processed per month',
    hint: 'Loan files your team handles in a typical month.',
    unit: 'count',
    suffix: 'files',
    defaultValue: 60,
    hardMax: 100_000,
    slider: { min: 10, max: 500, step: 1 },
  },
  {
    key: 'docMinutesPerFile',
    label: 'Minutes on document handling per file',
    hint: 'Collecting and checking documents. Leave out follow-up time; it is counted separately.',
    unit: 'min',
    suffix: 'min',
    defaultValue: 30,
    hardMax: 600,
    slider: { min: 5, max: 120, step: 1 },
  },
  {
    key: 'followUpsPerFile',
    label: 'Borrower follow-ups per file',
    hint: 'Average number of reminders or requests sent for each file.',
    unit: 'count',
    suffix: 'per file',
    defaultValue: 1,
    hardMax: 100,
    slider: { min: 0, max: 10, step: 0.5 },
  },
  {
    key: 'minutesPerFollowUp',
    label: 'Minutes per follow-up',
    hint: 'Average staff time spent on one follow-up.',
    unit: 'min',
    suffix: 'min',
    defaultValue: 5,
    hardMax: 480,
    slider: { min: 1, max: 15, step: 1 },
  },
]

export const COST_FIELD: FieldConfig = {
  key: 'hourlyCost',
  label: 'Fully loaded staff cost per hour',
  hint: 'Hourly pay plus employment overhead such as benefits and payroll taxes.',
  unit: 'usd',
  prefix: '$',
  suffix: '/ hr',
  defaultValue: 30,
  hardMax: 1_000,
  slider: { min: 15, max: 80, step: 1 },
}

export const AUTOMATION_FIELD: FieldConfig = {
  key: 'automationRate',
  label: 'Illustrative automation assumption',
  hint: 'Share of the manual workload above that automation could potentially recover. This is an assumption, not a benchmark.',
  unit: 'percent',
  suffix: '%',
  defaultValue: 60,
  hardMax: 100,
  slider: { min: 0, max: 100, step: 1 },
}

export const ALL_FIELDS: FieldConfig[] = [...WORKLOAD_FIELDS, COST_FIELD, AUTOMATION_FIELD]

export const DEFAULTS = Object.fromEntries(
  ALL_FIELDS.map((f) => [f.key, f.defaultValue]),
) as AssessmentValues
