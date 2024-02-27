import { Chain } from '@chain-registry/types'
import type { GetStaticProps, Redirect } from 'next'
import { TFunction } from 'next-i18next'
import removeMarkdown from 'remove-markdown'

import { serverSideTranslationsWithServerT } from '@dao-dao/i18n/serverSideTranslations'
import {
  DaoCoreV2QueryClient,
  DaoVotingCw20StakedQueryClient,
  PolytoneNoteQueryClient,
  queryIndexer,
} from '@dao-dao/state'
import {
  Account,
  AccountType,
  ActiveThreshold,
  CommonProposalInfo,
  ContractVersion,
  ContractVersionInfo,
  DaoPageMode,
  DaoParentInfo,
  Feature,
  IndexerDumpState,
  InfoResponse,
  PolytoneProxies,
  ProposalModule,
} from '@dao-dao/types'
import { ConfigResponse as ConfigV1Response } from '@dao-dao/types/contracts/CwCore.v1'
import {
  Config,
  ConfigResponse as ConfigV2Response,
  ListItemsResponse,
  ProposalModuleWithInfo,
} from '@dao-dao/types/contracts/DaoCore.v2'
import {
  CHAIN_SUBDAOS,
  CI,
  ContractName,
  DAO_CORE_ACCENT_ITEM_KEY,
  DAO_STATIC_PROPS_CACHE_SECONDS,
  INVALID_CONTRACT_ERROR_SUBSTRINGS,
  LEGACY_DAO_CONTRACT_NAMES,
  LEGACY_URL_PREFIX,
  MAX_META_CHARS_PROPOSAL_DESCRIPTION,
  addressIsModule,
  cosmWasmClientRouter,
  getChainForChainId,
  getChainIdForAddress,
  getDaoPath,
  getDisplayNameForChainId,
  getImageUrlForChainId,
  getRpcForChainId,
  getSupportedChainConfig,
  getSupportedFeatures,
  isFeatureSupportedByVersion,
  isValidBech32Address,
  parseContractVersion,
  polytoneNoteProxyMapToChainIdMap,
  processError,
  retry,
} from '@dao-dao/utils'
import { cosmos } from '@dao-dao/utils/protobuf'

import { DaoPageWrapperProps } from '../components'
import {
  ProposalModuleAdapterError,
  matchAndLoadAdapter,
} from '../proposal-module-adapter'
import {
  fetchProposalModules,
  fetchProposalModulesWithInfoFromChain,
} from '../utils/fetchProposalModules'

interface GetDaoStaticPropsMakerProps {
  leadingTitle?: string
  followingTitle?: string
  overrideTitle?: string
  overrideDescription?: string
  overrideImageUrl?: string
  additionalProps?: Record<string, any> | null | undefined
  url?: string
}

interface GetDaoStaticPropsMakerOptions {
  appMode: DaoPageMode
  coreAddress?: string
  getProps?: (options: {
    context: Parameters<GetStaticProps>[0]
    t: TFunction
    config: ConfigV1Response | ConfigV2Response
    chain: Chain
    coreAddress: string
    coreVersion: ContractVersion
    proposalModules: ProposalModule[]
  }) =>
    | GetDaoStaticPropsMakerProps
    | undefined
    | null
    | Promise<GetDaoStaticPropsMakerProps | undefined | null>
}

type GetDaoStaticPropsMaker = (
  options: GetDaoStaticPropsMakerOptions
) => GetStaticProps<DaoPageWrapperProps>

export class LegacyDaoError extends Error {
  constructor() {
    super()
    this.name = 'LegacyDaoError'
  }
}

