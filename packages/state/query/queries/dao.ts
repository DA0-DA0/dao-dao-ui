import { QueryClient, queryOptions } from '@tanstack/react-query'
import uniq from 'lodash.uniq'

import {
  AmountWithTimestamp,
  ContractVersion,
  ContractVersionInfo,
  DaoDropdownInfo,
  DaoInfo,
  DaoPageMode,
  DaoParentInfo,
  DaoSource,
  DaoWithDropdownVetoableProposalList,
  DaoWithVetoableProposals,
  Feature,
  IndexerDaoWithVetoableProposals,
  InfoResponse,
  LazyDaoCardProps,
  StatefulProposalLineProps,
  SupportedChainIndexerMode,
} from '@dao-dao/types'
import {
  ProposalModuleWithInfo,
  SubDao,
  SubDaoWithChainId,
  TotalPowerAtHeightResponse,
  VotingPowerAtHeightResponse,
} from '@dao-dao/types/contracts/DaoDaoCore'
import {
  COMMUNITY_POOL_ADDRESS_PLACEHOLDER,
  DAO_CORE_CONTRACT_NAMES,
  INACTIVE_DAO_NAMES,
  PerformanceContext,
  VETOABLE_DAOS_ITEM_KEY_PREFIX,
  getChainGovernanceDaoDescription,
  getCosmWasmClientForChainId,
  getDaoInfoForChainId,
  getDaoProposalPath,
  getDisplayNameForChainId,
  getFallbackImage,
  getImageUrlForChainId,
  getSupportedChainConfig,
  indexToProposalModulePrefix,
  isConfiguredChainName,
  isFeatureSupportedByVersion,
  parseContractVersion,
  polytoneNoteProxyMapToChainIdMap,
} from '@dao-dao/utils'

import { CwCoreV1QueryClient, DaoDaoCoreQueryClient } from '../../contracts'
import { SearchDaoProposalsOptions, searchDaoProposals } from '../../indexer'
import { accountQueries } from './account'
import { chainQueries } from './chain'
import { contractQueries } from './contract'
import { daoDaoCoreQueries } from './contracts/DaoDaoCore'
import { votingModuleQueries } from './contracts/votingModule'
import { indexerQueries } from './indexer'
import { polytoneQueries } from './polytone'

/**
 * Fetch DAO info.
 */
