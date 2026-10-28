import { QueryClient } from '@tanstack/react-query'
import { expect, test, vi } from 'vitest'

import { TokenType } from '@dao-dao/types'

import { fetchPendingDaoRewards } from './DaoRewardsDistributor.extra'

test('unpriced rewards retain real token amounts without fabricating zero USD', async () => {
  const token = {
    chainId: 'a',
    type: TokenType.Native,
    denomOrAddress: 'utoken',
    decimals: 6,
    symbol: 'TOK',
    source: { chainId: 'a', type: TokenType.Native, denomOrAddress: 'utoken' },
  }
  const q = new QueryClient()
  vi.spyOn(q, 'fetchQuery').mockImplementation(
    async ({ queryKey }: any): Promise<any> => {
      const key = JSON.stringify(queryKey)
      if (key.includes('list_all_items')) return [['reward', 'distributor']]
      if (key.includes('listAllPendingRewards'))
        return { pending_rewards: [{ id: 1, pending_rewards: '2000000' }] }
      if (key.includes('distributions')) return [{ token, id: 1 }]
      if (key.includes('usdPrice')) return { token }
      throw new Error(key)
    }
  )
  const result = await fetchPendingDaoRewards(q, {
    chainId: 'a',
    daoAddress: 'dao',
    recipient: 'recipient',
  })
  expect(result.rewards[0].balance).toBe(2)
  expect(result.rewards[0].usdValue).toBeUndefined()
  expect(result.rewards[0].timestamp).toBeUndefined()
})
