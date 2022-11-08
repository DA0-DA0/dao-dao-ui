import { selectorFamily } from 'recoil'

import {
  CwdCoreV2Selectors,
  CwdVotingCw20StakedSelectors,
  contractVersionSelector,
  cosmWasmClientForChainSelector,
} from '@dao-dao/state'
import { ProposalModule, WithChainId } from '@dao-dao/types'

import { fetchProposalModules } from '../../../utils/fetchProposalModules'
import { matchAdapter as matchVotingModuleAdapter } from '../../../voting-module-adapter'
import { CwdVotingCw20StakedAdapter } from '../../../voting-module-adapter/adapters/CwdVotingCw20Staked'

export const cwCoreProposalModulesSelector = selectorFamily<
  ProposalModule[],
  WithChainId<{ coreAddress: string }>
>({
  key: 'cwCoreProposalModules',
  get:
    ({ coreAddress, chainId }) =>
    async ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      const coreVersion = get(
        contractVersionSelector({
          contractAddress: coreAddress,
          chainId,
        })
      )

      return await fetchProposalModules(client, coreAddress, coreVersion)
    },
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
        CwdCoreV2Selectors.votingModuleSelector({
          contractAddress: coreAddress,
          chainId,
          params: [],
        })
      )
      // All `info` queries are the same, so just use core's info query.
      const votingModuleInfo = votingModuleAddress
        ? get(
            CwdCoreV2Selectors.infoSelector({
              contractAddress: votingModuleAddress,
              chainId,
              params: [],
            })
          )
        : undefined

      let usesCw20VotingModule
      try {
        usesCw20VotingModule =
          !!votingModuleInfo &&
          matchVotingModuleAdapter(votingModuleInfo.info.contract)?.id ===
            CwdVotingCw20StakedAdapter.id
      } catch {
        usesCw20VotingModule = false
      }

      const cw20GovernanceTokenAddress =
        votingModuleAddress && usesCw20VotingModule
          ? get(
              CwdVotingCw20StakedSelectors.tokenContractSelector({
                contractAddress: votingModuleAddress,
                chainId,
                params: [],
              })
            )
          : undefined

      return cw20GovernanceTokenAddress
    },
})