export const fetchDaoInfo = async (
  queryClient: QueryClient,
  { chainId, coreAddress }: DaoSource
): Promise<DaoInfo> => {
  // Native chain governance.
  if (isConfiguredChainName(chainId, coreAddress)) {
    // Use real gov DAO's address if exists.
    const chainConfigGovAddress =
      getSupportedChainConfig(chainId)?.govContractAddress
    if (chainConfigGovAddress) {
      coreAddress = chainConfigGovAddress
    } else {
      // Use chain x/gov module info.
      const govModuleAddress = await queryClient.fetchQuery(
        chainQueries.moduleAddress({
          chainId,
          name: 'gov',
        })
      )
      const accounts = await queryClient.fetchQuery(
        accountQueries.list({
          chainId,
          address: govModuleAddress,
        })
      )

      return getDaoInfoForChainId(chainId, accounts)
    }
  }

  const p = new PerformanceContext(`dao_info_${chainId}_${coreAddress}`)

  const [
    [
      state,
      contractAdmin,
      parentDao,
      { info: votingModuleInfo },
      created,
      polytoneProxies,
      isActive,
      activeThreshold,
    ],
    proposalModules,
    _items,
    accounts,
  ] = await p.time(
    'main_promise',
    Promise.all([
      p
        .time(
          'dump_state',
          queryClient.fetchQuery(
            daoDaoCoreQueries.dumpState({
              chainId,
              contractAddress: coreAddress,
            })
          )
        )
        .then((state) =>
          Promise.all([
            state,
            'contractAdmin' in state
              ? state.contractAdmin || null
              : p.time(
                  'contract_admin',
                  queryClient.fetchQuery(
                    contractQueries.admin({
                      chainId,
                      address: coreAddress,
                    })
                  )
                ),
            state.admin && state.admin !== coreAddress
              ? p.time(
                  'parent_info',
                  queryClient
                    .fetchQuery(
                      daoQueries.parentInfo({
                        chainId,
                        parentAddress: state.admin,
                        subDaoAddress: coreAddress,
                      })
                    )
                    .catch(() => null)
                )
              : null,
            // Check if indexer returned this already.
            'votingModuleInfo' in state
              ? ({ info: state.votingModuleInfo } as InfoResponse)
              : p.time(
                  'voting_module_info',
                  queryClient.fetchQuery(
                    contractQueries.info({
                      chainId,
                      address: state.voting_module,
                    })
                  )
                ),
            // Check if indexer returned this already.
            'createdAt' in state && state.createdAt
              ? Date.parse(state.createdAt)
              : p.time(
                  'created_at',
                  queryClient
                    .fetchQuery(
                      contractQueries.instantiationTime({
                        chainId,
                        address: coreAddress,
                      })
                    )
                    .catch(() => null)
                ),
            // Check if indexer returned this already.
            'polytoneProxies' in state && state.polytoneProxies
              ? polytoneNoteProxyMapToChainIdMap(chainId, state.polytoneProxies)
              : p.time(
                  'polytone_proxies',
                  queryClient.fetchQuery(
                    polytoneQueries.proxies({
                      chainId,
                      address: coreAddress,
                    })
                  )
                ),

            // Some voting modules don't support the active threshold queries,
            // so if the queries fail, assume active and no threshold.
            p.time(
              'is_active',
              queryClient
                .fetchQuery(
                  votingModuleQueries.isActive({
                    chainId,
                    address: state.voting_module,
                  })
                )
                // If isActive query fails, just assume it is.
                .catch(() => true)
            ),
            p.time(
              'active_threshold',
              queryClient
                .fetchQuery(
                  votingModuleQueries.activeThresold({
                    chainId,
                    address: state.voting_module,
                  })
                )
                .then(({ active_threshold }) => active_threshold || null)
                .catch(() => null)
            ),
          ])
        ),
      p.time(
        'proposal_modules',
        queryClient.fetchQuery(
          daoQueries.proposalModules({
            chainId,
            coreAddress,
          })
        )
      ),
      p.time(
        'items',
        queryClient.fetchQuery(
          daoDaoCoreQueries.listAllItems({
            chainId,
            contractAddress: coreAddress,
          })
        )
      ),
      p.time(
        'accounts',
        queryClient.fetchQuery(
          accountQueries.list({
            chainId,
            address: coreAddress,
          })
        )
      ),
    ])
  )

  const coreVersion = parseContractVersion(state.version.version)

  p.log()

  // Convert items list into map.
  const items = Object.fromEntries(_items)

  return {
    chainId,
    coreAddress,
    coreVersion,
    votingModuleAddress: state.voting_module,
    votingModuleInfo,
    proposalModules: proposalModules.sort((a, b) =>
      a.prefix.localeCompare(b.prefix)
    ),
    contractAdmin,
    admin: state.admin || '',
    name: state.config.name,
    description: state.config.description,
    imageUrl: state.config.image_url || getFallbackImage(coreAddress),
    created,
    isActive,
    activeThreshold,
    items,
    initialActions: state.initial_actions || [],
    polytoneProxies,
    accounts,
    parentDao,
  }
}

/**
 * Fetch DAO parent info.
 */
