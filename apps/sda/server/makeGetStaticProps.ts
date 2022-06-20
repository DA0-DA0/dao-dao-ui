import type { GetStaticProps } from 'next'

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

interface GetStaticPropsMakerProps {
  leadingTitle?: string
  followingTitle?: string
  overrideTitle?: string
  overrideDescription?: string
}
type GetStaticPropsMaker = (
  props?: GetStaticPropsMakerProps
) => GetStaticProps<PageWrapperProps>

// Computes PageWrapperProps for the DAO with optional alterations.
export const makeGetStaticProps: GetStaticPropsMaker =
  ({ leadingTitle, followingTitle, overrideTitle, overrideDescription } = {}) =>
  async ({ locale }) => {
    // Don't query chain if running in CI.
    if (CI) {
      return { notFound: true }
    }

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
