import { renderToStaticMarkup } from 'react-dom/server'
import { expect, test, vi } from 'vitest'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}))
import { UsdValuationDisplay } from './UsdValuationDisplay'

const base = {
  timestamp: Date.now(),
  unpricedTokens: 0,
  incompleteBalances: false,
}
test('distinguishes real zero, partial subtotal, and unavailable estimates', () => {
  expect(
    renderToStaticMarkup(
      <UsdValuationDisplay value={{ ...base, amount: 0, status: 'complete' }} />
    )
  ).toContain('$0.00')
  expect(
    renderToStaticMarkup(
      <UsdValuationDisplay value={{ ...base, amount: 3, status: 'partial' }} />
    )
  ).toContain('info.partialUsdEstimate')
  expect(
    renderToStaticMarkup(
      <UsdValuationDisplay
        value={{ ...base, amount: null, status: 'unavailable' }}
      />
    )
  ).toContain('info.usdEstimateUnavailable')
  expect(
    renderToStaticMarkup(
      <UsdValuationDisplay
        value={{
          ...base,
          amount: 3,
          status: 'partial',
          timestamp: Date.now() - 300001,
        }}
      />
    )
  ).not.toContain('$3')
})