export const fetchDaoParentInfo = async (
  queryClient: QueryClient,
  {
    chainId,
    parentAddress,
    subDaoAddress,
    ignoreParents,
  }: {
    chainId: string
    parentAddress: string
    /**
     * To determine if the parent has registered the subDAO, pass the subDAO.
     * This will set `registeredSubDao` appropriately. Otherwise, if undefined,
     * `registeredSubDao` will be set to false.
     */
    subDaoAddress?: string
    /**
     * Prevent infinite loop if DAO SubDAO loop exists.
     */
    ignoreParents?: string[]
  }
): Promise<DaoParentInfo> => {
  let parentChainId = chainId
  let parentDaoAddress = parentAddress
  let polytoneProxy: string | null = null

  // If address is a DAO contract...
  let [isDao, isPolytoneProxy] = await Promise.all([
    queryClient.fetchQuery(
      contractQueries.isDao({
        chainId: parentChainId,
        address: parentDaoAddress,
      })
    ),
    queryClient.fetchQuery(
      contractQueries.isPolytoneProxy({
        chainId: parentChainId,
        address: parentDaoAddress,
      })
    ),
  ])

  if (isPolytoneProxy) {
    const { chainId: remoteChainId, remoteAddress } =
      await queryClient.fetchQuery(
        polytoneQueries.reverseLookupProxy({
          chainId: parentChainId,
          address: parentDaoAddress,
        })
      )

    const remoteIsDao = await queryClient.fetchQuery(
      contractQueries.isDao({
        chainId: remoteChainId,
        address: remoteAddress,
      })
    )

    if (remoteIsDao) {
      isDao = true
      polytoneProxy = parentAddress
      parentChainId = remoteChainId
      parentDaoAddress = remoteAddress
    }
  }

  if (isDao) {
    const [parentVersion, parentAdmin, { name, image_url }] = await Promise.all(
      [
        queryClient
          .fetchQuery(
            contractQueries.info({
              chainId: parentChainId,
              address: parentDaoAddress,
            })
          )
          .then(({ info }) => parseContractVersion(info.version)),
        queryClient.fetchQuery(
          daoDaoCoreQueries.admin({
            chainId: parentChainId,
            contractAddress: parentDaoAddress,
          })
        ),
        queryClient.fetchQuery(
          daoDaoCoreQueries.config({
            chainId: parentChainId,
            contractAddress: parentDaoAddress,
          })
        ),
      ]
    )

    // Check if parent has registered the SubDAO.
    const registeredSubDao =
      !!subDaoAddress &&
      isFeatureSupportedByVersion(Feature.SubDaos, parentVersion) &&
      (
        await queryClient.fetchQuery(
          daoQueries.listAllSubDaos({
            chainId: parentChainId,
            address: parentDaoAddress,
          })
        )
      ).some(({ addr }) => addr === subDaoAddress)

    // Recursively fetch parent.
    const parentDao =
      parentAdmin && parentAdmin !== parentDaoAddress
        ? await queryClient
            .fetchQuery(
              daoQueries.parentInfo({
                chainId: parentChainId,
                parentAddress: parentAdmin,
                subDaoAddress: parentDaoAddress,
                // Add address to ignore list to prevent infinite loops.
                ignoreParents: [...(ignoreParents || []), parentDaoAddress],
              })
            )
            .catch(() => null)
        : null

    return {
      chainId: parentChainId,
      coreAddress: parentDaoAddress,
      coreVersion: parentVersion,
      name,
      imageUrl: image_url || getFallbackImage(parentDaoAddress),
      admin: parentAdmin ?? '',
      registeredSubDao,
      parentDao,
      polytoneProxy,
    }
  } else {
    // If address is the chain's x/gov module...
    const isGov = await queryClient.fetchQuery(
      chainQueries.isAddressModule({
        chainId,
        address: parentAddress,
        moduleName: 'gov',
      })
    )
    if (isGov) {
      const chainDaoInfo = getDaoInfoForChainId(chainId, [])
      return {
        chainId,
        coreAddress: chainDaoInfo.coreAddress,
        coreVersion: chainDaoInfo.coreVersion,
        name: chainDaoInfo.name,
        imageUrl: chainDaoInfo.imageUrl,
        admin: '',
        registeredSubDao:
          !!subDaoAddress &&
          !!getSupportedChainConfig(chainId)?.subDaos?.includes(subDaoAddress),
        parentDao: null,
        polytoneProxy: null,
      }
    }
  }

  throw new Error('Parent is not a DAO nor the chain governance module')
}

/**
 * Fetch DAO info for all of a DAO's SubDAOs.
 */
export const fetchSubDaoInfos = async (
  queryClient: QueryClient,
  { chainId, coreAddress }: DaoSource
): Promise<DaoInfo[]> => {
  const subDaos = await queryClient.fetchQuery(
    daoQueries.listAllSubDaos({
      chainId,
      address: coreAddress,
    })
  )

  return await Promise.all(
    subDaos.map(({ chainId, addr }) =>
      queryClient.fetchQuery(daoQueries.info({ chainId, coreAddress: addr }))
    )
  )
}

/**
 * Fetch DAO info for all of a chain's SubDAOs.
 */
export const fetchChainSubDaoInfos = (
  queryClient: QueryClient,
  { chainId }: { chainId: string }
): Promise<DaoInfo[]> =>
  Promise.all(
    (getSupportedChainConfig(chainId)?.subDaos || []).map((coreAddress) =>
      queryClient.fetchQuery(daoQueries.info({ chainId, coreAddress }))
    )
  )

/**
 * Fetch a DAO's TVL.
 */
export const fetchDaoTvl = async (
  queryClient: QueryClient,
  { chainId, coreAddress }: DaoSource
): Promise<AmountWithTimestamp> => {
  // Native chain x/gov module.
  if (isConfiguredChainName(chainId, coreAddress)) {
    coreAddress =
      // Use real gov DAO's address if exists.
      getSupportedChainConfig(chainId)?.govContractAddress ||
      COMMUNITY_POOL_ADDRESS_PLACEHOLDER
  }

  const { total: amount } = (await queryClient.fetchQuery(
    indexerQueries.snapper<{ total: number }>({
      query: 'daodao-tvl',
      parameters: {
        chainId,
        address: coreAddress,
      },
    })
  )) || {
    total: NaN,
  }

  return {
    amount,
    timestamp: Date.now(),
  }
}

/**
 * Fetch chain DAO voting power-shaped response.
 */
export const fetchChainVotingPower = async (
  queryClient: QueryClient,
  options: Parameters<typeof chainQueries.nativeStakedBalance>[0]
): Promise<VotingPowerAtHeightResponse> => ({
  power: (
    await queryClient.fetchQuery(chainQueries.nativeStakedBalance(options))
  ).amount,
  height: -1,
})

/**
 * Fetch chain DAO total power-shaped response.
 */