// Computes DaoPageWrapperProps for the DAO with optional alterations.
export const makeGetDaoStaticProps: GetDaoStaticPropsMaker =
  ({ appMode, coreAddress: _coreAddress, getProps }) =>
  async (context) => {
    // Don't query chain if running in CI.
    if (CI) {
      return { notFound: true }
    }

    // Load server translations and get T function for use in getProps.
    const { i18nProps, serverT } = await serverSideTranslationsWithServerT(
      context.locale,
      ['translation']
    )

    const coreAddress = _coreAddress ?? context.params?.address

    // Get chain ID for address based on prefix.
    let chainId: string
    try {
      // If invalid address, display not found.
      if (!coreAddress || typeof coreAddress !== 'string') {
        throw new Error('Invalid address')
      }

      chainId = getChainIdForAddress(coreAddress)

      // Validation throws error if address prefix not recognized. Display not
      // found in this case.
    } catch (err) {
      console.error(err)

      // Excluding `info` will render DAONotFound.
      return {
        props: {
          ...i18nProps,
          title: serverT('title.daoNotFound'),
          description: err instanceof Error ? err.message : `${err}`,
        },
      }
    }

    // If address is polytone proxy, redirect to DAO on native chain.
    try {
      const addressInfo = await queryIndexer<ContractVersionInfo>({
        type: 'contract',
        chainId,
        address: coreAddress,
        formula: 'info',
      })
      if (addressInfo && addressInfo.contract === ContractName.PolytoneProxy) {
        // Get voice for this proxy on destination chain.
        const voice = await queryIndexer({
          type: 'contract',
          chainId,
          // proxy
          address: coreAddress,
          formula: 'polytone/proxy/instantiator',
        })

        const dao = await queryIndexer({
          type: 'contract',
          chainId,
          address: voice,
          formula: 'polytone/voice/remoteController',
          args: {
            // proxy
            address: coreAddress,
          },
        })

        return {
          redirect: {
            destination: getDaoPath(appMode, dao),
            permanent: true,
          },
        }
      }
    } catch {
      // If failed, ignore.
    }

    // Add to Sentry error tags if error occurs.
    let coreVersion: ContractVersion | undefined
    try {
      const {
        admin,
        config,
        version,
        votingModule: { address: votingModuleAddress, info: votingModuleInfo },
        activeProposalModules,
        created,
        isActive,
        activeThreshold,
        parentDao,
        items: _items,
        polytoneProxies,
      } = await daoCoreDumpState(chainId, coreAddress, serverT)
      coreVersion = version

      // If no contract name, will display fallback voting module adapter.
      const votingModuleContractName =
        (votingModuleInfo &&
          'contract' in votingModuleInfo &&
          votingModuleInfo.contract) ||
        'fallback'

      // Get DAO proposal modules.
      const proposalModules = await fetchProposalModules(
        chainId,
        coreAddress,
        coreVersion,
        activeProposalModules
      )

      // Convert items list into map.
      const items = _items.reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: value,
        }),
        {} as Record<string, string>
      )

      const accounts: Account[] = [
        // Current chain.
        {
          chainId,
          address: coreAddress,
          type: AccountType.Native,
        },
        // Polytone.
        ...Object.entries(polytoneProxies).map(
          ([chainId, address]): Account => ({
            chainId,
            address,
            type: AccountType.Polytone,
          })
        ),
        // The above accounts are the ones we already have. The rest of the
        // accounts are loaded once the page loads (in `DaoPageWrapper`) since
        // they are more complex and will probably expand over time.
      ]

      // Must be called after server side translations has been awaited, because
      // props may use the `t` function, and it won't be available until after.
      const {
        leadingTitle,
        followingTitle,
        overrideTitle,
        overrideDescription,
        overrideImageUrl,
        additionalProps,
        url,
      } =
        (await getProps?.({
          context,
          t: serverT,
          config,
          chain: getChainForChainId(chainId),
          coreAddress,
          coreVersion,
          proposalModules,
        })) ?? {}

      const props: DaoPageWrapperProps = {
        ...i18nProps,
        url: url ?? null,
        title:
          overrideTitle ??
          [leadingTitle?.trim(), config.name.trim(), followingTitle?.trim()]
            .filter(Boolean)
            .join(' | '),
        description: overrideDescription ?? config.description,
        accentColor: items[DAO_CORE_ACCENT_ITEM_KEY] || null,
        serializedInfo: {
          chainId,
          coreAddress,
          coreVersion,
          supportedFeatures: getSupportedFeatures(coreVersion),
          votingModuleAddress,
          votingModuleContractName,
          proposalModules,
          name: config.name,
          description: config.description,
          imageUrl: overrideImageUrl ?? config.image_url ?? null,
          created: created?.toJSON() ?? null,
          isActive,
          activeThreshold,
          items,
          polytoneProxies,
          accounts,
          parentDao,
          admin: admin ?? null,
        },
        ...additionalProps,
      }

      return {
        props,
        // Regenerate the page at most once per `revalidate` seconds. Serves
        // cached copy and refreshes in background.
        revalidate: DAO_STATIC_PROPS_CACHE_SECONDS,
      }
    } catch (error) {
      // Redirect.
      if (error instanceof RedirectError) {
        return {
          redirect: error.redirect,
        }
      }

      // Redirect legacy DAOs (legacy multisigs redirected in next.config.js
      // redirects list).
      if (
        error instanceof LegacyDaoError ||
        (error instanceof Error &&
          error.message.includes(
            'Query failed with (18): Error parsing into type cw3_dao::msg::QueryMsg: unknown variant `dump_state`'
          ))
      ) {
        return {
          redirect: {
            destination:
              LEGACY_URL_PREFIX + getDaoPath(DaoPageMode.Dapp, coreAddress),
            permanent: false,
          },
        }
      }

      console.error(error)

      if (
        error instanceof Error &&
        (error.message.includes('contract: not found') ||
          error.message.includes('Error parsing into type') ||
          error.message.includes('decoding bech32 failed') ||
          error.message.includes('dumpState reason: Unexpected token'))
      ) {
        // Excluding `info` will render DAONotFound.
        return {
          props: {
            ...i18nProps,
            title: 'DAO not found',
            description: '',
          },
          // Regenerate the page at most once per second. Serves cached copy and
          // refreshes in background.
          revalidate: 1,
        }
      }

      // Return error in props to trigger client-side 500 error.
      return {
        props: {
          ...i18nProps,
          title: serverT('title.500'),
          description: '',
          // Report to Sentry.
          error: processError(error, {
            forceCapture: true,
            tags: {
              coreAddress,
              coreVersion: coreVersion ?? '<undefined>',
            },
            extra: { context },
          }),
        },
        // Regenerate the page at most once per second. Serves cached copy and
        // refreshes in background.
        revalidate: 1,
      }
    }
  }

