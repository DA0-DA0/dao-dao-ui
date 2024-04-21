import { RecoilValueReadOnly, selectorFamily, waitForAll } from 'recoil'

import {
  DaoCoreV2Selectors,
  contractInfoSelector,
  contractVersionSelector,
  daoTvlSelector,
  govProposalsSelector,
  nativeDelegatedBalanceSelector,
} from '@dao-dao/state'
import {
  ContractVersion,
  DaoCardInfo,
  DaoCardInfoLazyData,
  DaoDropdownInfo,
  DaoInfo,
  Feature,
  LazyDaoCardProps,
  WithChainId,
} from '@dao-dao/types'
import {
  CHAIN_SUBDAOS,
  INACTIVE_DAO_NAMES,
  getChainGovernanceDaoDescription,
  getDisplayNameForChainId,
  getFallbackImage,
  getImageUrlForChainId,
  isConfiguredChainName,
  isFeatureSupportedByVersion,
  mustGetConfiguredChainConfig,
  parseContractVersion,
} from '@dao-dao/utils'

import { proposalModuleAdapterProposalCountSelector } from '../../../proposal-module-adapter'
import { daoCoreProposalModulesSelector, daoInfoSelector } from './misc'

export const daoCardInfoSelector = selectorFamily<
  DaoCardInfo,
  WithChainId<{ coreAddress: string }>
>({
  key: 'daoCardInfo',
  get:
    ({ chainId, coreAddress }) =>
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
          chainId,
          coreAddress,
        })
      )

      // Native chain x/gov module.
      if (isConfiguredChainName(chainId, coreAddress)) {
        // Get proposal count by loading one proposal and getting the total.
        const { total: proposalCount } = get(
          govProposalsSelector({
            chainId,
            limit: 1,
          })
        )

        const isMember = walletAddress
          ? get(
              nativeDelegatedBalanceSelector({
                chainId,
                address: walletAddress,
              })
            ).amount !== '0'
          : false

        return {
          isMember,
          tokenBalance: tvl,
          proposalCount,
        }
      }

      // DAO.

      const walletVotingWeight = walletAddress
        ? Number(
            get(
              DaoCoreV2Selectors.votingPowerAtHeightSelector({
                chainId,
                contractAddress: coreAddress,
                params: [{ address: walletAddress }],
              })
            ).power
          )
        : 0

      const proposalModules = get(
        daoCoreProposalModulesSelector({
          chainId,
          coreAddress,
        })
      )
      const proposalModuleCounts = get(
        waitForAll(
          proposalModules.map(({ address }) =>
            proposalModuleAdapterProposalCountSelector({
              chainId,
              proposalModuleAddress: address,
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

export const lazyDaoCardPropsSelector = selectorFamily<
  LazyDaoCardProps,
  WithChainId<{ coreAddress: string }>
>({
  key: 'lazyDaoCardProps',
  get:
    ({ chainId, coreAddress }) =>
    ({ get }) => {
      // Native chain x/gov module.
      if (isConfiguredChainName(chainId, coreAddress)) {
        return {
          chainId,
          coreAddress: mustGetConfiguredChainConfig(chainId).name,
          coreVersion: ContractVersion.Gov,
          name: getDisplayNameForChainId(chainId),
          description: getChainGovernanceDaoDescription(chainId),
          imageUrl: getImageUrlForChainId(chainId),
        }
      }

      // DAO.

      const [
        {
          info: { version },
        },
        config,
      ] = get(
        waitForAll([
          contractInfoSelector({
            chainId,
            contractAddress: coreAddress,
          }),
          DaoCoreV2Selectors.configSelector({
            chainId,
            contractAddress: coreAddress,
            params: [],
          }),
        ])
      )

      const coreVersion = parseContractVersion(version)
      if (!coreVersion) {
        throw new Error('Failed to parse core version.')
      }

      return {
        chainId,
        coreAddress,
        coreVersion,
        name: config.name,
        description: config.description,
        imageUrl: config.image_url || getFallbackImage(coreAddress),
        isInactive: INACTIVE_DAO_NAMES.includes(config.name),
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
    ({ chainId, coreAddress, parents, noSubDaos }) =>
    ({ get }) => {
      const isGovModule = isConfiguredChainName(chainId, coreAddress)
      // Native chain x/gov module.
      if (isGovModule) {
        const lazyInfo = get(
          lazyDaoCardPropsSelector({
            chainId,
            coreAddress,
          })
        )
        const subDaos = CHAIN_SUBDAOS[chainId] || []

        return {
          chainId,
          coreAddress,
          imageUrl: lazyInfo.imageUrl,
          name: lazyInfo.name,
          subDaos: get(
            waitForAll(
              subDaos.map((subDaoAddress) =>
                daoDropdownInfoSelector({
                  chainId,
                  coreAddress: subDaoAddress,
                  parents: [...(parents ?? []), coreAddress],
                  // Prevents cycles. If one of our children is also our
                  // ancestor, don't let it load any children, but still load it
                  // so we can see the cycle exists.
                  noSubDaos: !!parents?.includes(subDaoAddress),
                })
              )
            )
          ),
        }
      }

      // DAOs.

      const version = get(
        contractVersionSelector({
          chainId,
          contractAddress: coreAddress,
        })
      )
      const config = get(
        DaoCoreV2Selectors.configSelector({
          chainId,
          contractAddress: coreAddress,
          params: [],
        })
      )

      const subDaos = isFeatureSupportedByVersion(Feature.SubDaos, version)
        ? get(
            DaoCoreV2Selectors.listAllSubDaosSelector({
              chainId,
              contractAddress: coreAddress,
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