export const fetchChainTotalPower = async (
  queryClient: QueryClient,
  options: Parameters<typeof chainQueries.totalNativeStakedBalance>[0]
): Promise<TotalPowerAtHeightResponse> => ({
  power: await queryClient.fetchQuery(
    chainQueries.totalNativeStakedBalance(options)
  ),
  height: -1,
})

/**
 * List all SubDAOs for a DAO.
 */
export const listAllSubDaos = async (
  queryClient: QueryClient,
  {
    chainId,
    address,
    onlyAdmin,
  }: {
    chainId: string
    address: string
    /**
     * Only include SubDAOs that this DAO is the admin of, meaning this DAO can
     * execute on behalf of the SubDAO. Defaults to false.
     */
    onlyAdmin?: boolean
  }
): Promise<SubDaoWithChainId[]> => {
  const accounts = onlyAdmin
    ? await queryClient.fetchQuery(
        accountQueries.list({
          chainId,
          address,
        })
      )
    : []

  let subDaos: SubDao[] | undefined

  try {
    const indexerSubDaos = await queryClient.fetchQuery(
      indexerQueries.queryContract<SubDao[]>({
        chainId,
        contractAddress: address,
        formula: 'daoCore/listSubDaos',
      })
    )
    if (indexerSubDaos) {
      subDaos = indexerSubDaos
    }
  } catch (error) {
    console.error(error)
  }

  // If indexer query fails, fallback to contract query.
  if (!subDaos) {
    subDaos = []
    const limit = 30
    while (true) {
      const page = await queryClient.fetchQuery(
        daoDaoCoreQueries.listSubDaos({
          chainId,
          contractAddress: address,
          args: {
            limit,
            startAfter: subDaos.length
              ? subDaos[subDaos.length - 1]?.addr
              : undefined,
          },
        })
      )
      if (!page.length) {
        break
      }

      subDaos.push(...page)

      // If we have less than the limit of subDaos, we've exhausted them.
      if (page.length < limit) {
        break
      }
    }
  }

  const subDaosWithChainId = (
    await Promise.all(
      subDaos.map(async (subDao): Promise<SubDaoWithChainId | []> => {
        let subDaoChainId = chainId
        let subDaoAddress = subDao.addr

        let [isDao, isPolytoneProxy] = await Promise.all([
          queryClient.fetchQuery(
            contractQueries.isDao({
              chainId: subDaoChainId,
              address: subDaoAddress,
            })
          ),
          queryClient.fetchQuery(
            contractQueries.isPolytoneProxy({
              chainId: subDaoChainId,
              address: subDaoAddress,
            })
          ),
        ])

        // Reverse lookup polytone proxy and verify it's a DAO.
        if (isPolytoneProxy) {
          try {
            const { chainId: remoteChainId, remoteAddress } =
              await queryClient.fetchQuery(
                polytoneQueries.reverseLookupProxy({
                  chainId: subDaoChainId,
                  address: subDaoAddress,
                })
              )

            const remoteIsDao = await queryClient.fetchQuery(
              contractQueries.isDao({
                chainId: remoteChainId,
                address: remoteAddress,
              })
            )

            if (remoteIsDao) {
              isDao = true
              subDaoChainId = remoteChainId
              subDaoAddress = remoteAddress
            }
          } catch (error) {
            console.error(error)
          }
        }

        if (isDao) {
          // Filter SubDAO by admin if specified.
          if (onlyAdmin) {
            const admin = await queryClient.fetchQuery(
              daoDaoCoreQueries.admin({
                chainId: subDaoChainId,
                contractAddress: subDaoAddress,
              })
            )

            // Check if any of DAO's accounts are the admin. This ensures we
            // support cross-chain SubDAO/parent DAO relationships where
            // polytone proxies are used.
            const daoHasAdminAccount = accounts.some(
              (a) => a.chainId === subDaoChainId && a.address === admin
            )

            if (!daoHasAdminAccount) {
              return []
            }
          }

          return {
            chainId: subDaoChainId,
            addr: subDaoAddress,
            ...(subDao.charter !== undefined && {
              charter: subDao.charter,
            }),
          }
        }

        return []
      })
    )
  ).flat()

  return subDaosWithChainId
}

/**
 * List all DAOs a wallet is the admin of.
 */
export const listWalletAdminOfDaos = async (
  queryClient: QueryClient,
  {
    chainId,
    address,
  }: {
    chainId: string
    address: string
  }
): Promise<string[]> => {
  const walletAdminOfDaos = await queryClient.fetchQuery(
    indexerQueries.queryAccount({
      chainId,
      address,
      formula: 'daos/adminOf',
      noFallback: true,
    })
  )

  return walletAdminOfDaos && Array.isArray(walletAdminOfDaos)
    ? walletAdminOfDaos
    : []
}

/**
 * List all potential SubDAOs of the DAO.
 */
