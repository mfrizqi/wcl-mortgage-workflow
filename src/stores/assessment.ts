import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { DEFAULTS } from '@/config/fields'
import { calculateAssessment } from '@/lib/calculations'
import type { AssessmentValues, InputKey } from '@/types/assessment'

export const useAssessmentStore = defineStore('assessment', () => {
  const values = ref<AssessmentValues>({ ...DEFAULTS })

  /** Recomputed automatically whenever any input changes. */
  const results = computed(() => calculateAssessment(values.value))

  const isDefault = computed(() =>
    (Object.keys(DEFAULTS) as InputKey[]).every((key) => values.value[key] === DEFAULTS[key]),
  )

  function setValue(key: InputKey, value: number) {
    values.value[key] = value
  }

  function reset() {
    values.value = { ...DEFAULTS }
  }

  return { values, results, isDefault, setValue, reset }
})
