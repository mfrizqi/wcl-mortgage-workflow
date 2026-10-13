<script setup lang="ts">
import { computed, ref, useId, watch } from 'vue'
import type { FieldConfig } from '@/types/assessment'
import { formatFieldValue } from '@/lib/format'
import { parseInput } from '@/lib/validation'

const props = defineProps<{ field: FieldConfig; modelValue: number }>()
const emit = defineEmits<{ 'update:modelValue': [value: number] }>()

const uid = useId()
const inputId = `${uid}-input`
const hintId = `${uid}-hint`
const errorId = `${uid}-error`

// The text box keeps its own draft so users can clear it or type "2." without it snapping back.
const draft = ref(String(props.modelValue))
const error = ref<string | null>(null)
const focused = ref(false)

watch(
  () => props.modelValue,
  (value) => {
    if (focused.value) return
    draft.value = String(value)
    error.value = null
  },
)

const { min, max, step } = props.field.slider
const sliderValue = computed(() => Math.min(Math.max(props.modelValue, min), max))
const fillPercent = computed(() => ((sliderValue.value - min) / (max - min)) * 100)
const ticks = computed(() => [min, Math.round((min + max) / 2), max].map((n) => formatFieldValue(props.field, n)))

function onTextInput(event: Event) {
  draft.value = (event.target as HTMLInputElement).value
  const result = parseInput(draft.value, props.field)
  error.value = result.error
  if (result.value !== null) emit('update:modelValue', result.value)
}

function onBlur() {
  focused.value = false
  draft.value = String(props.modelValue) // normalize what is shown to what is used
  error.value = null
}

function onSlider(event: Event) {
  emit('update:modelValue', Number((event.target as HTMLInputElement).value))
}
</script>

<template>
  <div class="min-w-0">
    <div class="flex items-end justify-between gap-4">
      <label :for="inputId" class="text-[0.9375rem] font-medium leading-snug text-ink">{{ field.label }}</label>
      <div
        class="flex shrink-0 items-center gap-1 rounded-lg border bg-surface px-2.5 py-1.5 text-sm focus-within:ring-2 focus-within:ring-brand"
        :class="error ? 'border-danger' : 'border-line'"
      >
        <span v-if="field.prefix" class="text-muted" aria-hidden="true">{{ field.prefix }}</span>
        <input
          :id="inputId"
          type="text"
          inputmode="decimal"
          autocomplete="off"
          :value="draft"
          :aria-invalid="error ? 'true' : undefined"
          :aria-describedby="error ? `${hintId} ${errorId}` : hintId"
          class="w-16 bg-transparent text-right font-display text-base font-semibold tabular-nums text-ink outline-none"
          @input="onTextInput"
          @focus="focused = true"
          @blur="onBlur"
        />
        <span v-if="field.suffix" class="text-muted" aria-hidden="true">{{ field.suffix }}</span>
      </div>
    </div>

    <input
      type="range"
      class="range"
      :min="min"
      :max="max"
      :step="step"
      :value="sliderValue"
      :style="{ '--fill': `${fillPercent}%` }"
      :aria-label="`${field.label}, slider`"
      :aria-valuetext="formatFieldValue(field, modelValue)"
      @input="onSlider"
    />

    <div class="flex justify-between text-xs tabular-nums text-muted" aria-hidden="true">
      <span v-for="tick in ticks" :key="tick">{{ tick }}</span>
    </div>

    <p :id="hintId" class="mt-2 text-sm leading-snug text-muted">{{ field.hint }}</p>
    <p v-if="error" :id="errorId" role="alert" class="mt-1 text-sm font-medium text-danger">{{ error }}</p>
  </div>
</template>
