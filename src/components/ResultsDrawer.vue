<script setup lang="ts">
import { ref } from 'vue'
import { formatCurrency, formatHours } from '@/lib/format'
import { useAssessmentStore } from '@/stores/assessment'
import ResultsBody from './ResultsBody.vue'

const store = useAssessmentStore()
const dialog = ref<HTMLDialogElement | null>(null)

const open = () => dialog.value?.showModal()
const close = () => dialog.value?.close()
// A click on the backdrop targets the <dialog> element itself.
const onBackdropClick = (e: MouseEvent) => {
  if (e.target === dialog.value) close()
}
</script>

<template>
  <!-- Peek bar: always visible on small screens, shows the two headline numbers. -->
  <div class="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur">
    <button
      type="button"
      aria-haspopup="dialog"
      class="flex min-h-14 w-full items-center justify-between gap-3 px-4 py-2 text-left sm:px-6"
      @click="open"
    >
      <span class="flex min-w-0 gap-5">
        <span class="min-w-0">
          <span class="block text-xs text-muted">Hours recovered</span>
          <span class="block truncate font-display font-bold tabular-nums text-recover">
            {{ formatHours(store.results.hoursRecovered) }} /yr
          </span>
        </span>
        <span class="min-w-0">
          <span class="block text-xs text-muted">Labor-cost value</span>
          <span class="block truncate font-display font-bold tabular-nums text-recover">
            {{ formatCurrency(store.results.laborCostValue) }} /yr
          </span>
        </span>
      </span>
      <span class="flex shrink-0 items-center gap-1 font-display text-sm font-semibold text-brand">
        View results
        <svg viewBox="0 0 20 20" class="size-4" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M5 12l5-5 5 5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
    </button>
  </div>

  <dialog
    ref="dialog"
    aria-labelledby="drawer-title"
    class="fixed inset-x-0 bottom-0 top-auto m-0 max-h-[85dvh] w-full max-w-none overflow-y-auto overscroll-contain rounded-t-2xl bg-surface p-0 text-ink transition-transform duration-300 ease-out backdrop:bg-ink/50 starting:translate-y-full motion-reduce:transition-none"
    @click="onBackdropClick"
  >
    <div class="mx-auto max-w-2xl px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-6">
      <div class="sticky top-0 z-10 -mx-4 flex items-center justify-between bg-surface px-4 py-4 sm:-mx-6 sm:px-6">
        <h2 id="drawer-title" class="font-display text-xl font-bold">Estimated results</h2>
        <button
          type="button"
          class="rounded-lg border border-line px-3 py-2 text-sm font-medium text-brand hover:bg-paper"
          @click="close"
        >
          Close
        </button>
      </div>
      <ResultsBody />
    </div>
  </dialog>
</template>
