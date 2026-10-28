import { expect, test } from 'vitest'

import { isFreshUsdPrice, sumUsdEstimates } from './usd'

test('missing/stale/nonfinite quotes are unavailable but a genuine zero is priced', () => {
  expect(isFreshUsdPrice({ usdPrice: 0, timestamp: new Date() })).toBe(true)
  expect(
    isFreshUsdPrice({ usdPrice: 2, timestamp: new Date(Date.now() - 300001) })
  ).toBe(false)
  expect(isFreshUsdPrice({ usdPrice: Infinity, timestamp: new Date() })).toBe(
    false
  )
  expect(isFreshUsdPrice({ usdPrice: 1 })).toBe(false)
})

test('totals do not invent zero estimates and identify partial coverage', () => {
  expect(sumUsdEstimates([undefined])).toEqual({ amount: null, partial: true })
  expect(sumUsdEstimates([0])).toEqual({ amount: 0, partial: false })
  expect(sumUsdEstimates([2, undefined])).toEqual({ amount: 2, partial: true })
})