export const listPotentialSubDaos = async (
  queryClient: QueryClient,
  {
    chainId,
    address,
  }: {
    chainId: string
    address: string
  }
): Promise<string[]> => {
  const potentialSubDaos = await queryClient.fetchQuery(
    indexerQueries.queryContract<
      {
        contractAddress: string
        info: ContractVersionInfo
      }[]
    >({
      chainId,
      contractAddress: address,
      formula: 'daoCore/potentialSubDaos',
      noFallback: true,
    })
  )

  // Filter out those that do not appear to be DAO contracts and also the
  // contract itself since it is probably its own admin.
  return potentialSubDaos
    .filter(
      ({ contractAddress, info }) =>
        contractAddress !== address &&
        DAO_CORE_CONTRACT_NAMES.some((name) => info.contract.includes(name))
    )
    .map(({ contractAddress }) => contractAddress)
}

export const fetchProposalModules = async (
  queryClient: QueryClient,
  {
    chainId,
    coreAddress,
  }: {
    chainId: string
    coreAddress: string
  }
): Promise<ProposalModuleWithInfo[]> => {
  // Try indexer first.
  try {
    return await queryClient.fetchQuery(
      indexerQueries.queryContract({
        chainId,
        contractAddress: coreAddress,
        formula: 'daoCore/activeProposalModules',
        ttl: 1,
        allowedModes: [
          SupportedChainIndexerMode.Tx,
          SupportedChainIndexerMode.All,
        ],
      })
    )
  } catch (err) {
    // Ignore error.
    console.error(err)
  }

  // If indexer fails, fallback to querying chain.
  const cwClient = await getCosmWasmClientForChainId(chainId)

  const proposalModules: ProposalModuleWithInfo[] = []
  const limit = 10

  const getV1ProposalModules = async () =>
    Promise.all(
      (
        await new CwCoreV1QueryClient(cwClient, coreAddress).proposalModules({
          startAt:
            proposalModules.length > 0
              ? proposalModules[proposalModules.length - 1].address
              : undefined,
          limit,
        })
      )
        // Ignore first address if startAt was set.
        .slice(proposalModules.length > 0 ? 1 : 0)
        .map(async (address, index) => {
          const { info } = await queryClient.fetchQuery(
            contractQueries.info({
              chainId,
              address,
            })
          )

          return {
            address,
            prefix: indexToProposalModulePrefix(index),
            // V1 are all enabled.
            status: 'Enabled' as const,
            info,
          }
        })
    )

  const getV2ProposalModules = async () =>
    Promise.all(
      (
        await new DaoDaoCoreQueryClient(
          cwClient,
          coreAddress
        ).activeProposalModules({
          startAfter:
            proposalModules.length > 0
              ? proposalModules[proposalModules.length - 1].address
              : undefined,
          limit,
        })
      ).map(async (data) => {
        const { info } = await queryClient.fetchQuery(
          contractQueries.info({
            chainId,
            address: data.address,
          })
        )

        return {
          ...data,
          info,
        }
      })
    )

  const { info } = await queryClient.fetchQuery(
    contractQueries.info({
      chainId,
      address: coreAddress,
    })
  )
  const coreVersion = parseContractVersion(info.version)
  const fetcher =
    coreVersion === ContractVersion.V1
      ? getV1ProposalModules
      : getV2ProposalModules

  while (true) {
    const _proposalModules = await fetcher()
    proposalModules.push(..._proposalModules)
    if (_proposalModules.length < limit) {
      break
    }
  }

  return proposalModules
}

/**
 * Fetch lazy DAO card props.
 */
export const fetchLazyDaoCardProps = async (
  queryClient: QueryClient,
  { chainId, coreAddress }: DaoSource
): Promise<LazyDaoCardProps> => {
  // Native chain x/gov module.
  if (isConfiguredChainName(chainId, coreAddress)) {
    return {
      info: {
        chainId,
        coreAddress,
        coreVersion: ContractVersion.Gov,
        name: getDisplayNameForChainId(chainId),
        description: getChainGovernanceDaoDescription(chainId),
        imageUrl: getImageUrlForChainId(chainId),
      },
    }
  }

  // DAO.
  const [
    {
      info: { version },
    },
    config,
  ] = await Promise.all([
    queryClient.fetchQuery(
      contractQueries.info({
        chainId,
        address: coreAddress,
      })
    ),
    queryClient.fetchQuery(
      daoDaoCoreQueries.config({
        chainId,
        contractAddress: coreAddress,
      })
    ),
  ])

  const coreVersion = parseContractVersion(version)
  if (!coreVersion) {
    throw new Error('Failed to parse core version.')
  }

  return {
    info: {
      chainId,
      coreAddress,
      coreVersion,
      name: config.name,
      description: config.description,
      imageUrl: config.image_url || getFallbackImage(coreAddress),
    },
    isInactive: INACTIVE_DAO_NAMES.includes(config.name),
  }
}

