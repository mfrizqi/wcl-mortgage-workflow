<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { useCountUp } from '@/composables/useCountUp'
import { useMediaQuery } from '@/composables/useMediaQuery'
import { formatCurrency, formatHours } from '@/lib/format'
import { useAssessmentStore } from '@/stores/assessment'
import Aurora from './Aurora.vue'
import StarBorder from './StarBorder.vue'

// The WebGL specular button is only loaded on devices with a real cursor.
const SpecularButton = defineAsyncComponent(() => import('./SpecularButton.vue'))

const store = useAssessmentStore()
const hours = useCountUp(() => store.results.hoursRecovered)
const value = useCountUp(() => store.results.laborCostValue)

const canHover = useMediaQuery('(hover: hover) and (pointer: fine)')
const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
</script>

<template>
  <section aria-labelledby="cta-title" class="relative isolate overflow-hidden rounded-2xl bg-ink p-6 text-white sm:p-10">
    <!-- Decorative background: slow aurora, or a still gradient under reduced motion. -->
    <div class="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <!-- On narrow screens the aurora is rendered wider than the card and cropped, so its waves stay broad. -->
      <div class="absolute inset-y-0 left-1/2 w-[220%] -translate-x-1/2 md:left-0 md:w-full md:translate-x-0">
        <Aurora
          v-if="!reduceMotion"
          :color-stops="['#1f5fb8', '#2ecc8f', '#1f5fb8']"
          :blend="0.9"
          :amplitude="1"
          :speed="0.7"
          class="size-full opacity-85"
        />
        <div v-else class="size-full bg-linear-to-br from-brand/50 to-recover/30" />
      </div>
      <div class="absolute inset-0 bg-linear-to-b from-ink/10 via-ink/50 to-ink/90" />
    </div>

    <div class="grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-center md:gap-12">
      <div>
        <h2 id="cta-title" class="font-display text-3xl font-extrabold leading-tight text-balance sm:text-4xl">
          <!-- Ready to <span class="shiny-text">recover</span> those hours? -->
          Ready to recover those hours?
        </h2>
        <p class="mt-4 max-w-lg text-lg leading-relaxed text-white/85">
          Discover where manual tasks are slowing you down. Get a tailored mortgage workflow assessment from White Code Labs.
        </p>
      </div>

      <div class="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm sm:p-6">
        <dl class="grid grid-cols-2 gap-4">
          <div>
            <dt class="text-sm text-white/75">Hours recovered</dt>
            <dd class="mt-0.5 font-display text-2xl font-bold tabular-nums">
              {{ formatHours(hours) }}<span class="block md:inline-block ml-0 md:ml-1 text-sm font-medium text-white/75">Hours / Year</span>
            </dd>
          </div>
          <div>
            <dt class="text-sm text-white/75">Labor-cost value</dt>
            <dd class="mt-0.5 font-display text-2xl font-bold tabular-nums">
              {{ formatCurrency(value) }}<span class="block md:inline-block ml-0  md:ml-1 text-sm font-medium text-white/75">Per Year</span>
            </dd>
          </div>
        </dl>
        <p class="mt-3 text-xs text-white/75">Potential, illustrative estimate based on your inputs. Not a verified result.</p>

        <!-- Visual only: no submission, email, or CRM integration by design. -->
        <div class="mt-5">
          <SpecularButton
            v-if="canHover"
            size="lg"
            :radius="14"
            :tint-opacity="0.06"
            text-color="#ffffff"
            base-color="#6b7f9e"
            class="w-full"
          >
            Discuss your results
          </SpecularButton>
          <StarBorder v-else type="button" color="#ffffff" speed="7.5s" :thickness="2" class="w-full">
            Discuss your results
          </StarBorder>
        </div>
      </div>
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