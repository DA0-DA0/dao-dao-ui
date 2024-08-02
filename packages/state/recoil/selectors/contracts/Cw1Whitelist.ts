import { selectorFamily } from 'recoil'

import { WithChainId } from '@dao-dao/types'

import { cw1WhitelistExtraQueries } from '../../../query'
import { queryClientAtom } from '../../atoms'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

// If this is a cw1-whitelist contract, return the admins. Otherwise, return
// null.
export const adminsIfCw1Whitelist = selectorFamily<
  string[] | null,
  QueryClientParams
>({
  key: 'cw1WhitelistCanExecute',
  get:
    ({ chainId, contractAddress: address }) =>
    async ({ get }) => {
      const queryClient = get(queryClientAtom)
      return await queryClient.fetchQuery(
        cw1WhitelistExtraQueries.adminsIfCw1Whitelist(queryClient, {
          chainId,
          address,
        })
      )
    },
})