/**
 * Fetch DAO dropdown info.
 */
export const fetchDaoDropdownInfo = async (
  queryClient: QueryClient,
  {
    chainId,
    coreAddress,
    parents,
    noSubDaos,
  }: DaoSource & {
    // Catch and prevent cycles.
    parents?: string[]
    noSubDaos?: boolean
  }
): Promise<DaoDropdownInfo> => {
  const isGovModule = isConfiguredChainName(chainId, coreAddress)
  // Native chain x/gov module.
  if (isGovModule) {
    const lazyInfo = await queryClient.fetchQuery(
      daoQueries.lazyDaoCardProps({
        chainId,
        coreAddress,
      })
    )
    const subDaos = await Promise.all(
      (getSupportedChainConfig(chainId)?.subDaos || []).map((subDaoAddress) =>
        queryClient.fetchQuery(
          daoQueries.daoDropdownInfo({
            chainId,
            coreAddress: subDaoAddress,
            // Add the current DAO to the parents to prevent cycles.
            parents: [...(parents ?? []), coreAddress],
            // Prevents cycles. If one of our children is also our
            // ancestor, don't let it load any children, but still load it
            // so we can see the cycle exists.
            noSubDaos: !!parents?.includes(subDaoAddress),
          })
        )
      )
    )

    return {
      chainId,
      coreAddress,
      imageUrl: lazyInfo.info.imageUrl,
      name: lazyInfo.info.name,
      subDaos,
    }
  }

  // DAOs.
  const [version, config] = await Promise.all([
    queryClient.fetchQuery(
      contractQueries.version({
        chainId,
        address: coreAddress,
      })
    ),
    queryClient.fetchQuery(
      daoDaoCoreQueries.config({
        chainId,
        contractAddress: coreAddress,
      })
    ),
  ])

  // Don't load SubDAOs if we shouldn't to prevent cycles.
  const subDaosList =
    !noSubDaos && isFeatureSupportedByVersion(Feature.SubDaos, version)
      ? await queryClient.fetchQuery(
          daoQueries.listAllSubDaos({
            chainId,
            address: coreAddress,
          })
        )
      : []

  const subDaos = await Promise.all(
    subDaosList.map(({ chainId, addr: subDaoAddress }) =>
      queryClient.fetchQuery(
        daoQueries.daoDropdownInfo({
          chainId,
          coreAddress: subDaoAddress,
          // Add the current DAO to the parents to prevent cycles.
          parents: [...(parents ?? []), coreAddress],
          // Prevents cycles. If one of our children is also our
          // ancestor, don't let it load any children, but still load it
          // so we can see the cycle exists.
          noSubDaos: !!parents?.includes(subDaoAddress),
        })
      )
    )
  )

  return {
    chainId,
    coreAddress,
    imageUrl: config.image_url || getFallbackImage(coreAddress),
    name: config.name,
    subDaos,
  }
}

/**
 * Fetch DAOs this DAO has enabled vetoable proposal listing for.
 */
export const fetchVetoableDaos = async (
  queryClient: QueryClient,
  { chainId, coreAddress }: DaoSource
): Promise<DaoSource[]> => {
  const daos = await queryClient.fetchQuery(
    daoDaoCoreQueries.listAllItems({
      chainId,
      contractAddress: coreAddress,
      args: {
        prefix: VETOABLE_DAOS_ITEM_KEY_PREFIX,
      },
    })
  )

  return daos.map(([key]) => {
    const [chainId, coreAddress] = key.split(':')
    return { chainId, coreAddress }
  })
}

/**
 * Fetch proposals which this DAO can currently veto in other DAOs.
 */
export const fetchDaosWithVetoableProposals = async (
  queryClient: QueryClient,
  {
    chainId,
    coreAddress,
    includeAll = false,
  }: DaoSource & {
    /**
     * Include even DAOs not added to the vetoable DAOs list. By default, this
     * will filter out DAOs not explicitly registered in the list.
     */
    includeAll?: boolean
  }
): Promise<DaoWithVetoableProposals[]> => {
  const accounts = await queryClient.fetchQuery(
    accountQueries.list({
      chainId,
      address: coreAddress,
    })
  )

  // Load DAOs this DAO has enabled vetoable proposal listing for.
  const vetoableDaos =
    !includeAll &&
    (await queryClient.fetchQuery(
      contractQueries.isDao({
        chainId,
        address: coreAddress,
      })
    ))
      ? await queryClient
          .fetchQuery(
            daoQueries.vetoableDaos({
              chainId,
              coreAddress,
            })
          )
          .catch(() => [])
      : []

  const daoVetoableProposalsPerChain = (
    await Promise.all(
      accounts.map(({ chainId, address }) =>
        queryClient.fetchQuery(
          indexerQueries.queryAccount<IndexerDaoWithVetoableProposals[] | null>(
            {
              chainId,
              address,
              formula: 'veto/vetoableProposals',
              noFallback: true,
            }
          )
        )
      )
    )
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
    daoVetoableProposalsPerChain.map(({ chainId, dao }) => `${chainId}:${dao}`)
  )

  const daoConfigs = await Promise.all(
    uniqueChainsAndDaos.map((chainAndDao) => {
      const [chainId, coreAddress] = chainAndDao.split(':')
      return queryClient
        .fetchQuery(
          daoDaoCoreQueries.config({
            chainId,
            contractAddress: coreAddress,
          })
        )
        .catch(() => null)
    })
  )

  return uniqueChainsAndDaos.flatMap((chainAndDao, index) => {
    const config = daoConfigs[index]

    return config
      ? {
          chainId: chainAndDao.split(':')[0],
          dao: chainAndDao.split(':')[1],
          name: config.name,
          proposalsWithModule: daoVetoableProposalsPerChain.find(
            (vetoable) => `${vetoable.chainId}:${vetoable.dao}` === chainAndDao
          )!.proposalsWithModule,
        }
      : []
  })
}

