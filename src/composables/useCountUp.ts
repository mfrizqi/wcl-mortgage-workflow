import { onBeforeUnmount, ref, watch } from 'vue'
import { tweenNumbers } from '@/lib/tween'

/** Returns a ref that eases toward `source()` whenever it changes (instant under reduced motion). */
export function useCountUp(source: () => number, duration = 500) {
  const display = ref(source())
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  let cancel: (() => void) | null = null

  watch(source, (to) => {
    cancel?.()
    if (reduceMotion.matches) {
      display.value = to
      return
    }
    cancel = tweenNumbers({ v: display.value }, { v: to }, {
      duration,
      onUpdate: (out) => (display.value = out.v),
      onDone: () => (cancel = null),
    })
  })

  onBeforeUnmount(() => cancel?.())
  return display
}
