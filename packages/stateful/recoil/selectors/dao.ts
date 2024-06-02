import uniq from 'lodash.uniq'
import {
  constSelector,
  selectorFamily,
  waitForAll,
  waitForAllSettled,
} from 'recoil'

import {
  DaoCoreV2Selectors,
  DaoVotingCw20StakedSelectors,
  accountsSelector,
  contractInfoSelector,
  contractInstantiateTimeSelector,
  contractVersionSelector,
  daoDropdownInfoSelector,
  daoParentInfoSelector,
  daoTvlSelector,
  daoVetoableDaosSelector,
  followingDaosSelector,
  govProposalsSelector,
  isDaoSelector,
  moduleAddressSelector,
  nativeDelegatedBalanceSelector,
  queryWalletIndexerSelector,
  refreshProposalsIdAtom,
  reverseLookupPolytoneProxySelector,
} from '@dao-dao/state'
import {
  DaoCardLazyData,
  DaoInfo,
  DaoPageMode,
  DaoParentInfo,
  DaoSource,
  DaoWithDropdownVetoableProposalList,
  DaoWithVetoableProposals,
  IndexerDaoWithVetoableProposals,
  ProposalModule,
  StatefulProposalLineProps,
  WithChainId,
} from '@dao-dao/types'
import {
  DaoVotingCw20StakedAdapterId,
  getDaoInfoForChainId,
  getDaoProposalPath,
  getFallbackImage,
  getSupportedChainConfig,
  getSupportedFeatures,
  isConfiguredChainName,
} from '@dao-dao/utils'

import { proposalModuleAdapterProposalCountSelector } from '../../proposal-module-adapter'
import { fetchProposalModules } from '../../utils/fetchProposalModules'
import { matchAdapter as matchVotingModuleAdapter } from '../../voting-module-adapter'

export const daoCardLazyDataSelector = selectorFamily<
  DaoCardLazyData,
  WithChainId<{
    coreAddress: string
    walletAddress?: string
  }>
>({
  key: 'daoCardLazyData',
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
        // If chain uses a contract-based DAO, load it instead.
        const govContractAddress =
          getSupportedChainConfig(chainId)?.govContractAddress
        if (govContractAddress) {
          coreAddress = govContractAddress
        } else {
          // Use chain x/gov module info.

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
            proposalCount,
            tokenWithBalance: {
              balance: tvl,
              symbol: 'USD',
              decimals: 2,
            },
          }
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
        proposalCount: proposalModuleCounts.reduce(
          (acc, curr) => acc + curr,
          0
        ),
        tokenWithBalance: {
          balance: tvl,
          symbol: 'USD',
          decimals: 2,
        },
      }
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
      const subDaos = getSupportedChainConfig(chainId)?.subDaos || []
      return subDaos.length
        ? get(
            waitForAll(
              subDaos.map((coreAddress) =>
                daoInfoSelector({
                  chainId,
                  coreAddress,
                })
              )
            )
          )
        : []
    },
})

export const followingDaosWithProposalModulesSelector = selectorFamily<
  (DaoSource & {
    proposalModules: ProposalModule[]
  })[],
  {
    walletPublicKey: string
  }
>({
  key: 'followingDaosWithProposalModules',
  get:
    (params) =>
    ({ get }) => {
      const following = get(followingDaosSelector(params))

      const proposalModules = get(
        waitForAll(
          following.map(({ chainId, coreAddress }) =>
            isConfiguredChainName(chainId, coreAddress)
              ? constSelector([])
              : daoCoreProposalModulesSelector({
                  chainId,
                  coreAddress,
                })
          )
        )
      )

      return following.map((daoSource, index) => ({
        ...daoSource,
        proposalModules: proposalModules[index],
      }))
    },
})

export const daoCoreProposalModulesSelector = selectorFamily<
  ProposalModule[],
  WithChainId<{ coreAddress: string }>
