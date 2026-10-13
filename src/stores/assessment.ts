import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { ALL_FIELDS, DEFAULTS } from '@/config/fields'
import { calculateAssessment } from '@/lib/calculations'
import { tweenNumbers } from '@/lib/tween'
import type { AssessmentValues, InputKey } from '@/types/assessment'

const RESET_DURATION_MS = 450
const STEPS = Object.fromEntries(ALL_FIELDS.map((f) => [f.key, f.slider.step])) as Record<InputKey, number>

export const useAssessmentStore = defineStore('assessment', () => {
  const values = ref<AssessmentValues>({ ...DEFAULTS })
  const isResetting = ref(false)
  let cancelTween: (() => void) | null = null

  /** Recomputed automatically whenever any input changes. */
  const results = computed(() => calculateAssessment(values.value))

  const isDefault = computed(() =>
    (Object.keys(DEFAULTS) as InputKey[]).every((key) => values.value[key] === DEFAULTS[key]),
  )

  /** Stops a running reset animation and jumps to the defaults so no field is left half-way. */
  function finishReset() {
    if (!isResetting.value) return
    cancelTween?.()
    cancelTween = null
    isResetting.value = false
    values.value = { ...DEFAULTS }
  }

  function setValue(key: InputKey, value: number) {
    finishReset()
    values.value[key] = value
  }

  function reset() {
    finishReset()
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      values.value = { ...DEFAULTS }
      return
    }
    isResetting.value = true
    cancelTween = tweenNumbers(values.value, DEFAULTS, {
      duration: RESET_DURATION_MS,
      snap: STEPS,
      onUpdate: (next) => (values.value = next),
      onDone: () => {
        isResetting.value = false
        cancelTween = null
      },
    })
  }

  return { values, results, isDefault, isResetting, setValue, reset }
})
