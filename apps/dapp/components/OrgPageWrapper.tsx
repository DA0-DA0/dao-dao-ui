import type { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import {
  FunctionComponent,
  PropsWithChildren,
  createContext,
  useContext,
} from 'react'

import {
  ConfigResponse,
  CwCoreQueryClient as QueryClient,
} from '@dao-dao/state/clients/cw-core'
import { Cw20StakedBalanceVotingQueryClient } from '@dao-dao/state/clients/cw20-staked-balance-voting'
import { cosmWasmClientRouter, CHAIN_RPC_ENDPOINT, CI } from '@dao-dao/utils'

import { OrgNotFound } from './org/NotFound'

interface OrgInfo {
  coreAddress: string
  governanceTokenAddress: string
  stakingContractAddress: string
  name: string
  imageUrl: string | null
}
const DefaultOrgInfo: OrgInfo = {
  coreAddress: '',
  governanceTokenAddress: '',
  stakingContractAddress: '',
  name: '',
  imageUrl: null,
}
const OrgInfoContext = createContext<OrgInfo>(DefaultOrgInfo)
export const useOrgInfoContext = () => useContext(OrgInfoContext)

export type OrgPageWrapperProps = PropsWithChildren<{
  url?: string
  title: string
  description: string
  info?: OrgInfo
}>

export const OrgPageWrapper: FunctionComponent<OrgPageWrapperProps> = ({
  url,
  title,
  description,
  info,
  children,
}) => (
  <>
    <NextSeo
      description={description}
      openGraph={{
        ...(!!url && { url }),
        type: 'website',
        title,
        description,
        ...(!!info?.imageUrl && { images: [{ url: info.imageUrl }] }),
      }}
      title={title}
    />

    {info ? (
      <OrgInfoContext.Provider value={info}>{children}</OrgInfoContext.Provider>
    ) : (
      <OrgNotFound />
    )}
  </>
)

interface GetStaticPropsMakerProps {
  leadingTitle?: string
  followingTitle?: string
  overrideTitle?: string
  overrideDescription?: string
  overrideImageUrl?: string
  getAdditionalProps?: (
    config: ConfigResponse
  ) => Record<string, any> | Promise<Record<string, any>> | null | undefined
}
type GetStaticPropsMaker = (
  props?: GetStaticPropsMakerProps
) => GetStaticProps<OrgPageWrapperProps>

// Computes OrgPageWrapperProps for the DAO with optional alterations.
export const makeGetStaticProps: GetStaticPropsMaker =
  ({
    leadingTitle,
    followingTitle,
    overrideTitle,
    overrideDescription,
    overrideImageUrl,
    getAdditionalProps,
  } = {}) =>
  async ({ params: { address } = { address: undefined } }) => {
    // Don't query chain if running in CI.
    if (CI) {
      return { notFound: true }
    }

    // If invalid address, display not found.
    if (typeof address !== 'string' || !address) {
      // Excluding `info` will render OrgNotFound.
      return {
        props: {
          title: 'Org not found',
          description: '',
        },
      }
    }

    try {
      const cwClient = await cosmWasmClientRouter.connect(CHAIN_RPC_ENDPOINT)
      const coreClient = new QueryClient(cwClient, address)

      const config = await coreClient.config()

      const votingModuleAddress = await coreClient.votingModule()
      const votingModuleClient = new Cw20StakedBalanceVotingQueryClient(
        cwClient,
        votingModuleAddress
      )
      const governanceTokenAddress = await votingModuleClient.tokenContract()
      const stakingContractAddress = await votingModuleClient.stakingContract()

      return {
        props: {
          title:
            overrideTitle ??
            [leadingTitle?.trim(), config.name.trim(), followingTitle?.trim()]
              .filter(Boolean)
              .join(' | '),
          description: overrideDescription ?? config.description,
          info: {
            coreAddress: address,
            governanceTokenAddress,
            stakingContractAddress,
            name: config.name,
            imageUrl: overrideImageUrl ?? config.image_url ?? null,
          },
          ...(await getAdditionalProps?.(config)),
        },
        // Regenerate the page at most once per second.
        // Should serve cached copy and update after a refresh.
        revalidate: 1,
      }
    } catch (error) {
      console.error(error)
      // Throw error to trigger 500.
      throw new Error('An unexpected error occurred. Please try again later.')
    }
  }