interface GetDaoProposalStaticPropsMakerOptions
  extends Omit<GetDaoStaticPropsMakerOptions, 'getProps'> {
  getProposalUrlPrefix: (
    params: Record<string, string | string[] | undefined>
  ) => string
  proposalIdParamKey?: string
}

export const makeGetDaoProposalStaticProps = ({
  getProposalUrlPrefix,
  proposalIdParamKey = 'proposalId',
  ...options
}: GetDaoProposalStaticPropsMakerOptions) =>
  makeGetDaoStaticProps({
    ...options,
    getProps: async ({
      context: { params = {} },
      t,
      chain,
      coreAddress,
      proposalModules,
    }) => {
      const proposalId = params[proposalIdParamKey]

      // If invalid proposal ID, not found.
      if (typeof proposalId !== 'string') {
        return {
          followingTitle: t('title.proposalNotFound'),
          additionalProps: {
            proposalInfo: null,
          },
        }
      }

      let proposalInfo: CommonProposalInfo | null = null
      try {
        const {
          options: {
            proposalModule: { prefix },
          },
          adapter: {
            functions: { getProposalInfo },
          },
        } = await matchAndLoadAdapter(proposalModules, proposalId, {
          chain,
          coreAddress,
        })

        // If proposal is numeric, i.e. has no prefix, redirect to prefixed URL.
        if (!isNaN(Number(proposalId))) {
          throw new RedirectError({
            destination: getProposalUrlPrefix(params) + prefix + proposalId,
            permanent: true,
          })
        }

        // undefined if proposal does not exist.
        proposalInfo = (await getProposalInfo()) ?? null
      } catch (error) {
        // Rethrow.
        if (error instanceof RedirectError) {
          throw error
        }

        // If ProposalModuleAdapterError, treat as 404 below.
        // Otherwise display 500.
        if (!(error instanceof ProposalModuleAdapterError)) {
          // Report to Sentry.
          processError(error)

          console.error(error)
          // Throw error to trigger 500.
          throw new Error(t('error.unexpectedError'))
        }
      }

      return {
        url: getProposalUrlPrefix(params) + proposalId,
        followingTitle: proposalInfo
          ? proposalInfo.title
          : t('title.proposalNotFound'),
        overrideDescription: removeMarkdown(
          proposalInfo?.description ?? ''
        ).slice(0, MAX_META_CHARS_PROPOSAL_DESCRIPTION),
        additionalProps: {
          // If proposal does not exist, null indicates 404.
          proposalInfo,
        },
      }
    },
  })

