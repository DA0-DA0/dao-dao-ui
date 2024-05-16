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
  contractVersionSelector,
  daoDropdownInfoSelector,
  daoTvlSelector,
  daoVetoableDaosSelector,
  followingDaosSelector,
  govProposalsSelector,
  isDaoSelector,
  nativeDelegatedBalanceSelector,
  queryClientAtom,
  queryWalletIndexerSelector,
  refreshProposalsIdAtom,
} from '@dao-dao/state'
import {
  DaoCardLazyData,
  DaoPageMode,
  DaoSource,
  DaoWithDropdownVetoableProposalList,
  DaoWithVetoableProposals,
  IndexerDaoWithVetoableProposals,
  PermitForPermitData,
  ProposalModule,
  StatefulProposalLineProps,
  WithChainId,
} from '@dao-dao/types'
import {
  DaoVotingCw20StakedAdapterId,
  getDaoProposalPath,
  getSupportedChainConfig,
  isConfiguredChainName,
  isSecretNetwork,
} from '@dao-dao/utils'

import { proposalModuleAdapterProposalCountSelector } from '../../proposal-module-adapter'
import { fetchProposalModules } from '../../utils/fetchProposalModules'
import { matchAdapter as matchVotingModuleAdapter } from '../../voting-module-adapter'

export const daoCardLazyDataSelector = selectorFamily<
  DaoCardLazyData,
  WithChainId<{
    coreAddress: string
    walletAddress?: string
    // Secret Network
    permit?: PermitForPermitData
  }>
>({
  key: 'daoCardLazyData',
  get:
    ({ chainId, coreAddress, walletAddress, permit }) =>
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

      const walletVotingWeight =
        walletAddress && (!isSecretNetwork(chainId) || permit)
          ? Number(
              get(
                DaoCoreV2Selectors.votingPowerAtHeightSelector({
                  chainId,
                  contractAddress: coreAddress,
                  params: [
                    isSecretNetwork(chainId)
                      ? { auth: { permit } }
                      : { address: walletAddress },
                  ],
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
      const queryClient = get(queryClientAtom)
      const coreVersion = get(
        contractVersionSelector({
          contractAddress: coreAddress,
          chainId,
        })
      )

      return await fetchProposalModules(
        queryClient,
        chainId,
        coreAddress,
        coreVersion
      )
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
