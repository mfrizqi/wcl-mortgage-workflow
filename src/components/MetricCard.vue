<script setup lang="ts">
defineProps<{
  label: string
  value: string
  unit?: string
  /** manual = existing workload, recovered = potential recovery */
  tone: 'manual' | 'recovered'
}>()
</script>

<template>
  <div class="min-w-0 rounded-xl p-4" :class="tone === 'recovered' ? 'bg-recover-soft' : 'bg-manual-soft'">
    <p class="text-sm leading-snug text-muted">{{ label }}</p>
    <p
      class="mt-1 break-words font-display text-2xl font-bold tabular-nums sm:text-3xl"
      :class="tone === 'recovered' ? 'text-recover' : 'text-ink'"
    >
      {{ value }}
    </p>
    <p v-if="unit" class="text-sm font-medium text-muted">{{ unit }}</p>
  </div>
</template>
