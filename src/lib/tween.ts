interface TweenOptions<K extends string> {
  duration: number
  /** Per-key step; intermediate values snap to it so inputs never show 37.4231. */
  snap?: Partial<Record<K, number>>
  onUpdate: (values: Record<K, number>) => void
  onDone: () => void
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

/** Animates every key from `from` to `to`. Returns a cancel function. */
export function tweenNumbers<K extends string>(
  from: Record<K, number>,
  to: Record<K, number>,
  { duration, snap, onUpdate, onDone }: TweenOptions<K>,
): () => void {
  const keys = Object.keys(to) as K[]
  const start = performance.now()
  let raf = 0

  const tick = (now: number) => {
    const t = Math.min((now - start) / duration, 1)
    const eased = easeOutCubic(t)
    const out = {} as Record<K, number>
    for (const key of keys) {
      const raw = from[key] + (to[key] - from[key]) * eased
      const step = snap?.[key]
      out[key] = t === 1 ? to[key] : step ? Math.round(raw / step) * step : raw
    }
    onUpdate(out)
    if (t < 1) raf = requestAnimationFrame(tick)
    else onDone()
  }

  raf = requestAnimationFrame(tick)
  return () => cancelAnimationFrame(raf)
}
