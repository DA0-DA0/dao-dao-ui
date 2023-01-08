import { fromBech32 } from '@cosmjs/encoding'
import axios from 'axios'
import type { GetStaticProps, Redirect } from 'next'
import { TFunction } from 'next-i18next'
import removeMarkdown from 'remove-markdown'

import { serverSideTranslationsWithServerT } from '@dao-dao/i18n/serverSideTranslations'
import { queryIndexer } from '@dao-dao/state'
import {
  CommonProposalInfo,
  ContractVersion,
  ContractVersionInfo,
  DaoParentInfo,
  IndexerDumpState,
  InfoResponse,
  ProposalModule,
} from '@dao-dao/types'
import { ConfigResponse as ConfigV1Response } from '@dao-dao/types/contracts/CwCore.v1'
import {
  Config,
  ConfigResponse as ConfigV2Response,
  DumpStateResponse,
  ProposalModuleWithInfo,
} from '@dao-dao/types/contracts/DaoCore.v2'
import {
  CHAIN_PREFIX_ID_MAP,
  CI,
  DAO_STATIC_PROPS_CACHE_SECONDS,
  LEGACY_URL_PREFIX,
  MAX_META_CHARS_PROPOSAL_DESCRIPTION,
  cosmWasmClientRouter,
  getRpcForChainId,
  isValidWalletAddress,
  parseContractVersion,
  processError,
  toAccessibleImageUrl,
  validateContractAddress,
} from '@dao-dao/utils'
import { FAST_AVERAGE_COLOR_API_TEMPLATE } from '@dao-dao/utils/constants'

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
  coreAddress?: string
  getProps?: (options: {
    context: Parameters<GetStaticProps>[0]
    t: TFunction
    config: ConfigV1Response | ConfigV2Response
    chainId: string
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
  options?: GetDaoStaticPropsMakerOptions
) => GetStaticProps<DaoPageWrapperProps>

// Computes DaoPageWrapperProps for the DAO with optional alterations.
export const makeGetDaoStaticProps: GetDaoStaticPropsMaker =
  ({ coreAddress: _coreAddress, getProps } = {}) =>
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
    // If invalid address, display not found.
    if (
      !coreAddress ||
      typeof coreAddress !== 'string' ||
      validateContractAddress(coreAddress) !== true
    ) {
      // Excluding `info` will render DAONotFound.
      return {
        props: {
          ...i18nProps,
          title: serverT('title.daoNotFound'),
          description: '',
        },
      }
    }

    // Get chain for the DAO based on its address prefix.
    const bech32Prefix = fromBech32(coreAddress).prefix
    // If address prefix is not recognized, display not found.
    if (!(bech32Prefix in CHAIN_PREFIX_ID_MAP)) {
      // Excluding `info` will render DAONotFound.
      return {
        props: {
          ...i18nProps,
          title: serverT('title.daoNotFound'),
          description: '',
        },
      }
    }
    const chainId =
      CHAIN_PREFIX_ID_MAP[bech32Prefix as keyof typeof CHAIN_PREFIX_ID_MAP]

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
          chainId,
          coreAddress,
          coreVersion,
          proposalModules,
        })) ?? {}

      // Get DAO accent color.
      let accentColor: string | null = null
      if (config.image_url) {
        try {
          const response = await axios.get(
            FAST_AVERAGE_COLOR_API_TEMPLATE.replace(
              'URL',
              toAccessibleImageUrl(config.image_url)
            ),
            { responseType: 'text' }
          )

          accentColor = response.data
        } catch (error) {
          // If fail to load image or get color, don't prevent page render.
          console.error(error)
        }
      }

      const parentDao = await loadParentDaoInfo(
        chainId,
        bech32Prefix,
        coreAddress,
        admin,
        serverT
      )

      const props: DaoPageWrapperProps = {
        ...i18nProps,
        url: url ?? null,
        title:
          overrideTitle ??
          [leadingTitle?.trim(), config.name.trim(), followingTitle?.trim()]
            .filter(Boolean)
            .join(' | '),
        description: overrideDescription ?? config.description,
        accentColor,
        serializedInfo: {
          chainId,
          bech32Prefix,
          coreAddress,
          coreVersion,
          votingModuleAddress,
          votingModuleContractName,
          proposalModules,
          name: config.name,
          description: config.description,
          imageUrl: overrideImageUrl ?? config.image_url ?? null,
          created: created?.toJSON() ?? null,
          parentDao,
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
        error instanceof Error &&
        error.message.includes(
          'Query failed with (18): Error parsing into type cw3_dao::msg::QueryMsg: unknown variant `config`'
        )
      ) {
        return {
          redirect: {
            destination: LEGACY_URL_PREFIX + `/dao/${coreAddress}`,
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
          error.message.includes('/dao/dumpState reason: Unexpected token'))
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
              chainId,
              coreAddress,
              coreVersion: coreVersion ?? '<undefined>',
              bech32Prefix,
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
      chainId,
      coreAddress,
      proposalModules,
    }) => {
      const proposalId = params[proposalIdParamKey]

      // If invalid proposal ID, not found.
      if (typeof proposalId !== 'string') {
        return {
          followingTitle: t('title.proposalNotFound'),
          additionalProps: {
            proposalInfo: undefined,
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
          chainId,
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
          // If proposal does not exist, undefined indicates 404.
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
  bech32Prefix: string,
  subDaoAddress: string,
  subDaoAdmin: string | null | undefined,
  serverT: TFunction,
  // Prevent cycles by ensuring admin has not already been seen.
  previousParentAddresses?: string[]
): Promise<DaoParentInfo | null> => {
  // If no admin, or admin is set to itself, or admin is a wallet, no parent
  // DAO.
  if (
    !subDaoAdmin ||
    subDaoAdmin === subDaoAddress ||
    isValidWalletAddress(subDaoAdmin, bech32Prefix)
  ) {
    return null
  }

  try {
    const {
      admin,
      config: { name, image_url },
    } = await daoCoreDumpState(chainId, subDaoAdmin, serverT)

    return {
      coreAddress: subDaoAdmin,
      name: name,
      imageUrl: image_url ?? null,
      parentDao:
        // If parent has already been loaded, do not recurse, to prevent
        // infinite cycles of parent DAOs.
        admin && previousParentAddresses?.includes(admin)
          ? null
          : await loadParentDaoInfo(
              chainId,
              bech32Prefix,
              subDaoAdmin,
              admin,
              serverT,
              [...(previousParentAddresses ?? []), subDaoAdmin]
            ),
    }
  } catch (err) {
    // If contract not found, ignore error. Otherwise, log it.
    if (!(err instanceof Error) || !err.message.includes('not found')) {
      console.error(err)
      console.error(
        `Error loading parent DAO (${subDaoAdmin}) of ${subDaoAddress}`,
        processError(err)
      )
    }

    // Don't prevent page render if failed to load parent DAO info.
    return null
  }
}

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
}

const daoCoreDumpState = async (
  chainId: string,
  coreAddress: string,
  serverT: TFunction
): Promise<DaoCoreDumpState> => {
  let dumpedState: DumpStateResponse | undefined
  let votingModuleInfo: ContractVersionInfo | undefined
  let proposalModules: ProposalModuleWithInfo[] | undefined
  let created: Date | undefined
  try {
    const indexerDumpedState = await queryIndexer<IndexerDumpState>(
      'contract',
      coreAddress,
      'daoCore/dumpState'
    )
    dumpedState = indexerDumpedState
    votingModuleInfo = indexerDumpedState?.votingModuleInfo
    proposalModules = indexerDumpedState?.proposal_modules
    created = indexerDumpedState?.createdAt
      ? new Date(indexerDumpedState.createdAt)
      : undefined
  } catch (error) {
    // Ignore error. Fallback to querying chain below.
    console.error(error)
  }

  // If indexer failed, fallback to querying chain.
  if (!dumpedState) {
    const cwClient = await cosmWasmClientRouter.connect(
      getRpcForChainId(chainId)
    )

    // DAO core contract.
    dumpedState = await cwClient.queryContractSmart(coreAddress, {
      dump_state: {},
    })
  }

  // Should never happen. Typecheck.
  if (!dumpedState) {
    throw new Error(serverT('error.loadingData'))
  }

  const coreVersion = parseContractVersion(dumpedState.version.version)
  if (!coreVersion) {
    throw new Error(serverT('error.failedParsingCoreVersion'))
  }

  // If indexer failed, fallback to querying chain.
  if (!votingModuleInfo) {
    const cwClient = await cosmWasmClientRouter.connect(
      getRpcForChainId(chainId)
    )

    // Voting module contract.
    votingModuleInfo = (
      (await cwClient.queryContractSmart(dumpedState.voting_module, {
        info: {},
      })) as InfoResponse
    ).info
  }

  // If indexer failed, fallback to querying chain.
  if (!proposalModules) {
    proposalModules = await fetchProposalModulesWithInfoFromChain(
      chainId,
      coreAddress,
      coreVersion
    )
  }

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
    created,
  }
}
