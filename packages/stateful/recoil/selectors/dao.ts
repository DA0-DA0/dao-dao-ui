import { selectorFamily } from 'recoil'

import {
  DaoDaoCoreSelectors,
  DaoVotingCw20StakedSelectors,
  contractInfoSelector,
  queryClientAtom,
} from '@dao-dao/state'
import { getDao } from '@dao-dao/state/clients'
import { IDaoBase, IProposalModuleBase, WithChainId } from '@dao-dao/types'
import { DaoVotingCw20StakedAdapterId } from '@dao-dao/utils'

import { matchAdapter as matchVotingModuleAdapter } from '../../voting-module-adapter'

export const daoClientSelector = selectorFamily<
  IDaoBase,
  WithChainId<{ coreAddress: string }>
>({
  key: 'daoClient',
  get:
    ({ chainId, coreAddress }) =>
    async ({ get }) => {
      const { queryClient } = get(queryClientAtom)
      const dao = getDao({
        queryClient,
        chainId,
        coreAddress,
      })
      await dao.init()
      return dao
    },
})

export const daoCoreProposalModulesSelector = selectorFamily<
  IProposalModuleBase[],
  WithChainId<{ coreAddress: string }>
>({
  key: 'daoCoreProposalModules',
  get:
    (params) =>
    ({ get }) => [...get(daoClientSelector(params)).proposalModules],
})

// Gets CW20 governance token address if this DAO uses the cw20-staked voting
// module adapter.
export const daoCw20GovernanceTokenAddressSelector = selectorFamily<
  string | undefined,
  WithChainId<{
    coreAddress: string
  }>
>({
  key: 'daoCw20GovernanceTokenAddress',
  get:
    ({ coreAddress, chainId }) =>
    ({ get }) => {
      const votingModuleAddress = get(
        DaoDaoCoreSelectors.votingModuleSelector({
          contractAddress: coreAddress,
          chainId,
          params: [],
        })
      )
      const votingModuleInfo = votingModuleAddress
        ? get(
            contractInfoSelector({
              contractAddress: votingModuleAddress,
              chainId,
            })
          )
        : undefined

      let usesCw20VotingModule
      try {
        usesCw20VotingModule =
          !!votingModuleInfo &&
          matchVotingModuleAdapter(votingModuleInfo.info.contract)?.id ===
            DaoVotingCw20StakedAdapterId
      } catch {
        usesCw20VotingModule = false
      }

      const cw20GovernanceTokenAddress =
        votingModuleAddress && usesCw20VotingModule
          ? get(
              DaoVotingCw20StakedSelectors.tokenContractSelector({
                contractAddress: votingModuleAddress,
                chainId,
                params: [],
              })
            )
          : undefined

      return cw20GovernanceTokenAddress
    },
})