export class RedirectError {
  constructor(public redirect: Redirect) {}
}

const loadParentDaoInfo = async (
  chainId: string,
  subDaoAddress: string,
  potentialParentAddress: string | null | undefined,
  serverT: TFunction,
  // Prevent cycles by ensuring admin has not already been seen.
  previousParentAddresses: string[]
): Promise<Omit<DaoParentInfo, 'registeredSubDao'> | null> => {
  // If no admin, or admin is set to itself, or admin is a wallet, no parent
  // DAO.
  if (
    !potentialParentAddress ||
    potentialParentAddress === subDaoAddress ||
    previousParentAddresses?.includes(potentialParentAddress)
  ) {
    return null
  }

  try {
    // Check if address is chain module account.
    const cosmosClient = await retry(
      10,
      async (attempt) =>
        (
          await cosmos.ClientFactory.createRPCQueryClient({
            rpcEndpoint: getRpcForChainId(chainId, attempt - 1),
          })
        ).cosmos
    )
    // If chain module gov account...
    if (await addressIsModule(cosmosClient, potentialParentAddress, 'gov')) {
      const chainConfig = getSupportedChainConfig(chainId)
      return chainConfig
        ? {
            chainId,
            coreAddress: chainConfig.name,
            coreVersion: ContractVersion.Gov,
            name: getDisplayNameForChainId(chainId),
            imageUrl: getImageUrlForChainId(chainId),
            parentDao: null,
            admin: '',
          }
        : null
    }

    if (
      !isValidBech32Address(
        potentialParentAddress,
        getChainForChainId(chainId).bech32_prefix
      )
    ) {
      return null
    }

    const {
      admin,
      version,
      config: { name, image_url },
      parentDao,
    } = await daoCoreDumpState(chainId, potentialParentAddress, serverT, [
      ...(previousParentAddresses ?? []),
      potentialParentAddress,
    ])

    return {
      chainId,
      coreAddress: potentialParentAddress,
      coreVersion: version,
      name: name,
      imageUrl: image_url ?? null,
      parentDao,
      admin: admin ?? null,
    }
  } catch (err) {
    // If contract not found, ignore error. Otherwise, log it.
    if (
      !(err instanceof Error) ||
      !INVALID_CONTRACT_ERROR_SUBSTRINGS.some((substring) =>
        (err as Error).message.includes(substring)
      )
    ) {
      console.error(err)
      console.error(
        `Error loading parent DAO (${potentialParentAddress}) of ${subDaoAddress}`,
        processError(err)
      )
    }

    // Don't prevent page render if failed to load parent DAO info.
    return null
  }
}

const ITEM_LIST_LIMIT = 30

interface DaoCoreDumpState {
  admin: string
  config: Config
  version: ContractVersion
  votingModule: {
    address: string
    info: ContractVersionInfo
  }
  activeProposalModules: ProposalModuleWithInfo[]
  created: Date | undefined
  parentDao: DaoParentInfo | null
  items: ListItemsResponse
  polytoneProxies: PolytoneProxies
  isActive: boolean
  activeThreshold: ActiveThreshold | null
}

