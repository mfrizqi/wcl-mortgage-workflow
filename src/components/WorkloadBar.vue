<script setup lang="ts">
import { computed } from 'vue'
import { formatHours, formatPercent } from '@/lib/format'

const props = defineProps<{ total: number; recovered: number; remaining: number }>()

const share = computed(() => (props.total > 0 ? props.recovered / props.total : 0))
const label = computed(
  () =>
    `Of ${formatHours(props.total)} manual hours per year, ${formatHours(props.recovered)} could potentially be recovered and ${formatHours(props.remaining)} would remain manual.`,
)
</script>

<template>
  <div>
    <!-- Grey base = whole manual workload. Green overlay = the slice that could potentially be recovered. -->
    <div role="img" :aria-label="label" class="relative h-4 overflow-hidden rounded-full bg-bar-manual">
      <div
        class="absolute inset-0 origin-left bg-bar-recover transition-transform duration-300 ease-out motion-reduce:transition-none"
        :style="{ transform: `scaleX(${share})` }"
      />
    </div>
    <dl class="mt-3 grid grid-cols-2 gap-4 text-sm">
      <div>
        <dt class="flex items-center gap-2 text-muted">
          <span class="size-3 rounded-sm bg-bar-recover" aria-hidden="true" />Could be recovered
        </dt>
        <dd class="mt-0.5 font-display font-semibold tabular-nums">
          {{ formatHours(recovered) }} hrs ({{ formatPercent(share * 100) }})
        </dd>
      </div>
      <div>
        <dt class="flex items-center gap-2 text-muted">
          <span class="size-3 rounded-sm bg-bar-manual" aria-hidden="true" />Stays manual
        </dt>
        <dd class="mt-0.5 font-display font-semibold tabular-nums">{{ formatHours(remaining) }} hrs</dd>
      </div>
    </dl>
  </div>
</template>