>({
  key: 'daoCoreProposalModules',
  get:
    ({ coreAddress, chainId }) =>
    async ({ get }) => {
      const coreVersion = get(
        contractVersionSelector({
          contractAddress: coreAddress,
          chainId,
        })
      )

      return await fetchProposalModules(chainId, coreAddress, coreVersion)
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
        DaoCoreV2Selectors.votingModuleSelector({
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

// TODO(rq): remove all uses of this and replace with react-query
export const daoInfoSelector = selectorFamily<
  DaoInfo,
  {
    chainId: string
    coreAddress: string
  }
>({
  key: 'daoInfo',
  get:
    ({ chainId, coreAddress }) =>
    ({ get }) => {
      // Native chain governance.
      if (isConfiguredChainName(chainId, coreAddress)) {
        // If chain uses a contract-based DAO, load it instead.
        const govContractAddress =
          getSupportedChainConfig(chainId)?.govContractAddress
        if (govContractAddress) {
          coreAddress = govContractAddress
        } else {
          const govModuleAddress = get(
            moduleAddressSelector({
              chainId,
              name: 'gov',
            })
          )
          const accounts = get(
            accountsSelector({
              chainId,
              address: govModuleAddress,
            })
          )

          return getDaoInfoForChainId(chainId, accounts)
        }
      }

      // Otherwise get DAO info from contract.

      const dumpState = get(
        DaoCoreV2Selectors.dumpStateSelector({
          contractAddress: coreAddress,
          chainId,
          params: [],
        })
      )
      if (!dumpState) {
        throw new Error('DAO failed to dump state.')
      }

      const [
        // Non-loadables
        [
          coreVersion,
          votingModuleInfo,
          proposalModules,
          created,
          _items,
          polytoneProxies,
          accounts,
        ],
        // Loadables
        [isActiveResponse, activeThresholdResponse],
      ] = get(
        waitForAll([
          // Non-loadables
          waitForAll([
            contractVersionSelector({
              contractAddress: coreAddress,
              chainId,
            }),
            contractInfoSelector({
              contractAddress: dumpState.voting_module,
              chainId,
            }),
            daoCoreProposalModulesSelector({
              coreAddress,
              chainId,
            }),
            contractInstantiateTimeSelector({
              address: coreAddress,
              chainId,
            }),
            DaoCoreV2Selectors.listAllItemsSelector({
              contractAddress: coreAddress,
              chainId,
            }),
            DaoCoreV2Selectors.polytoneProxiesSelector({
              contractAddress: coreAddress,
              chainId,
            }),
            accountsSelector({
              address: coreAddress,
              chainId,
            }),
          ]),
          // Loadables
          waitForAllSettled([
            // All voting modules use the same active threshold queries, so it's
            // safe to use the cw20-staked selector.
            DaoVotingCw20StakedSelectors.isActiveSelector({
              contractAddress: dumpState.voting_module,
              chainId,
              params: [],
            }),
            DaoVotingCw20StakedSelectors.activeThresholdSelector({
              contractAddress: dumpState.voting_module,
              chainId,
              params: [],
            }),
          ]),
        ])
      )

      const votingModuleContractName =
        votingModuleInfo?.info.contract || 'fallback'

      // Some voting modules don't support the isActive query, so if the query
      // fails, assume active.
      const isActive =
        isActiveResponse.state === 'hasError' ||
        (isActiveResponse.state === 'hasValue' &&
          isActiveResponse.contents.active)
      const activeThreshold =
        (activeThresholdResponse.state === 'hasValue' &&
          activeThresholdResponse.contents.active_threshold) ||
        null

      // Convert items list into map.
      const items = _items.reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: value,
        }),
        {} as Record<string, string>
      )

      const { admin } = dumpState

      const parentDao: DaoParentInfo | null =
        admin && admin !== coreAddress
          ? get(
              daoParentInfoSelector({
                chainId,
                parentAddress: admin,
                childAddress: coreAddress,
              })
            ) || null
          : null

      const daoInfo: DaoInfo = {
        chainId,
        coreAddress,
        coreVersion,
        supportedFeatures: getSupportedFeatures(coreVersion),
        votingModuleAddress: dumpState.voting_module,
        votingModuleContractName,
        proposalModules,
        name: dumpState.config.name,
        description: dumpState.config.description,
        imageUrl: dumpState.config.image_url || getFallbackImage(coreAddress),
        created: created?.getTime() || null,
        isActive,
        activeThreshold,
        items,
        polytoneProxies,
        accounts,
        parentDao,
        admin,
      }

      return daoInfo
    },
})

export const daoInfoFromPolytoneProxySelector = selectorFamily<
  | {
      chainId: string
      coreAddress: string
      info: DaoInfo
    }
  | undefined,
  WithChainId<{ proxy: string }>
>({
  key: 'daoInfoFromPolytoneProxy',
  get:
    (params) =>
    ({ get }) => {
      const { chainId, address } =
        get(reverseLookupPolytoneProxySelector(params)) ?? {}
      if (!chainId || !address) {
        return
      }

      // Get DAO info on source chain.
      const info = get(
        daoInfoSelector({
          chainId,
          coreAddress: address,
        })
      )

      return {
        chainId,
        coreAddress: address,
        info,
      }
    },
})

/**
 * Proposals which this DAO can currently veto.
 */
export const daosWithVetoableProposalsSelector = selectorFamily<
  DaoWithVetoableProposals[],
  WithChainId<{
    coreAddress: string
    /**
     * Include even DAOs not added to the vetoable DAOs list. By default, this
     * will filter out DAOs not explicitly registered in the list.
     */
    includeAll?: boolean
  }>
>({
  key: 'daosWithVetoableProposals',
  get:
    ({ chainId, coreAddress, includeAll = false }) =>
    ({ get }) => {
      // Refresh this when all proposals refresh.
      const id = get(refreshProposalsIdAtom)

      const accounts = get(
        accountsSelector({
          chainId,
          address: coreAddress,
        })
      )

      // Load DAOs this DAO has enabled vetoable proposal listing for.
      const vetoableDaos =
        !includeAll &&
        get(
          isDaoSelector({
            chainId,
            address: coreAddress,
          })
        )
          ? get(
              waitForAllSettled([
                daoVetoableDaosSelector({
                  chainId,
                  coreAddress,
                }),
              ])
            )[0].valueMaybe() || []
          : []

      const daoVetoableProposalsPerChain = (
        get(
          waitForAll(
            accounts.map(({ chainId, address }) =>
              queryWalletIndexerSelector({
                chainId,
                walletAddress: address,
                formula: 'veto/vetoableProposals',
                id,
                noFallback: true,
              })
            )
          )
        ) as (IndexerDaoWithVetoableProposals[] | undefined)[]
      )
        .flatMap((data, index) =>
          (data || []).map((d) => ({
            chainId: accounts[index].chainId,
            ...d,
          }))
        )
        .filter(
          ({ chainId, dao }) =>
            includeAll ||
            vetoableDaos.some(
              (vetoable) =>
                vetoable.chainId === chainId && vetoable.coreAddress === dao
            )
        )

      const uniqueChainsAndDaos = uniq(
        daoVetoableProposalsPerChain.map(
          ({ chainId, dao }) => `${chainId}:${dao}`
        )
      )

      const daoConfigAndProposalModules = get(
        waitForAllSettled(
          uniqueChainsAndDaos.map((chainAndDao) => {
            const [chainId, coreAddress] = chainAndDao.split(':')
            return waitForAll([
              DaoCoreV2Selectors.configSelector({
                chainId,
                contractAddress: coreAddress,
                params: [],
              }),
              daoCoreProposalModulesSelector({
                chainId,
                coreAddress,
              }),
            ])
          })
        )
      )

      return uniqueChainsAndDaos.flatMap((chainAndDao, index) => {
        const daoData = daoConfigAndProposalModules[index]

        return daoData.state === 'hasValue'
          ? {
              chainId: chainAndDao.split(':')[0],
              dao: chainAndDao.split(':')[1],
              name: daoData.contents[0].name,
              proposalModules: daoData.contents[1],
              proposalsWithModule: daoVetoableProposalsPerChain.find(
                (vetoable) =>
                  `${vetoable.chainId}:${vetoable.dao}` === chainAndDao
              )!.proposalsWithModule,
            }
          : []
      })
    },
})

/**
 * Proposals which this DAO can currently veto grouped by DAO with dropdown
 * info.
 */
export const daosWithDropdownVetoableProposalListSelector = selectorFamily<
  DaoWithDropdownVetoableProposalList<StatefulProposalLineProps>[],
  WithChainId<{ coreAddress: string; daoPageMode: DaoPageMode }>
>({
  key: 'daosWithDropdownVetoableProposalList',
  get:
    ({ daoPageMode, ...params }) =>
    ({ get }) => {
      const daosWithVetoableProposals = get(
        daosWithVetoableProposalsSelector(params)
      )

      const daoDropdownInfos = get(
        waitForAllSettled(
          daosWithVetoableProposals.map(({ chainId, dao }) =>
            daoDropdownInfoSelector({
              chainId,
              coreAddress: dao,
            })
          )
        )
      )

      return daosWithVetoableProposals.flatMap(
        ({
          chainId,
          dao,
          proposalModules,
          proposalsWithModule,
        }):
          | DaoWithDropdownVetoableProposalList<StatefulProposalLineProps>
          | [] => {
          const dropdownInfo = daoDropdownInfos
            .find(
              (info) =>
                info.state === 'hasValue' &&
                info.contents.chainId === chainId &&
                info.contents.coreAddress === dao
            )
            ?.valueMaybe()

          if (!dropdownInfo) {
            return []
          }

          return {
            dao: dropdownInfo,
            proposals: proposalsWithModule.flatMap(
              ({ proposalModule: { prefix }, proposals }) =>
                proposals.map(
                  ({ id }): StatefulProposalLineProps => ({
                    chainId,
                    coreAddress: dao,
                    proposalModules,
                    proposalId: `${prefix}${id}`,
                    proposalViewUrl: getDaoProposalPath(
                      daoPageMode,
                      dao,
                      `${prefix}${id}`
                    ),
                    isPreProposeProposal: false,
                  })
                )
            ),
          }
        }
      )
    },
})
