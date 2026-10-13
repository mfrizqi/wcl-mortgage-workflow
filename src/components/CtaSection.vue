<script setup lang="ts">
import { useCountUp } from '@/composables/useCountUp'
import { useMediaQuery } from '@/composables/useMediaQuery'
import { formatCurrency, formatHours } from '@/lib/format'
import { useAssessmentStore } from '@/stores/assessment'
import Aurora from './Aurora.vue'
import SpecularButton from './SpecularButton.vue'

const store = useAssessmentStore()
const hours = useCountUp(() => store.results.hoursRecovered)
const value = useCountUp(() => store.results.laborCostValue)

// Touch devices have no cursor to drive the shine, so let it sweep on its own,
// unless the user prefers reduced motion.
const noHover = useMediaQuery('(hover: none)')
const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
</script>

<template>
  <section aria-labelledby="cta-title" class="relative isolate overflow-hidden rounded-2xl bg-ink p-6 text-white sm:p-10">
    <!-- Decorative background: slow aurora, or a still gradient under reduced motion. -->
    <div class="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      <Aurora
        v-if="!reduceMotion"
        :color-stops="['#1f5fb8', '#2ecc8f', '#1f5fb8']"
        :blend="1"
        :amplitude="0.9"
        :speed="1"
        class="size-full opacity-95"
      />
      <div v-else class="size-full bg-linear-to-br from-brand/50 to-recover/30" />
      <div class="absolute inset-0 bg-linear-to-b from-ink/10 via-ink/50 to-ink/90" />
    </div>

    <div class="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
      <div class="max-w-2xl">
        <h2 id="cta-title" class="font-display text-2xl font-bold leading-snug text-balance sm:text-3xl">
          Want to understand the <span class="shiny-text">automation opportunities</span> in your mortgage operations?
        </h2>
        <p class="mt-3 text-lg text-white/85">
          Speak with White Code Labs about a customized workflow assessment.
        </p>

        <dl class="mt-6 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/20 pt-5">
          <div>
            <dt class="text-sm text-white/75">Your estimate: hours recovered</dt>
            <dd class="mt-0.5 font-display text-2xl font-bold tabular-nums">
              {{ formatHours(hours) }} <span class="text-sm font-medium text-white/75">hrs / year</span>
            </dd>
          </div>
          <div>
            <dt class="text-sm text-white/75">Potential annual labor-cost value</dt>
            <dd class="mt-0.5 font-display text-2xl font-bold tabular-nums">
              {{ formatCurrency(value) }} <span class="text-sm font-medium text-white/75">per year</span>
            </dd>
          </div>
        </dl>
        <p class="mt-3 text-xs text-white/75">Illustrative estimate based on your inputs, not a verified result.</p>
      </div>

      <!-- Visual only: no submission, email, or CRM integration by design. -->
      <SpecularButton
        size="lg"
        :radius="14"
        :tint-opacity="0.06"
        text-color="#ffffff"
        base-color="#6b7f9e"
        :auto-animate="noHover && !reduceMotion"
        class="shrink-0 max-md:w-full"
      >
        Discuss your results
      </SpecularButton>
    </div>
  </section>
</template>

<style scoped>
/* One restrained highlight sweeping across a single phrase.
   The gradient image is 250% wide and always covers the text, so it can never go transparent. */
.shiny-text {
  background: linear-gradient(110deg, #ffffff 40%, #86efac 50%, #ffffff 60%) 100% 0 / 250% 100% no-repeat;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  /* Each wrapped line gets its own full gradient instead of one cut across lines. */
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
  animation: shine 5s linear infinite;
}
@keyframes shine {
  from { background-position: 100% 0; }
  to { background-position: 0 0; }
}
@media (prefers-reduced-motion: reduce) {
  .shiny-text { animation: none; background: none; color: inherit; }
}
</style>