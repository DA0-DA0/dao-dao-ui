import { QueryClient, queryOptions, skipToken } from '@tanstack/react-query'

import {
  accountQueries,
  chainQueries,
  contractQueries,
  polytoneQueries,
  votingModuleQueries,
} from '@dao-dao/state/query'
import { daoDaoCoreQueries } from '@dao-dao/state/query/queries/contracts/DaoDaoCore'
import {
  DaoInfo,
  DaoParentInfo,
  DaoSource,
  Feature,
  InfoResponse,
  ProposalModule,
} from '@dao-dao/types'
import {
  getDaoInfoForChainId,
  getFallbackImage,
  getSupportedChainConfig,
  getSupportedFeatures,
  isConfiguredChainName,
  isFeatureSupportedByVersion,
  parseContractVersion,
  polytoneNoteProxyMapToChainIdMap,
} from '@dao-dao/utils'

import { fetchProposalModules } from '../utils'

/**
 * Fetch DAO proposal modules.
 */
export const fetchDaoProposalModules = async (
  queryClient: QueryClient,
  { chainId, coreAddress }: DaoSource
): Promise<ProposalModule[]> => {
  const coreVersion = parseContractVersion(
    (
      await queryClient.fetchQuery(
        contractQueries.info(queryClient, {
          chainId,
          address: coreAddress,
        })
      )
    ).info.version
  )

  return await fetchProposalModules(
    queryClient,
    chainId,
    coreAddress,
    coreVersion
  )
}

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
        accountQueries.list(queryClient, {
          chainId,
          address: govModuleAddress,
        })
      )

      return getDaoInfoForChainId(chainId, accounts)
    }
  }

  // Get DAO info from contract.

  const state = await queryClient.fetchQuery(
    daoDaoCoreQueries.dumpState(queryClient, {
      chainId,
      contractAddress: coreAddress,
    })
  )

  const coreVersion = parseContractVersion(state.version.version)
  const supportedFeatures = getSupportedFeatures(coreVersion)

  const [
    parentDao,
    votingModuleInfo,
    created,
    proposalModules,
    _items,
    polytoneProxies,
    accounts,
    isActive,
    activeThreshold,
  ] = await Promise.all([
    state.admin && state.admin !== coreAddress
      ? queryClient
          .fetchQuery(
            daoQueries.parentInfo(queryClient, {
              chainId,
              parentAddress: state.admin,
              subDaoAddress: coreAddress,
            })
          )
          .catch(() => null)
      : null,
    // Check if indexer returned this already.
    'votingModuleInfo' in state
      ? ({ info: state.votingModuleInfo } as InfoResponse)
      : queryClient.fetchQuery(
          contractQueries.info(queryClient, {
            chainId,
            address: state.voting_module,
          })
        ),
    // Check if indexer returned this already.
    'createdAt' in state && state.createdAt
      ? Date.parse(state.createdAt)
      : queryClient
          .fetchQuery(
            contractQueries.instantiationTime(queryClient, {
              chainId,
              address: coreAddress,
            })
          )
          .catch(() => null),
    queryClient.fetchQuery(
      daoQueries.proposalModules(queryClient, {
        chainId,
        coreAddress,
      })
    ),
    queryClient.fetchQuery(
      daoDaoCoreQueries.listAllItems(queryClient, {
        chainId,
        contractAddress: coreAddress,
      })
    ),
    // Check if indexer returned this already.
    'polytoneProxies' in state && state.polytoneProxies
      ? polytoneNoteProxyMapToChainIdMap(chainId, state.polytoneProxies)
      : queryClient.fetchQuery(
          polytoneQueries.proxies(queryClient, {
            chainId,
            address: coreAddress,
          })
        ),
    queryClient.fetchQuery(
      accountQueries.list(queryClient, {
        chainId,
        address: coreAddress,
      })
    ),

    // Some voting modules don't support the active threshold queries, so if the
    // queries fail, assume active and no threshold.
    queryClient
      .fetchQuery(
        votingModuleQueries.isActive({
          chainId,
          address: state.voting_module,
        })
      )
      // If isActive query fails, just assume it is.
      .catch(() => true),
    queryClient
      .fetchQuery(
        votingModuleQueries.activeThresold(queryClient, {
          chainId,
          address: state.voting_module,
        })
      )
      .then(({ active_threshold }) => active_threshold || null)
      .catch(() => null),
  ])

  const votingModuleContractName = votingModuleInfo.info.contract

  // Convert items list into map.
  const items = Object.fromEntries(_items)

  return {
    chainId,
    coreAddress,
    coreVersion,
    supportedFeatures,
    votingModuleAddress: state.voting_module,
    votingModuleContractName,
    proposalModules,
    admin: state.admin,
    name: state.config.name,
    description: state.config.description,
    imageUrl: state.config.image_url || getFallbackImage(coreAddress),
    created,
    isActive,
    activeThreshold,
    items,
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
  // If address is a DAO contract...
  const isDao = await queryClient.fetchQuery(
    contractQueries.isDao(queryClient, {
      chainId,
      address: parentAddress,
    })
  )

  if (isDao) {
    const [parentVersion, parentAdmin, { name, image_url }] = await Promise.all(
      [
        queryClient
          .fetchQuery(
            contractQueries.info(queryClient, {
              chainId,
              address: parentAddress,
            })
          )
          .then(({ info }) => parseContractVersion(info.version)),
        queryClient.fetchQuery(
          daoDaoCoreQueries.admin(queryClient, {
            chainId,
            contractAddress: parentAddress,
          })
        ),
        queryClient.fetchQuery(
          daoDaoCoreQueries.config(queryClient, {
            chainId,
            contractAddress: parentAddress,
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
          daoDaoCoreQueries.listAllSubDaos(queryClient, {
            chainId,
            contractAddress: parentAddress,
          })
        )
      ).some(({ addr }) => addr === subDaoAddress)

    // Recursively fetch parent.
    const parentDao =
      parentAdmin && parentAdmin !== parentAddress
        ? await queryClient
            .fetchQuery(
              daoQueries.parentInfo(queryClient, {
                chainId,
                parentAddress: parentAdmin,
                subDaoAddress: parentAddress,
                // Add address to ignore list to prevent infinite loops.
                ignoreParents: [...(ignoreParents || []), parentAddress],
              })
            )
            .catch(() => null)
        : null

    return {
      chainId,
      coreAddress: parentAddress,
      coreVersion: parentVersion,
      name,
      imageUrl: image_url || getFallbackImage(parentAddress),
      admin: parentAdmin ?? '',
      registeredSubDao,
      parentDao,
    }
  } else {
    // If address is the chain's x/gov module...
    const isGov = await queryClient.fetchQuery(
      chainQueries.isAddressModule(queryClient, {
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
    daoDaoCoreQueries.listAllSubDaos(queryClient, {
      chainId,
      contractAddress: coreAddress,
    })
  )

  return await Promise.all(
    subDaos.map(({ addr }) =>
      queryClient.fetchQuery(
        daoQueries.info(queryClient, { chainId, coreAddress: addr })
      )
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
      queryClient.fetchQuery(
        daoQueries.info(queryClient, { chainId, coreAddress })
      )
    )
  )

export const daoQueries = {
  /**
   * Fetch DAO proposal modules.
   */
  proposalModules: (
    queryClient: QueryClient,
    options: Parameters<typeof fetchDaoProposalModules>[1]
  ) =>
    queryOptions({
      queryKey: ['dao', 'proposalModules', options],
      queryFn: () => fetchDaoProposalModules(queryClient, options),
    }),
  /**
   * Fetch DAO info.
   */
  info: (
    queryClient: QueryClient,
    /**
     * If undefined, query will be disabled.
     */
    options?: Parameters<typeof fetchDaoInfo>[1]
  ) =>
    queryOptions({
      queryKey: ['dao', 'info', options],
      queryFn: options ? () => fetchDaoInfo(queryClient, options) : skipToken,
    }),
  /**
   * Fetch DAO parent info.
   */
  parentInfo: (
    queryClient: QueryClient,
    /**
     * If undefined, query will be disabled.
     */
    options?: Parameters<typeof fetchDaoParentInfo>[1]
  ) =>
    queryOptions({
      queryKey: ['dao', 'parentInfo', options],
      queryFn: options
        ? () => fetchDaoParentInfo(queryClient, options)
        : skipToken,
    }),
  /**
   * Fetch DAO info for all of a DAO's SubDAOs.
   */
  subDaoInfos: (
    queryClient: QueryClient,
    options: Parameters<typeof fetchSubDaoInfos>[1]
  ) =>
    queryOptions({
      queryKey: ['dao', 'subDaoInfos', options],
      queryFn: () => fetchSubDaoInfos(queryClient, options),
    }),
  /**
   * Fetch DAO info for all of a chain's SubDAOs.
   */
  chainSubDaoInfos: (
    queryClient: QueryClient,
    options: Parameters<typeof fetchChainSubDaoInfos>[1]
  ) =>
    queryOptions({
      queryKey: ['dao', 'chainSubDaoInfos', options],
      queryFn: () => fetchChainSubDaoInfos(queryClient, options),
    }),
}