/**
 * Fetch proposals which this DAO can currently veto, grouped by DAO with
 * dropdown info.
 */
export const fetchDaosWithDropdownVetoableProposalList = async (
  queryClient: QueryClient,
  {
    chainId,
    coreAddress,
    daoPageMode,
  }: DaoSource & {
    daoPageMode: DaoPageMode
  }
): Promise<
  DaoWithDropdownVetoableProposalList<StatefulProposalLineProps>[]
> => {
  const daosWithVetoableProposals = await queryClient.fetchQuery(
    daoQueries.daosWithVetoableProposals({
      chainId,
      coreAddress,
    })
  )

  const daoDropdownInfos = await Promise.all(
    daosWithVetoableProposals.map(({ chainId, dao }) =>
      queryClient
        .fetchQuery(
          daoQueries.daoDropdownInfo({
            chainId,
            coreAddress: dao,
          })
        )
        .catch(() => null)
    )
  )

  return daosWithVetoableProposals.flatMap(
    ({
      chainId,
      dao,
      proposalsWithModule,
    }): DaoWithDropdownVetoableProposalList<StatefulProposalLineProps> | [] => {
      const dropdownInfo = daoDropdownInfos.find(
        (info) => info && info.chainId === chainId && info.coreAddress === dao
      )
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
                proposalId: `${prefix}${id}`,
                proposalViewUrl: getDaoProposalPath(
                  daoPageMode,
                  dao,
                  `${prefix}${id}`
                ),
              })
            )
        ),
      }
    }
  )
}

