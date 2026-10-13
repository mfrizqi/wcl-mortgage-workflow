# Calculation logic

All formulas live in `src/lib/calculations.ts` and follow the assessment exactly.

| # | Value | Formula |
| - | ----- | ------- |
| 1 | Annual loan files | files per month x 12 |
| 2 | Annual document-handling hours | annual files x document minutes per file / 60 |
| 3 | Annual follow-up hours | annual files x follow-ups per file x minutes per follow-up / 60 |
| 4 | Total manual workload hours | (2) + (3) |
| 5 | Potential annual hours recovered | (4) x automation rate |
| 6 | Potential weekly hours recovered | (5) / 52 |
| 7 | Potential annual labor-cost value | (5) x fully loaded hourly cost |

Automation rate is entered as a percentage (60) and divided by 100 inside the calculation.

## Worked example (defaults)

| Step | Working | Result |
| ---- | ------- | ------ |
| Annual files | 60 x 12 | 720 |
| Document hours | 720 x 30 / 60 | 360 |
| Follow-up hours | 720 x 1 x 5 / 60 | 60 |
| Total manual hours | 360 + 60 | **420** |
| Hours recovered | 420 x 0.60 | **252** |
| Weekly hours recovered | 252 / 52 | **4.8** |
| Labor-cost value | 252 x $30 | **$7,560** |

## No double counting

"Minutes on document handling per file" is defined as time **excluding** follow-ups. Follow-up time is
entered separately, so total workload is a plain sum. The form hint tells users to leave follow-up time
out of the document-handling figure.

## Rounding

The calculation never rounds. Display rounding happens in `src/lib/format.ts`:

- Hours: whole numbers, one decimal below 10 (for example 4.8).
- Weekly hours: one decimal.
- Currency: whole dollars; values of $1B and above use compact notation (for example $12.5B).

## Input handling

| Entry | Behavior |
| ----- | -------- |
| Empty | Calculated as 0, message asks for a number |
| Negative | Treated as 0, message explains |
| Text such as `abc` | Previous value kept, message explains accepted format |
| Decimal (`2.5`) or thousands separator (`1,200`) | Accepted |
| Above the field's hard maximum (including `1e999`) | Clamped to the maximum, message shown |
| Value beyond the slider range but under the maximum | Accepted; slider parks at its end |

The calculation also guards itself: `NaN`, `Infinity`, and negatives become 0, and the automation rate
is capped at 100%.
