import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'
// eslint-disable-next-line regex/invalid
import { StringMap, TFunctionKeys, TOptions } from 'i18next'
import type { GetStaticProps, Redirect } from 'next'
import { i18n } from 'next-i18next'

import { DaoPageWrapperProps } from '@dao-dao/common'
import { serverSideTranslations } from '@dao-dao/i18n/serverSideTranslations'
import {
  CommonProposalInfo,
  ProposalModuleAdapterError,
  matchAndLoadAdapter,
} from '@dao-dao/proposal-module-adapter'
import { CwCoreV0_1_0QueryClient } from '@dao-dao/state'
import {
  ConfigResponse,
  InfoResponse,
} from '@dao-dao/state/clients/cw-core/0.1.0'
import { Loader, Logo } from '@dao-dao/ui'
import {
  CHAIN_RPC_ENDPOINT,
  CI,
  LEGACY_URL_PREFIX,
  ProposalModule,
  cosmWasmClientRouter,
  fetchProposalModules,
  parseCoreVersion,
  validateContractAddress,
} from '@dao-dao/utils'

// Swap order of arguments and use error fallback string if client null.
// It shouldn't be null as long as we only call this on the server once the
// translations have been loaded by awaiting `serverSideTranslations`.
const serverT = (
  key: TFunctionKeys | TFunctionKeys[],
  options?: string | TOptions<StringMap> | undefined,
  defaultValue?: string | undefined
) =>
  // Ok to use here as long as it's used after `serverSideTranslations`.
  // eslint-disable-next-line regex/invalid
  i18n?.t(key, defaultValue, options) ??
  'internal error: translations not loaded'

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
    t: typeof serverT
    cwClient: CosmWasmClient
    coreClient: CwCoreV0_1_0QueryClient
    config: ConfigResponse
    coreAddress: string
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

    // Run before any `t` call since i18n is not loaded globally on the
    // server before this is awaited.
    const i18nProps = await serverSideTranslations(context.locale, [
      'translation',
    ])

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
          title: serverT('error.daoNotFound'),
          description: '',
        },
      }
    }

    try {
      const cwClient = await cosmWasmClientRouter.connect(CHAIN_RPC_ENDPOINT)
      const coreClient = new CwCoreV0_1_0QueryClient(cwClient, coreAddress)

      const config = await coreClient.config()

      const coreInfo = (await coreClient.info()).info
      const coreVersion = parseCoreVersion(coreInfo.version)
      if (!coreVersion) {
        throw new Error('Failed to determine core version.')
      }

      const votingModuleAddress = await coreClient.votingModule()
      // All info queries are the same for DAO DAO contracts.
      const {
        info: { contract: votingModuleContractName },
      }: InfoResponse = await cwClient.queryContractSmart(votingModuleAddress, {
        info: {},
      })

      const proposalModules = await fetchProposalModules(
        cwClient,
        coreAddress,
        coreVersion
      )

      // Must be called after server side translations has been awaited,
      // because props may use the `t` function, and it won't be available
      // until after.
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
          cwClient,
          coreClient,
          config,
          coreAddress: coreAddress,
          proposalModules,
        })) ?? {}

      return {
        props: {
          ...i18nProps,
          url: url ?? null,
          title:
            overrideTitle ??
            [leadingTitle?.trim(), config.name.trim(), followingTitle?.trim()]
              .filter(Boolean)
              .join(' | '),
          description: overrideDescription ?? config.description,
          info: {
            coreAddress: coreAddress,
            votingModuleAddress,
            votingModuleContractName,
            proposalModules,
            name: config.name,
            description: config.description,
            imageUrl: overrideImageUrl ?? config.image_url ?? null,
          },
          ...additionalProps,
        },
        // Regenerate the page at most once per second.
        // Should serve cached copy and update after a refresh.
        revalidate: 1,
      }
    } catch (error) {
      // Redirect.
      if (error instanceof RedirectError) {
        return {
          redirect: error.redirect,
        }
      }

      // Redirect legacy DAOs (legacy multisigs redirected in
      // next.config.js redirects list).
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
        (error.message.includes('not found') ||
          error.message.includes('Error parsing into type') ||
          error.message.includes('unknown variant') ||
          error.message.includes('decoding bech32 failed'))
      ) {
        // Excluding `info` will render DAONotFound.
        return {
          props: {
            ...i18nProps,
            title: 'DAO not found',
            description: '',
          },
        }
      }

      // Throw error to trigger 500.
      throw error
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
      cwClient,
      coreAddress,
      proposalModules,
    }) => {
      const proposalId = params[proposalIdParamKey]

      // If invalid proposal ID, not found.
      if (typeof proposalId !== 'string') {
        return {
          followingTitle: t('error.proposalNotFound'),
          additionalProps: {
            proposalId: undefined,
          },
        }
      }

      let proposalInfo: CommonProposalInfo | undefined
      try {
        const {
          options: {
            proposalModule: { prefix },
          },
          adapter: {
            functions: { getProposalInfo },
          },
        } = await matchAndLoadAdapter(proposalModules, proposalId, {
          coreAddress,
          Logo,
          Loader,
        })

        // If proposal is numeric, i.e. has no prefix, redirect to prefixed URL.
        if (!isNaN(Number(proposalId))) {
          throw new RedirectError({
            destination: getProposalUrlPrefix(params) + prefix + proposalId,
            permanent: true,
          })
        }

        // undefined if proposal does not exist.
        proposalInfo = await getProposalInfo(cwClient)
      } catch (error) {
        // Rethrow.
        if (error instanceof RedirectError) {
          throw error
        }

        // If ProposalModuleAdapterError, treat as 404 below.
        // Otherwise display 500.
        if (!(error instanceof ProposalModuleAdapterError)) {
          console.error(error)
          // Throw error to trigger 500.
          throw new Error(
            'An unexpected error occurred. Please try again later.'
          )
        }
      }

      return {
        url: getProposalUrlPrefix(params) + proposalId,
        followingTitle: proposalInfo
          ? `${t('title.proposal')} ${proposalId}`
          : t('error.proposalNotFound'),
        overrideDescription: proposalInfo ? proposalInfo.title : undefined,
        additionalProps: {
          // If proposal does not exist, pass undefined to indicate 404.
          proposalId: proposalInfo ? proposalId : undefined,
        },
      }
    },
  })

export class RedirectError {
  constructor(public redirect: Redirect) {}
}
