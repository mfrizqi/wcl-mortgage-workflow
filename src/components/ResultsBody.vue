<script setup lang="ts">
import { computed } from 'vue'
import { formatCurrency, formatHours, formatPercent, formatWeeklyHours } from '@/lib/format'
import { useAssessmentStore } from '@/stores/assessment'
import MetricCard from './MetricCard.vue'
import WorkloadBar from './WorkloadBar.vue'

const store = useAssessmentStore()
const r = computed(() => store.results)

const spoken = computed(
  () =>
    `Estimate updated. Manual workload ${formatHours(r.value.totalManualHours)} hours per year. Potential hours recovered ${formatHours(r.value.hoursRecovered)} per year, ${formatWeeklyHours(r.value.weeklyHoursRecovered)} per week. Potential annual labor-cost value ${formatCurrency(r.value.laborCostValue)}.`,
)
</script>

<template>
  <div>
    <span class="inline-block rounded-full bg-manual-soft px-3 py-1 text-xs font-medium text-muted">
      Illustrative estimate, not a verified result
    </span>

    <p v-if="r.totalManualHours === 0" class="mt-4 rounded-lg bg-paper p-3 text-sm text-muted">
      Enter loan files and the minutes spent on each to see an estimate.
    </p>

    <div class="mt-5">
      <h3 class="mb-3 text-sm font-medium text-muted">
        Manual workload vs. what could be recovered at {{ formatPercent(store.values.automationRate) }}
      </h3>
      <WorkloadBar :total="r.totalManualHours" :recovered="r.hoursRecovered" :remaining="r.hoursRemaining" />
    </div>

    <div class="mt-6 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2">
      <MetricCard tone="manual" label="Total manual workload" :value="formatHours(r.totalManualHours)" unit="hrs / year" />
      <MetricCard tone="recovered" label="Potential hours recovered" :value="formatHours(r.hoursRecovered)" unit="hrs / year" />
      <MetricCard
        tone="recovered"
        label="Potential weekly hours recovered"
        :value="formatWeeklyHours(r.weeklyHoursRecovered)"
        unit="hrs / week"
      />
      <MetricCard
        tone="recovered"
        label="Potential Annual Labor-Cost Value"
        :value="formatCurrency(r.laborCostValue)"
        unit="per year"
      />
    </div>

    <p class="mt-4 text-sm text-muted">
      Includes {{ formatHours(r.documentHours) }} hrs of document handling and {{ formatHours(r.followUpHours) }} hrs of
      follow-ups per year. The labor-cost value is recovered staff capacity, not guaranteed cash savings.
    </p>

    <p class="sr-only" aria-live="polite">{{ spoken }}</p>
  </div>
</template>
