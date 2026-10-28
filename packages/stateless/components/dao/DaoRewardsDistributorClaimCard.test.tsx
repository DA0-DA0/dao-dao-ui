import { renderToStaticMarkup } from 'react-dom/server'
import { expect, test, vi } from 'vitest'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}))
vi.mock('../error', () => ({ ErrorPage: () => null }))
vi.mock('../buttons', () => ({
  Button: ({ disabled, children }: any) => (
    <button disabled={disabled}>{children}</button>
  ),
}))
vi.mock('../Collapsible', () => ({
  Collapsible: ({ children }: any) => <div>{children}</div>,
}))
vi.mock('../tooltip', () => ({ TooltipInfoIcon: () => null }))
vi.mock('../token', async () => ({
  TokenAmountDisplay: ({ amount }: any) => (
    <span>{JSON.stringify(amount)}</span>
  ),
  ...(await import('../token/UsdValuationDisplay')),
}))
import { DaoRewardsDistributorClaimCard } from './DaoRewardsDistributorClaimCard'

test('missing USD rewards remain claimable and explicitly unavailable, not zero', () => {
  const markup = renderToStaticMarkup(
    <DaoRewardsDistributorClaimCard
      onClaim={() => {}}
      claiming={false}
      rewards={{
        loading: false,
        errored: false,
        data: [
          {
            token: {
              denomOrAddress: 'token',
              symbol: 'TOK',
              decimals: 6,
            } as any,
            balance: 2,
          },
        ],
      }}
    />
  )
  expect(markup).toContain('info.usdEstimateUnavailable')
  expect(markup).not.toContain('disabled=""')
  expect(markup).toContain('2')
})
