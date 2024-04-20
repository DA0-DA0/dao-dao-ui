import { RecoilValueReadOnly, selectorFamily, waitForAll } from 'recoil'

import {
  DaoCoreV2Selectors,
  contractVersionSelector,
  daoTvlSelector,
} from '@dao-dao/state'
import {
  DaoCardInfo,
  DaoCardInfoLazyData,
  DaoDropdownInfo,
  DaoInfo,
  Feature,
  WithChainId,
} from '@dao-dao/types'
import {
  CHAIN_SUBDAOS,
  getFallbackImage,
  isFeatureSupportedByVersion,
} from '@dao-dao/utils'

import { proposalModuleAdapterProposalCountSelector } from '../../../proposal-module-adapter'
import { daoCoreProposalModulesSelector, daoInfoSelector } from './misc'

export const daoCardInfoSelector = selectorFamily<
  DaoCardInfo | undefined,
  WithChainId<{ coreAddress: string }>
>({
  key: 'daoCardInfo',
  get:
    ({ coreAddress, chainId }) =>
    ({ get }) => {
      const daoInfo = get(
        daoInfoSelector({
          chainId,
          coreAddress,
        })
      )

      return {
        chainId,
        coreAddress,
        coreVersion: daoInfo.coreVersion,
        name: daoInfo.name,
        description: daoInfo.description,
        imageUrl: daoInfo.imageUrl || getFallbackImage(coreAddress),
        polytoneProxies: daoInfo.polytoneProxies,
        established: daoInfo.created,
        parentDao: daoInfo.parentDao ?? undefined,
        tokenDecimals: 6,
        tokenSymbol: '',
        showingEstimatedUsdValue: true,
        lazyData: { loading: true },
      }
    },
})

export const daoCardInfoLazyDataSelector = selectorFamily<
  DaoCardInfoLazyData,
  WithChainId<{
    coreAddress: string
    walletAddress?: string
  }>
>({
  key: 'daoCardInfoLazyData',
  get:
    ({ coreAddress, chainId, walletAddress }) =>
    ({ get }) => {
      const { amount: tvl } = get(
        daoTvlSelector({
          coreAddress,
          chainId,
        })
      )

      const walletVotingWeight = walletAddress
        ? Number(
            get(
              DaoCoreV2Selectors.votingPowerAtHeightSelector({
                contractAddress: coreAddress,
                chainId,
                params: [{ address: walletAddress }],
              })
            ).power
          )
        : 0

      const proposalModules = get(
        daoCoreProposalModulesSelector({
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

export const subDaoCardInfosSelector = selectorFamily<
  DaoCardInfo[],
  WithChainId<{ coreAddress: string }>
>({
  key: 'subDaoCardInfos',
  get:
    ({ coreAddress: contractAddress, chainId }) =>
    ({ get }) => {
      const subDaos = get(
        DaoCoreV2Selectors.listAllSubDaosSelector({
          contractAddress,
          chainId,
        })
      )

      return get(
        waitForAll(
          subDaos.map(({ chainId, addr }) =>
            daoCardInfoSelector({
              chainId,
              coreAddress: addr,
            })
          )
        )
      ).filter(Boolean) as DaoCardInfo[]
    },
})

export const subDaoInfosSelector = selectorFamily<
  DaoInfo[],
  WithChainId<{ coreAddress: string }>
>({
  key: 'subDaoInfos',
  get:
    ({ coreAddress: contractAddress, chainId }) =>
    ({ get }) => {
      const subDaos = get(
        DaoCoreV2Selectors.listAllSubDaosSelector({
          contractAddress,
          chainId,
        })
      )

      return get(
        waitForAll(
          subDaos.map(({ chainId, addr }) =>
            daoInfoSelector({
              chainId,
              coreAddress: addr,
            })
          )
        )
      )
    },
})

export const chainSubDaoInfosSelector = selectorFamily<
  DaoInfo[],
  { chainId: string }
>({
  key: 'chainSubDaoInfos',
  get:
    ({ chainId }) =>
    ({ get }) => {
      const subDaos = CHAIN_SUBDAOS[chainId] || []

      return get(
        waitForAll(
          subDaos.map((coreAddress) =>
            daoInfoSelector({
              chainId,
              coreAddress,
            })
          )
        )
      )
    },
})

export const daoDropdownInfoSelector: (
  params: WithChainId<{
    coreAddress: string
    // Catch and prevent cycles.
    parents?: string[]
    noSubDaos?: boolean
  }>
) => RecoilValueReadOnly<DaoDropdownInfo> = selectorFamily({
  key: 'daoDropdownInfo',
  get:
    ({ coreAddress, chainId, parents, noSubDaos }) =>
    ({ get }) => {
      const version = get(
        contractVersionSelector({
          contractAddress: coreAddress,
          chainId,
        })
      )
      const config = get(
        DaoCoreV2Selectors.configSelector({
          contractAddress: coreAddress,
          chainId,
          params: [],
        })
      )

      const subDaos = isFeatureSupportedByVersion(Feature.SubDaos, version)
        ? get(
            DaoCoreV2Selectors.listAllSubDaosSelector({
              contractAddress: coreAddress,
              chainId,
            })
          )
        : []

      return {
        chainId,
        coreAddress,
        imageUrl: config.image_url || getFallbackImage(coreAddress),
        name: config.name,
        subDaos: noSubDaos
          ? []
          : get(
              waitForAll(
                subDaos.map(({ chainId, addr: subDaoAddress }) =>
                  daoDropdownInfoSelector({
                    chainId,
                    coreAddress: subDaoAddress,
                    parents: [...(parents ?? []), coreAddress],
                    // Prevents cycles. If one of our children is also our
                    // ancestor, don't let it load any children, but still load
                    // it so we can see the cycle exists.
                    noSubDaos: !!parents?.includes(subDaoAddress),
                  })
                )
              )
            ),
      }
    },
})
