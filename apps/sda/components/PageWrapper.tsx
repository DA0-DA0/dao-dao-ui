import type { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { FunctionComponent, PropsWithChildren } from 'react'

import { CwCoreQueryClient as QueryClient } from '@dao-dao/state/clients/cw-core'
import { InfoResponse as Cw20StakedBalanceVotingInfoResponse } from '@dao-dao/state/clients/cw20-staked-balance-voting'
import { InfoResponse as Cw4VotingInfoResponse } from '@dao-dao/state/clients/cw4-voting'
import { SuspenseLoader } from '@dao-dao/ui'
import {
  cosmWasmClientRouter,
  CHAIN_RPC_ENDPOINT,
  CI,
  parseVotingModuleContractName,
} from '@dao-dao/utils'

import { Header, Loader, DAOInfoContext, DAOInfo } from '.'
import { DAO_ADDRESS } from '@/util'

export type PageWrapperProps = PropsWithChildren<{
  url?: string
  title: string
  description: string
  daoInfo: DAOInfo
}>

export const PageWrapper: FunctionComponent<PageWrapperProps> = ({
  url,
  title,
  description,
  daoInfo,
  children,
}) => {
  const { isFallback, isReady } = useRouter()

  return (
    <>
      <NextSeo
        description={description}
        openGraph={{
          ...(!!url && { url }),
          type: 'website',
          title,
          description,
          ...(!!daoInfo?.imageUrl && { images: [{ url: daoInfo.imageUrl }] }),
        }}
        title={title}
      />

      <DAOInfoContext.Provider value={daoInfo}>
        <Header />

        {/* Suspend children so SEO stays intact while page loads. */}
        <SuspenseLoader
          fallback={<Loader fillScreen size={64} />}
          forceFallback={isFallback || !isReady}
        >
          <div className="p-4 mx-auto max-w-page sm:p-8">{children}</div>
        </SuspenseLoader>
      </DAOInfoContext.Provider>
    </>
  )
}

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
  async () => {
    // Don't query chain if running in CI.
    if (CI) {
      return { notFound: true }
    }

    try {
      const cwClient = await cosmWasmClientRouter.connect(CHAIN_RPC_ENDPOINT)
      const client = new QueryClient(cwClient, DAO_ADDRESS)

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
