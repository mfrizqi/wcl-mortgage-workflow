import { onBeforeUnmount, ref } from 'vue'

/** Reactive window.matchMedia. */
export function useMediaQuery(query: string) {
  const mql = window.matchMedia(query)
  const matches = ref(mql.matches)
  const update = (e: MediaQueryListEvent) => (matches.value = e.matches)
  mql.addEventListener('change', update)
  onBeforeUnmount(() => mql.removeEventListener('change', update))
  return matches
}