const daoCoreDumpState = async (
  chainId: string,
  coreAddress: string,
  serverT: TFunction,
  // Prevent cycles by ensuring admin has not already been seen.
  previousParentAddresses?: string[]
): Promise<DaoCoreDumpState> => {
  const cwClient = await retry(
    10,
    async (attempt) =>
      await cosmWasmClientRouter.connect(getRpcForChainId(chainId, attempt - 1))
  )

  try {
    const indexerDumpedState = await queryIndexer<IndexerDumpState>({
      type: 'contract',
      address: coreAddress,
      formula: 'daoCore/dumpState',
      chainId,
    })

    // Use data from indexer if present.
    if (indexerDumpedState) {
      if (
        LEGACY_DAO_CONTRACT_NAMES.includes(indexerDumpedState.version?.contract)
      ) {
        throw new LegacyDaoError()
      }

      const coreVersion = parseContractVersion(
        indexerDumpedState.version.version
      )
      if (!coreVersion) {
        throw new Error(serverT('error.failedParsingCoreVersion'))
      }

      const items =
        (await queryIndexer<ListItemsResponse>({
          type: 'contract',
          address: coreAddress,
          formula: 'daoCore/listItems',
          chainId,
        })) ?? []

      const { admin } = indexerDumpedState

      const parentDaoInfo = await loadParentDaoInfo(
        chainId,
        coreAddress,
        admin,
        serverT,
        [...(previousParentAddresses ?? []), coreAddress]
      )

      // Convert to chainId -> proxy map.
      const polytoneProxies = polytoneNoteProxyMapToChainIdMap(
        chainId,
        indexerDumpedState.polytoneProxies || {}
      )

      let isActive = true
      let activeThreshold: ActiveThreshold | null = null
      try {
        // All voting modules use the same active queries, so it's safe to just
        // use one here.
        const client = new DaoVotingCw20StakedQueryClient(
          cwClient,
          indexerDumpedState.voting_module
        )
        isActive = (await client.isActive()).active
        activeThreshold =
          (await client.activeThreshold()).active_threshold || null
      } catch {
        // Some voting modules don't support the active queries, so if they
        // fail, assume it's active.
      }

      return {
        ...indexerDumpedState,
        version: coreVersion,
        votingModule: {
          address: indexerDumpedState.voting_module,
          info: indexerDumpedState.votingModuleInfo,
        },
        activeProposalModules: indexerDumpedState.proposal_modules.filter(
          ({ status }) => status === 'enabled' || status === 'Enabled'
        ),
        created: indexerDumpedState.createdAt
          ? new Date(indexerDumpedState.createdAt)
          : undefined,
        isActive,
        activeThreshold,
        items,
        parentDao: parentDaoInfo
          ? {
              ...parentDaoInfo,
              // Whether or not this parent has registered its child as a
              // SubDAO.
              registeredSubDao:
                indexerDumpedState.adminInfo?.registeredSubDao ??
                (parentDaoInfo.coreVersion === ContractVersion.Gov &&
                  CHAIN_SUBDAOS[chainId]?.includes(coreAddress)) ??
                false,
            }
          : null,
        polytoneProxies,
      }
    }
  } catch (error) {
    // Rethrow if legacy DAO.
    if (error instanceof LegacyDaoError) {
      throw error
    }

    // Ignore error. Fallback to querying chain below.
    console.error(error, processError(error))
  }

  const daoCoreClient = new DaoCoreV2QueryClient(cwClient, coreAddress)

  const dumpedState = await daoCoreClient.dumpState()
  if (LEGACY_DAO_CONTRACT_NAMES.includes(dumpedState.version.contract)) {
    throw new LegacyDaoError()
  }

  const [coreVersion, { info: votingModuleInfo }] = await Promise.all([
    parseContractVersion(dumpedState.version.version),
    (await cwClient.queryContractSmart(dumpedState.voting_module, {
      info: {},
    })) as InfoResponse,
  ])

  if (!coreVersion) {
    throw new Error(serverT('error.failedParsingCoreVersion'))
  }

  const proposalModules = await fetchProposalModulesWithInfoFromChain(
    chainId,
    coreAddress,
    coreVersion
  )

  // Get all items.
  const items: ListItemsResponse = []
  while (true) {
    const _items = await daoCoreClient.listItems({
      startAfter: items[items.length - 1]?.[0],
      limit: ITEM_LIST_LIMIT,
    })
    if (!_items.length) {
      break
    }

    items.push(..._items)

    // If we got less than the limit, we've reached the end.
    if (_items.length < ITEM_LIST_LIMIT) {
      break
    }
  }

  let isActive = true
  let activeThreshold: ActiveThreshold | null = null
  try {
    // All voting modules use the same active queries, so it's safe to just use
    // one here.
    const client = new DaoVotingCw20StakedQueryClient(
      cwClient,
      dumpedState.voting_module
    )
    isActive = (await client.isActive()).active
    activeThreshold = (await client.activeThreshold()).active_threshold || null
  } catch {
    // Some voting modules don't support the active queries, so if they fail,
    // assume it's active.
  }

  const { admin } = dumpedState
  const parentDao = await loadParentDaoInfo(
    chainId,
    coreAddress,
    admin,
    serverT,
    [...(previousParentAddresses ?? []), coreAddress]
  )
  let registeredSubDao = false
  // If parent DAO exists, check if this DAO is a SubDAO of the parent.
  if (parentDao) {
    if (
      parentDao.coreVersion !== ContractVersion.Gov &&
      isFeatureSupportedByVersion(Feature.SubDaos, parentDao.coreVersion)
    ) {
      const parentDaoCoreClient = new DaoCoreV2QueryClient(cwClient, admin)

      // Get all SubDAOs.
      const subdaoAddrs: string[] = []
      while (true) {
        const response = await parentDaoCoreClient.listSubDaos({
          startAfter: subdaoAddrs[subdaoAddrs.length - 1],
          limit: SUBDAO_LIST_LIMIT,
        })
        if (!response?.length) break

        subdaoAddrs.push(...response.map(({ addr }) => addr))

        // If we have less than the limit of items, we've exhausted them.
        if (response.length < SUBDAO_LIST_LIMIT) {
          break
        }
      }

      registeredSubDao = subdaoAddrs.includes(coreAddress)
    } else if (parentDao.coreVersion === ContractVersion.Gov) {
      registeredSubDao = !!CHAIN_SUBDAOS[chainId]?.includes(coreAddress)
    }
  }

  // Get DAO polytone proxies.
  const polytoneProxies = (
    await Promise.all(
      Object.entries(getSupportedChainConfig(chainId)?.polytone || {}).map(
        async ([chainId, { note }]) => {
          let proxy
          try {
            proxy = await queryIndexer<string>({
              type: 'contract',
              address: note,
              formula: 'polytone/note/remoteAddress',
              args: {
                address: coreAddress,
              },
              chainId,
            })
          } catch {
            // Ignore error.
          }
          if (!proxy) {
            const polytoneNoteClient = new PolytoneNoteQueryClient(
              cwClient,
              note
            )
            proxy =
              (await polytoneNoteClient.remoteAddress({
                localAddress: coreAddress,
              })) || undefined
          }

          return {
            chainId,
            proxy,
          }
        }
      )
    )
  ).reduce(
    (acc, { chainId, proxy }) => ({
      ...acc,
      ...(proxy
        ? {
            [chainId]: proxy,
          }
        : {}),
    }),
    {} as PolytoneProxies
  )

  return {
    ...dumpedState,
    version: coreVersion,
    votingModule: {
      address: dumpedState.voting_module,
      info: votingModuleInfo,
    },
    activeProposalModules: proposalModules.filter(
      ({ status }) => status === 'enabled' || status === 'Enabled'
    ),
    created: undefined,
    isActive,
    activeThreshold,
    items,
    parentDao: parentDao
      ? {
          ...parentDao,
          registeredSubDao,
        }
      : null,
    polytoneProxies,
  }
}

const SUBDAO_LIST_LIMIT = 30
