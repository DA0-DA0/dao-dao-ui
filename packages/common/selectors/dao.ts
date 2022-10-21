import { selectorFamily, waitForAll } from 'recoil'

import { proposalModuleAdapterProposalCountSelector } from '@dao-dao/proposal-module-adapter'
import {
  CwdCoreV2Selectors,
  contractVersionSelector,
  cosmWasmClientForChainSelector,
  daoTvlSelector,
} from '@dao-dao/state'
import {
  DaoCardInfoLazyData,
  ProposalModule,
  WithChainId,
} from '@dao-dao/types'

import { fetchProposalModules } from '../utils/fetchProposalModules'

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

export const daoCardInfoLazyDataSelector = selectorFamily<
  DaoCardInfoLazyData,
  WithChainId<{ coreAddress: string; walletAddress?: string }>
>({
  key: 'daoCardInfoLazyData',
  get:
    ({ coreAddress, chainId, walletAddress }) =>
    ({ get }) => {
      const tvl = get(daoTvlSelector({ coreAddress, chainId }))

      const walletVotingWeight = walletAddress
        ? Number(
            get(
              CwdCoreV2Selectors.votingPowerAtHeightSelector({
                contractAddress: coreAddress,
                chainId,
                params: [{ address: walletAddress }],
              })
            ).power
          )
        : 0

      const proposalModules = get(
        cwCoreProposalModulesSelector({
          coreAddress,
          chainId,
        })
      )
      const proposalModuleCounts = get(
        waitForAll(
          proposalModules.map(({ address }) =>
            proposalModuleAdapterProposalCountSelector({
              proposalModuleAddress: address,
              chainId,
            })
          )
        )
      ).filter(Boolean) as number[]

      return {
        isMember: walletVotingWeight > 0,
        tokenBalance: tvl,
        proposalCount: proposalModuleCounts.reduce(
          (acc, curr) => acc + curr,
          0
        ),
      }
    },
})
