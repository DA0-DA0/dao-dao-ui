// eslint-disable-next-line regex/invalid
import { StringMap, TFunctionKeys, TOptions } from 'i18next'
import type { GetStaticProps } from 'next'
import { i18n } from 'next-i18next'

import { serverSideTranslations } from '@dao-dao/i18n/serverSideTranslations'
import { CwCoreQueryClient } from '@dao-dao/state'
import { InfoResponse as Cw20StakedBalanceVotingInfoResponse } from '@dao-dao/state/clients/cw20-staked-balance-voting'
import { InfoResponse as Cw4VotingInfoResponse } from '@dao-dao/state/clients/cw4-voting'
import {
  CHAIN_RPC_ENDPOINT,
  CI,
  cosmWasmClientRouter,
  parseVotingModuleContractName,
} from '@dao-dao/utils'

import { PageWrapperProps } from '@/components'
import { DAO_ADDRESS } from '@/util'

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
}
type GetStaticPropsMaker = (
  getProps?: (t: typeof serverT) => GetStaticPropsMakerProps
) => GetStaticProps<PageWrapperProps>

// Computes PageWrapperProps for the DAO with optional alterations.
export const makeGetStaticProps: GetStaticPropsMaker =
  (getProps) =>
  async ({ locale }) => {
    // Don't query chain if running in CI.
    if (CI) {
      return { notFound: true }
    }

    // Run before any `t` call since i18n is not loaded globally on the
    // server before this is awaited.
    const i18nProps = await serverSideTranslations(locale, ['translation'])

    try {
      const cwClient = await cosmWasmClientRouter.connect(CHAIN_RPC_ENDPOINT)
      const client = new CwCoreQueryClient(cwClient, DAO_ADDRESS)

      const config = await client.config()

      const votingModuleAddress = await client.votingModule()
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

      // Must be called after server side translations has been awaited,
      // because props may use the `t` function, and it won't be available
      // until after.
      const {
        leadingTitle,
        followingTitle,
        overrideTitle,
        overrideDescription,
      } = getProps?.(serverT) ?? {}

      return {
        props: {
          ...i18nProps,
          title:
            overrideTitle ??
            [leadingTitle?.trim(), config.name.trim(), followingTitle?.trim()]
              .filter(Boolean)
              .join(' | '),
          description: overrideDescription ?? config.description,
          daoInfo: {
            votingModuleType,
            name: config.name,
            imageUrl: config.image_url ?? null,
          },
        },
        // Regenerate the page at most once per second.
        // Should serve cached copy and update after a refresh.
        revalidate: 1,
      }
    } catch (error) {
      console.error(error)
      // Throw error to trigger 500.
      throw error
    }
  }
