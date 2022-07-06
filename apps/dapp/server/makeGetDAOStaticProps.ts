import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'
// eslint-disable-next-line regex/invalid
import { StringMap, TFunctionKeys, TOptions } from 'i18next'
import type { GetStaticProps } from 'next'
import { i18n } from 'next-i18next'

import { serverSideTranslations } from '@dao-dao/i18n/serverSideTranslations'
import {
  Cw20StakedBalanceVotingQueryClient,
  Cw4VotingQueryClient,
  CwCoreQueryClient,
} from '@dao-dao/state'
import { ConfigResponse } from '@dao-dao/state/clients/cw-core'
import { InfoResponse as Cw20StakedBalanceVotingInfoResponse } from '@dao-dao/state/clients/cw20-staked-balance-voting'
import { InfoResponse as Cw4VotingInfoResponse } from '@dao-dao/state/clients/cw4-voting'
import {
  CHAIN_RPC_ENDPOINT,
  CI,
  LEGACY_URL_PREFIX,
  VotingModuleType,
  cosmWasmClientRouter,
  parseVotingModuleContractName,
  validateContractAddress,
} from '@dao-dao/utils'

import { DAOPageWrapperProps } from '@/components'

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

interface GetStaticPropsMakerProps {
  leadingTitle?: string
  followingTitle?: string
  overrideTitle?: string
  overrideDescription?: string
  overrideImageUrl?: string
  additionalProps?: Record<string, any> | null | undefined
}
type GetStaticPropsMaker = (
  getProps?: (options: {
    context: Parameters<GetStaticProps>[0]
    t: typeof serverT
    cwClient: CosmWasmClient
    coreClient: CwCoreQueryClient
    config: ConfigResponse
  }) =>
    | GetStaticPropsMakerProps
    | undefined
    | null
    | Promise<GetStaticPropsMakerProps | undefined | null>
) => GetStaticProps<DAOPageWrapperProps>

// Computes DAOPageWrapperProps for the DAO with optional alterations.
export const makeGetDAOStaticProps: GetStaticPropsMaker =
  (getProps) => async (context) => {
    // Don't query chain if running in CI.
    if (CI) {
      return { notFound: true }
    }

    const { params: { address } = { address: undefined }, locale } = context

    // Run before any `t` call since i18n is not loaded globally on the
    // server before this is awaited.
    const i18nProps = await serverSideTranslations(locale, ['translation'])

    // If invalid address, display not found.
    if (
      typeof address !== 'string' ||
      !address ||
      validateContractAddress(address) !== true
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
      const coreClient = new CwCoreQueryClient(cwClient, address)

      const config = await coreClient.config()

      const votingModuleAddress = await coreClient.votingModule()
      const {
        info: { contract: votingModuleContractName },
      }: Cw4VotingInfoResponse | Cw20StakedBalanceVotingInfoResponse =
        await cwClient.queryContractSmart(votingModuleAddress, { info: {} })

      const votingModuleType = parseVotingModuleContractName(
        votingModuleContractName
      )
      if (!votingModuleType) {
        throw new Error('Failed to determine voting module type.')
      }

      let cw4GroupAddress: string | null = null
      let governanceTokenAddress: string | null = null
      let stakingContractAddress: string | null = null
      if (votingModuleType === VotingModuleType.Cw4Voting) {
        const votingModuleClient = new Cw4VotingQueryClient(
          cwClient,
          votingModuleAddress
        )
        cw4GroupAddress = await votingModuleClient.groupContract()
      } else if (
        votingModuleType === VotingModuleType.Cw20StakedBalanceVoting
      ) {
        const votingModuleClient = new Cw20StakedBalanceVotingQueryClient(
          cwClient,
          votingModuleAddress
        )
        governanceTokenAddress = await votingModuleClient.tokenContract()
        stakingContractAddress = await votingModuleClient.stakingContract()
      }

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
      } =
        (await getProps?.({
          context,
          t: serverT,
          cwClient,
          coreClient,
          config,
        })) ?? {}

      return {
        props: {
          ...i18nProps,
          title:
            overrideTitle ??
            [leadingTitle?.trim(), config.name.trim(), followingTitle?.trim()]
              .filter(Boolean)
              .join(' | '),
          description: overrideDescription ?? config.description,
          info: {
            coreAddress: address,
            votingModuleType,
            cw4GroupAddress,
            governanceTokenAddress,
            stakingContractAddress,
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
            destination: LEGACY_URL_PREFIX + `/dao/${address}`,
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
