import { selectorFamily, waitForAll } from 'recoil'

import { GenericTokenBalance, TokenType, WithChainId } from '@dao-dao/types'
import { Cw20BalanceResponse } from '@dao-dao/types/contracts/DaoCore.v2'
import {
  DAO_VOTING_CW20_STAKED_CONTRACT_NAMES,
  DAO_VOTING_TOKEN_STAKED_CONTRACT_NAMES,
} from '@dao-dao/utils'

import { refreshWalletBalancesIdAtom } from '../atoms'
import { isContractSelector } from './contract'
import { DaoVotingCw20StakedSelectors } from './contracts'
import { votingModuleSelector } from './contracts/DaoCore.v2'
import * as DaoVotingTokenStaked from './contracts/DaoVotingTokenStaked'
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

export const walletTokenDaoStakedDenomsSelector = selectorFamily<
  readonly string[],
  WithChainId<{ walletAddress: string }>
>({
  key: 'walletTokenDaoStakedDenoms',
  get:
    ({ walletAddress, chainId }) =>
    ({ get }) => {
      // Get the DAOs that the wallet is a member of
      const daos = get(
        queryWalletIndexerSelector({
          chainId,
          walletAddress,
          formula: 'daos/memberOf',
        })
      )
      if (!daos || !Array.isArray(daos) || daos.length === 0) {
        return []
      }

      // Get the token staked voting modules for each DAO
      const votingModules = get(
        waitForAll(
          daos.map(({ dao: contractAddress }) =>
            votingModuleSelector({
              contractAddress,
              chainId,
              params: [],
            })
          )
        )
      ).filter((contractAddress) =>
        get(
          isContractSelector({
            contractAddress,
            chainId,
            names: DAO_VOTING_TOKEN_STAKED_CONTRACT_NAMES,
          })
        )
      )

      if (votingModules.length === 0) {
        return []
      }

      // Get a list of denoms from the voting modules
      const denoms = get(
        waitForAll(
          votingModules.map((contractAddress) =>
            DaoVotingTokenStaked.denomSelector({
              contractAddress,
              chainId,
              params: [],
            })
          )
        )
      )

      // Create a Set from the denoms to ensure uniqueness
      const uniqueDenoms = new Set(denoms.map(({ denom }) => denom))

      // Convert the Set back into an array to return
      return [...uniqueDenoms]
    },
})

export const walletCw20DaoStakedBalancesSelector = selectorFamily<
  readonly Cw20BalanceResponse[],
  WithChainId<{ walletAddress: string }>
>({
  key: 'walletCw20DaoStakedBalances',
  get:
    ({ walletAddress, chainId }) =>
    ({ get }) => {
      // Get the DAOs that the wallet is a member of
      const daos = get(
        queryWalletIndexerSelector({
          chainId,
          walletAddress,
          formula: 'daos/memberOf',
        })
      )
      if (!daos || !Array.isArray(daos) || daos.length === 0) {
        return []
      }

      // Get the token staked voting modules for each DAO
      const votingModules = get(
        waitForAll(
          daos.map(({ dao: contractAddress }) =>
            votingModuleSelector({
              contractAddress,
              chainId,
              params: [],
            })
          )
        )
      ).filter((contractAddress) =>
        get(
          isContractSelector({
            contractAddress,
            chainId,
            names: DAO_VOTING_CW20_STAKED_CONTRACT_NAMES,
          })
        )
      )

      if (votingModules.length === 0) {
        return []
      }

      // Get a list of denoms from the voting modules
      const cw20s = get(
        waitForAll(
          votingModules.map((contractAddress) =>
            DaoVotingCw20StakedSelectors.tokenContractSelector({
              contractAddress,
              chainId,
              params: [],
            })
          )
        )
      )
      const votingPowers = get(
        waitForAll(
          votingModules.map((contractAddress) =>
            DaoVotingCw20StakedSelectors.votingPowerAtHeightSelector({
              contractAddress,
              chainId,
              params: [{ address: walletAddress }],
            })
          )
        )
      )

      // Sum up the balances by cw20 address
      const balances = cw20s.reduce((acc, cw20, i) => {
        const votingPower = votingPowers[i]
        if (cw20 && votingPower) {
          acc.set(
            cw20,
            (acc.get(cw20) || BigInt(0)) + BigInt(votingPower.power)
          )
        }
        return acc
      }, new Map<string, bigint>())

      // Return the Cw20BalanceResponse[]
      return Array.from(balances).map(([addr, balance]) => ({
        addr,
        balance: balance.toString(),
      }))
    },
})
