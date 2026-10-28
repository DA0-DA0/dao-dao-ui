/** One timer per StateProvider, including an alarm at the nearest absolute
 * source expiry. Cache notifications only reschedule; they never trigger HTTP.
 */
export const subscribeUsdPriceRefresh = ({
  target,
  visibilityTarget = target,
  visible,
  nextExpiry,
  refresh,
  subscribe,
}: {
  target: EventTarget
  visibilityTarget?: EventTarget
  visible: () => boolean
  nextExpiry: () => number | undefined
  refresh: () => void
  subscribe?: (reschedule: () => void) => () => void
}) => {
  let timer: ReturnType<typeof setTimeout>
  let stopped = false
  let lastRefresh = Date.now()
  const schedule = () => {
    clearTimeout(timer)
    if (stopped) return
    const now = Date.now()
    const expiry = nextExpiry()
    const delay = Math.max(
      1,
      Math.min(
        60_000,
        lastRefresh + 60_000 - now,
        expiry && expiry >= now ? expiry - now + 1 : 60_000
      )
    )
    timer = setTimeout(tick, delay)
  }
  const tick = () => {
    lastRefresh = Date.now()
    if (visible()) refresh()
    schedule()
  }
  const resume = () => {
    if (visible()) tick()
    else schedule()
  }
  target.addEventListener('focus', resume)
  visibilityTarget.addEventListener('visibilitychange', resume)
  const unsubscribe = subscribe?.(schedule)
  schedule()
  return () => {
    stopped = true
    clearTimeout(timer)
    unsubscribe?.()
    target.removeEventListener('focus', resume)
    visibilityTarget.removeEventListener('visibilitychange', resume)
  }
}
