# Mortgage Workflow Savings Assessment

A browser-only calculator that estimates the time and labor-cost value a mortgage team could recover in
**loan document collection and borrower follow-ups**. Frontend take-home for White Code Labs.
No backend, database, auth, or external API. Everything is calculated in the browser.

## Setup

Requires Node.js 20 or newer.

```bash
npm install
npm run dev        # http://localhost:5173
```

| Command             | What it does                              |
| ------------------- | ----------------------------------------- |
| `npm run dev`       | Start the dev server                      |
| `npm run build`     | Type-check and build to `dist/`           |
| `npm run preview`   | Serve the production build locally        |
| `npm run typecheck` | Run `vue-tsc` only                        |
| `npm test`          | Run unit tests (calculations, validation) |

Fonts are bundled through `@fontsource`, so the app needs no network access after `npm install`.

## Stack

Vue 3 (`<script setup>`), TypeScript (strict), Tailwind CSS v4, Pinia, Vite, Vitest.

## Project structure

```
src/
  config/fields.ts        Field definitions: label, hint, default, slider range, hard max
  types/assessment.ts     Shared types
  lib/calculations.ts     Pure formulas (no Vue, no rounding)
  lib/validation.ts       Turns typed text into a safe number + error message
  lib/format.ts           Number, hours, currency, percent formatting (display only)
  stores/assessment.ts    Pinia store: values, computed results, reset
  components/
    SliderField.vue       Number input + range slider + hint + validation, one reusable field
    AssessmentForm.vue    Groups the fields, reset button
    ResultsPanel.vue      Four primary metrics + workload bar
    WorkloadBar.vue       Manual workload vs. potentially recovered share
    MetricCard.vue        One metric
    AssumptionsNotice.vue Assumptions and limitations
    CtaSection.vue        Visual-only call to action
```

Data flow: `SliderField` -> `store.setValue` -> `store.results` (computed) -> `ResultsPanel`.
Nothing is copied between components, so results can never go out of sync with inputs.

## Calculation logic

See [docs/CALCULATIONS.md](docs/CALCULATIONS.md) for the formulas, a worked example, and edge-case rules.
In short: document-handling minutes exclude follow-up time, so the two workloads are added with no overlap.

## Key decisions

- **Pure calculation module.** `calculateAssessment` takes values and returns numbers. It is unit tested and
  independent of Vue.
- **Rounding only at display time.** The weekly figure is derived from unrounded annual hours, so numbers
  stay consistent when inputs change.
- **Slider and number box on every field.** Sliders match the reference design; the number box lets users
  type exact values, including ones beyond the slider range (up to a per-field hard maximum).
- **Draft text in the input.** Users can clear a field or type `2.` without the value snapping back.
  On blur the box shows the value actually used.
- **Single orchestrated motion.** The only animation is the workload bar, which uses `transform: scaleX`
  and is disabled under `prefers-reduced-motion`.
- **Accessibility.** Visible labels linked to inputs, hints via `aria-describedby`, `role="alert"` errors,
  44px slider hit area, visible focus rings, a polite screen-reader summary of results.

## Assumptions made

- Defaults come from the assessment's table (60 files, 30 min, 1 follow-up, 5 min, $30, 60%), not from the
  sample screenshot on page 7, which uses different numbers.
- The "responsive right-to-left slider" on page 7 is read as the horizontal range sliders with min / middle
  / max labels. If a right-to-left (RTL) layout was intended, tell me; it would need `dir="rtl"` support.
- Slider ranges follow the screenshot (for example files 10 to 500, cost $15 to $80).
- Hard maximums are my own sensible limits (for example 100,000 files per month).

## AI tools used

Claude (Anthropic) assisted with planning, code, and documentation. All logic is covered by tests and
was reviewed against the formulas in the assessment.

## One more day

See [docs/NEXT-STEPS.md](docs/NEXT-STEPS.md).