export const daoQueries = {
  /**
   * Fetch DAO info.
   */
  info: (
    /**
     * If undefined, query will be disabled.
     */
    options: Parameters<typeof fetchDaoInfo>[1]
  ) =>
    queryOptions({
      queryKey: ['dao', 'info', options],
      queryFn: (ctx) => fetchDaoInfo(ctx.client, options),
    }),
  /**
   * Fetch DAO parent info.
   */
  parentInfo: (options: Parameters<typeof fetchDaoParentInfo>[1]) =>
    queryOptions({
      queryKey: ['dao', 'parentInfo', options],
      queryFn: (ctx) => fetchDaoParentInfo(ctx.client, options),
    }),
  /**
   * Fetch DAO info for all of a DAO's SubDAOs.
   */
  subDaoInfos: (options: Parameters<typeof fetchSubDaoInfos>[1]) =>
    queryOptions({
      queryKey: ['dao', 'subDaoInfos', options],
      queryFn: (ctx) => fetchSubDaoInfos(ctx.client, options),
    }),
  /**
   * Fetch DAO info for all of a chain's SubDAOs.
   */
  chainSubDaoInfos: (options: Parameters<typeof fetchChainSubDaoInfos>[1]) =>
    queryOptions({
      queryKey: ['dao', 'chainSubDaoInfos', options],
      queryFn: (ctx) => fetchChainSubDaoInfos(ctx.client, options),
    }),
  /**
   * Fetch featured DAOs.
   */
  listFeatured: () =>
    indexerQueries.snapper<DaoSource[]>({
      query: 'daodao-featured-daos',
    }),
  /**
   * Fetch a DAO's TVL.
   */
  tvl: (options: Parameters<typeof fetchDaoTvl>[1]) =>
    queryOptions<AmountWithTimestamp>({
      queryKey: ['dao', 'tvl', options],
      queryFn: (ctx) => fetchDaoTvl(ctx.client, options),
    }),
  /**
   * Fetch chain DAO voting power-shaped response.
   */
  chainVotingPower: (options: Parameters<typeof fetchChainVotingPower>[1]) =>
    queryOptions<VotingPowerAtHeightResponse>({
      queryKey: ['dao', 'chainVotingPower', options],
      queryFn: (ctx) => fetchChainVotingPower(ctx.client, options),
    }),
  /**
   * Fetch chain DAO total power-shaped response.
   */
  chainTotalPower: (options: Parameters<typeof fetchChainTotalPower>[1]) =>
    queryOptions<TotalPowerAtHeightResponse>({
      queryKey: ['dao', 'chainTotalPower', options],
      queryFn: (ctx) => fetchChainTotalPower(ctx.client, options),
    }),
  /**
   * List all SubDAOs for a DAO.
   */
  listAllSubDaos: (options: Parameters<typeof listAllSubDaos>[1]) =>
    queryOptions<SubDaoWithChainId[]>({
      queryKey: ['dao', 'listAllSubDaos', options],
      queryFn: (ctx) => listAllSubDaos(ctx.client, options),
    }),
  /**
   * List all DAOs a wallet is the admin of.
   */
  listWalletAdminOfDaos: (
    options: Parameters<typeof listWalletAdminOfDaos>[1]
  ) =>
    queryOptions<string[]>({
      queryKey: ['dao', 'listWalletAdminOfDaos', options],
      queryFn: (ctx) => listWalletAdminOfDaos(ctx.client, options),
    }),
  /**
   * List all potential SubDAOs of the DAO.
   */
  listPotentialSubDaos: (options: Parameters<typeof listPotentialSubDaos>[1]) =>
    queryOptions<string[]>({
      queryKey: ['dao', 'listPotentialSubDaos', options],
      queryFn: (ctx) => listPotentialSubDaos(ctx.client, options),
    }),
  /**
   * List all potential approval DAOs.
   */
  listPotentialApprovalDaos: ({
    chainId,
    address,
  }: {
    chainId: string
    address: string
  }) =>
    indexerQueries.queryContract<
      {
        dao: string
        preProposeAddress: string
      }[]
    >({
      chainId,
      contractAddress: address,
      formula: 'daoCore/approvalDaos',
      noFallback: true,
    }),
  /**
   * Search DAO proposals.
   */
  searchProposals: (options: SearchDaoProposalsOptions) =>
    queryOptions({
      queryKey: ['dao', 'searchProposals', options],
      queryFn: () => searchDaoProposals(options),
    }),
  /**
   * List all DAO members.
   */
  listMembers: ({ chainId, address }: { chainId: string; address: string }) =>
    indexerQueries.queryContract<
      {
        address: string
        votingPowerPercent: number
      }[]
    >({
      chainId,
      contractAddress: address,
      formula: 'daoCore/listMembers',
      noFallback: true,
    }),
  /**
   * Load proposal modules with info.
   */
  proposalModules: (options: Parameters<typeof fetchProposalModules>[1]) =>
    queryOptions({
      queryKey: ['dao', 'proposalModules', options],
      queryFn: (ctx) => fetchProposalModules(ctx.client, options),
    }),
  /**
   * Fetch lazy DAO card props.
   */
  lazyDaoCardProps: (options: Parameters<typeof fetchLazyDaoCardProps>[1]) =>
    queryOptions({
      queryKey: ['dao', 'lazyDaoCardProps', options],
      queryFn: (ctx) => fetchLazyDaoCardProps(ctx.client, options),
    }),
  /**
   * Fetch DAO dropdown info.
   */
  daoDropdownInfo: (options: Parameters<typeof fetchDaoDropdownInfo>[1]) =>
    queryOptions({
      queryKey: ['dao', 'daoDropdownInfo', options],
      queryFn: (ctx) => fetchDaoDropdownInfo(ctx.client, options),
    }),
  /**
   * Fetch DAOs this DAO has enabled vetoable proposal listing for.
   */
  vetoableDaos: (options: Parameters<typeof fetchVetoableDaos>[1]) =>
    queryOptions({
      queryKey: ['dao', 'vetoableDaos', options],
      queryFn: (ctx) => fetchVetoableDaos(ctx.client, options),
    }),
  /**
   * Fetch DAOs with vetoable proposals.
   */
  daosWithVetoableProposals: (
    options: Parameters<typeof fetchDaosWithVetoableProposals>[1]
  ) =>
    queryOptions({
      queryKey: ['dao', 'daosWithVetoableProposals', options],
      queryFn: (ctx) => fetchDaosWithVetoableProposals(ctx.client, options),
    }),
  /**
   * Fetch proposals which this DAO can currently veto, grouped by DAO with
   * dropdown info.
   */
  daosWithDropdownVetoableProposalList: (
    options: Parameters<typeof fetchDaosWithDropdownVetoableProposalList>[1]
  ) =>
    queryOptions({
      queryKey: ['dao', 'daosWithDropdownVetoableProposalList', options],
      queryFn: (ctx) =>
        fetchDaosWithDropdownVetoableProposalList(ctx.client, options),
    }),
}
