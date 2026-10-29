import { renderToStaticMarkup } from 'react-dom/server'
import { expect, test, vi } from 'vitest'

import { HugeDecimal } from '@dao-dao/math'
import { AccountType, TokenType } from '@dao-dao/types'

vi.mock('react-i18next', async (original) => ({
  ...(await original<typeof import('react-i18next')>()),
  useTranslation: () => ({ t: (key: string) => key }),
}))
vi.mock('next/router', async (original) => ({
  ...(await original<typeof import('next/router')>()),
  useRouter: () => ({ asPath: '/' }),
}))
vi.mock('./tooltip', () => ({
  Tooltip: ({ children }: any) => children,
  TooltipInfoIcon: () => null,
}))
vi.mock('@dao-dao/stateless', () => ({
  StatusCard: ({ content }: any) => <p>{content}</p>,
}))

import { TreasuryHistoryGraph } from '../../stateful/components/TreasuryHistoryGraph'
import { TokenLine } from './token/TokenLine'
import { ValenceAccountDisplay } from './ValenceAccountDisplay'

test('Valence keeps real token balances and configuration links when USD/history are unavailable', () => {
  const source = {
    chainId: 'neutron-1',
    type: TokenType.Native,
    denomOrAddress: 'untrn',
  }
  const token = { ...source, source, decimals: 6, symbol: 'NTRN' }
  const account = {
    type: AccountType.Valence,
    chainId: source.chainId,
    address: 'neutron1fixture',
    config: { rebalancer: { targets: [{ token }] } },
  }
  const html = renderToStaticMarkup(
    <ValenceAccountDisplay
      ButtonLink={({ href, children }: any) => <a href={href}>{children}</a>}
      IconButtonLink={({ href }: any) => <a href={href}>Configure</a>}
      TokenLine={(props: any) => (
        <TokenLine {...props} TokenCard={() => null} />
      )}
      TreasuryHistoryGraph={TreasuryHistoryGraph}
      account={account as any}
      configureRebalancerHref="/proposal/create"
      tokens={
        {
          loading: false,
          errored: false,
          data: [
            {
              owner: account,
              token,
              unstakedBalance: HugeDecimal.from('1250000'),
              lazyInfo: {
                loading: false,
                data: { totalBalance: HugeDecimal.from('1250000') },
              },
            },
          ],
        } as any
      }
    />
  )
  expect(html).toContain('title.rebalancer')
  expect(html).toContain('NTRN')
  expect(html).toContain('1.25')
  expect(html).toContain('info.usdEstimateUnavailable')
  expect(html).toContain('info.treasuryHistoryUnavailable')
  expect(html).toContain('href="/proposal/create"')
  expect(html).not.toContain('$0')
})
