# Implementation decisions and reasoning

A short brief for explaining *why* the numbers and choices in this assessment are what they are.

## 1. Where every number comes from

| Number | Source | Why |
| ------ | ------ | --- |
| Defaults: 60 files, 30 min, 1 follow-up, 5 min, $30/hr, 60% | Assessment, Section 4 | Specified. Used exactly. |
| x12 (months), /52 (weeks), /60 (minutes) | Assessment formulas | Specified. Used exactly. |
| Slider ranges (files 10-500, doc minutes 5-120, follow-ups 0-10, minutes per follow-up 1-15, cost $15-$80) | Sample screenshot on page 7 | Matches the reference design. Automation slider is 0-100% because it is a share. |
| Follow-up slider step 0.5 | My choice | Average follow-ups per file is often fractional (for example 1.5). |
| Hard maximums (100,000 files, 600 min, 100 follow-ups, 480 min, $1,000/hr, 100%) | My choice | Typed values can exceed the slider range, but must stay finite and plausible so the layout and math stay safe. Entries above the cap are clamped with a visible message. |
| 450 ms reset animation | My choice | Long enough to read as smooth, short enough not to feel slow. Skipped under reduced-motion. |

All defaults are shown as illustrative, never as industry benchmarks.

## 2. Calculation reasoning

- **Total workload = document hours + follow-up hours.** Document-handling minutes are defined as time
  *excluding* follow-ups, so nothing is counted twice. The field hint says so to the user.
- **Recovered hours = total x automation rate.** One transparent, adjustable assumption, as the brief asks.
- **Weekly = annual / 52.** Taken from unrounded annual hours, so rounding never compounds.
- **Value = recovered hours x hourly cost.** Labeled "Potential Annual Labor-Cost Value" and described as
  recovered capacity, because freed time is not automatically cash saved.
- **Rounding at display only.** Whole hours (one decimal under 10), whole dollars, one decimal for weekly hours.
- **Safe math.** `NaN`, `Infinity`, and negatives become 0 inside the calculation, and automation is capped at 100%,
  so no input can produce `NaN` on screen.

Defaults check: 720 files -> 360 + 60 = 420 hrs -> x60% = 252 hrs -> 4.8 hrs/week -> $7,560/year.
Covered by unit tests.

## 3. UX and design decisions

- **Slider plus number box.** Sliders match the reference and are fast to explore; the box allows exact values.
- **Draft text in the box.** Users can clear a field or type `2.` without it snapping back; the value actually
  used is shown on blur.
- **Workload bar.** Separates existing manual workload (dark slate) from potentially recovered time (green),
  as required. The two colors keep about 3:1 contrast against each other; text uses a darker green for AA contrast.
- **Mobile results drawer.** Below 1024px, a sticky bar shows the two headline numbers and opens the full
  results in a native `<dialog>` (focus trap, Esc to close). This avoids scrolling back and forth between inputs and results.
- **Smooth reset.** Values tween to defaults, snapped to each slider's step so inputs never show odd decimals.
  Touching any field mid-animation finishes the reset first, so nothing is left half-way.
- **CTA is visual only.** It repeats the user's own estimate (counted up) so the call to action is tied to their numbers, over a slow aurora background kept low-contrast to stay professional. The aurora pauses off-screen and becomes a still gradient under reduced motion. The button is a Vue Bits specular button. On touch devices the shine animates on its own
  (no cursor); with reduced motion it stays still.
- **Accessibility.** Linked labels, `aria-describedby` hints, `role="alert"` errors, 44px slider hit area,
  visible focus, `prefers-reduced-motion` respected, polite screen-reader summary of results.

## 4. Technical decisions

| Choice | Reason |
| ------ | ------ |
| Vue 3 `<script setup>` + TypeScript strict | Requested stack; types catch calculation mistakes early. |
| Pure `calculateAssessment` function | Easy to unit test and explain; no Vue inside the math. |
| Pinia store | One source of truth: inputs -> computed results -> UI. Needed to share state between the panel and the mobile drawer. |
| Config-driven fields (`config/fields.ts`) | Labels, defaults, ranges, and limits live in one place; adding a field does not touch the components. |
| Tailwind v4 theme tokens | Consistent colors and fonts without custom CSS sprawl. |
| Bundled fonts (`@fontsource`) | Runs offline with no external requests. |
| One dependency beyond the stack: `ogl` | Required by the specular CTA button only. |

## 5. Scope kept

No backend, auth, analytics, form submission, extra calculators, or marketing pages.
The workload is limited to document collection and borrower follow-ups. The tool states that it cannot
predict underwriting outcomes, approval rates, or compliance.

## 6. AI usage

Claude (Anthropic) helped with planning, code, and documentation. The formulas were checked against the
assessment text and verified with unit tests and hand calculation.
