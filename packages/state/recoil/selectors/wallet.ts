import { selectorFamily, waitForAll } from 'recoil'

import { GenericTokenBalance, TokenType, WithChainId } from '@dao-dao/types'

import { refreshWalletBalancesIdAtom } from '../atoms'
import { queryWalletIndexerSelector } from './indexer'
import { genericTokenSelector } from './token'

type ContractWithBalance = {
  contractAddress: string
  balance: string
}

// Get CW20 balances for a wallet from the indexer.
export const walletCw20BalancesSelector = selectorFamily<
  GenericTokenBalance[],
  WithChainId<{ walletAddress: string }>
>({
  key: 'walletCw20Balances',
  get:
    ({ walletAddress, chainId }) =>
    ({ get }) => {
      const id = get(refreshWalletBalancesIdAtom(walletAddress))

      const cw20Contracts: ContractWithBalance[] =
        get(
          queryWalletIndexerSelector({
            chainId,
            walletAddress,
            formula: 'tokens/list',
            id,
          })
        ) ?? []

      const tokens = get(
        waitForAll(
          cw20Contracts.map(({ contractAddress }) =>
            genericTokenSelector({
              type: TokenType.Cw20,
              denomOrAddress: contractAddress,
              chainId,
            })
          )
        )
      )

      return tokens.map((token, index) => ({
        token,
        balance: cw20Contracts[index].balance,
      }))
    },
})
