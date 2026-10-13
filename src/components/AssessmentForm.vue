<script setup lang="ts">
import { AUTOMATION_FIELD, COST_FIELD, WORKLOAD_FIELDS } from '@/config/fields'
import { useAssessmentStore } from '@/stores/assessment'
import SliderField from './SliderField.vue'

const store = useAssessmentStore()
</script>

<template>
  <section aria-labelledby="form-title" class="rounded-2xl border border-line bg-surface p-5 sm:p-8">
    <div class="flex items-start justify-between gap-4">
      <div>
        <h2 id="form-title" class="font-display text-xl font-bold">Your workflow figures</h2>
        <p class="mt-1 text-sm text-muted">Loan document collection and borrower follow-ups.</p>
      </div>
      <button
        type="button"
        :disabled="store.isDefault || store.isResetting"
        class="shrink-0 rounded-lg border border-line px-3 py-2 text-sm font-medium text-brand transition-colors hover:bg-paper disabled:cursor-not-allowed disabled:text-muted disabled:opacity-60 disabled:hover:bg-transparent"
        @click="store.reset"
      >
        Reset to defaults
      </button>
    </div>

    <fieldset class="mt-6">
      <legend class="mb-3 font-display text-sm font-semibold text-brand">Workload</legend>
      <div class="grid gap-x-8 gap-y-5 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        <SliderField
          v-for="field in WORKLOAD_FIELDS"
          :key="field.key"
          :field="field"
          :model-value="store.values[field.key]"
          @update:model-value="store.setValue(field.key, $event)"
        />
      </div>
    </fieldset>

    <fieldset class="mt-6 border-t border-line pt-6">
      <legend class="mb-3 font-display text-sm font-semibold text-brand">Staff cost</legend>
      <SliderField
        :field="COST_FIELD"
        :model-value="store.values.hourlyCost"
        @update:model-value="store.setValue('hourlyCost', $event)"
      />
    </fieldset>

    <fieldset class="mt-6 rounded-xl bg-paper p-4 sm:p-5">
      <legend class="sr-only">Automation assumption</legend>
      <SliderField
        :field="AUTOMATION_FIELD"
        :model-value="store.values.automationRate"
        @update:model-value="store.setValue('automationRate', $event)"
      />
    </fieldset>
  </section>
</template>
