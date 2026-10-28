import { afterEach, expect, test, vi } from 'vitest'

import { subscribeUsdPriceRefresh } from './usdPriceRefresh'

afterEach(() => vi.useRealTimers())
test('uses one clock, schedules source expiry, refreshes on focus, and cleans up', async () => {
  vi.useFakeTimers()
  const target = new EventTarget()
  const refresh = vi.fn()
  const expires = Date.now() + 1000
  const stop = subscribeUsdPriceRefresh({
    target,
    visible: () => true,
    nextExpiry: () => expires,
    refresh,
  })
  await vi.advanceTimersByTimeAsync(1002)
  expect(refresh).toHaveBeenCalledTimes(1)
  target.dispatchEvent(new Event('focus'))
  expect(refresh).toHaveBeenCalledTimes(2)
  stop()
  target.dispatchEvent(new Event('focus'))
  await vi.advanceTimersByTimeAsync(120000)
  expect(refresh).toHaveBeenCalledTimes(2)
})

test('hidden pages make no polling requests and resume with revalidation', async () => {
  vi.useFakeTimers()
  const target = new EventTarget()
  let visible = false
  const refresh = vi.fn()
  const stop = subscribeUsdPriceRefresh({
    target,
    visible: () => visible,
    nextExpiry: () => undefined,
    refresh,
  })
  await vi.advanceTimersByTimeAsync(60001)
  expect(refresh).not.toHaveBeenCalled()
  visible = true
  target.dispatchEvent(new Event('visibilitychange'))
  expect(refresh).toHaveBeenCalledTimes(1)
  stop()
})
