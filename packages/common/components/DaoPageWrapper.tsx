import { NextSeo } from 'next-seo'
import {
  ComponentType,
  PropsWithChildren,
  createContext,
  useContext,
} from 'react'

import {
  CwProposalSingleAdapter,
  registerAdapters as registerProposalModuleAdapters,
} from '@dao-dao/proposal-module-adapter'
import {
  DaoNotFound,
  Loader as DefaultLoader,
  Logo as DefaultLogo,
  PageLoader as DefaultPageLoader,
  LoaderProps,
  LogoProps,
  SuspenseLoader,
} from '@dao-dao/ui'
import { ProposalModule } from '@dao-dao/utils'
import {
  Cw20StakedBalanceVotingAdapter,
  Cw4VotingAdapter,
  VotingModuleAdapterProvider,
  registerAdapters as registerVotingModuleAdapters,
} from '@dao-dao/voting-module-adapter'

export interface DaoInfo {
  coreAddress: string
  votingModuleAddress: string
  votingModuleContractName: string
  proposalModules: ProposalModule[]
  name: string
  description: string
  imageUrl: string | null
}

const DaoInfoContext = createContext<DaoInfo | null>(null)

export const useDaoInfoContext = () => {
  const context = useContext(DaoInfoContext)
  if (!context) {
    throw new Error(
      'useDaoInfoContext can only be used in a descendant of DaoInfoContext.Provider.'
    )
  }

  return context
}

export type DaoPageWrapperProps = PropsWithChildren<{
  url?: string | null
  title: string
  description: string
  info?: DaoInfo
  Logo?: ComponentType<LogoProps>
  Loader?: ComponentType<LoaderProps>
  PageLoader?: ComponentType<LoaderProps>
}>

export interface DaoProposalPageWrapperProps extends DaoPageWrapperProps {
  proposalId: string | undefined
}

export const DaoPageWrapper = ({
  url,
  title,
  description,
  info,
  children,
  Logo = DefaultLogo,
  Loader = DefaultLoader,
  PageLoader = DefaultPageLoader,
}: DaoPageWrapperProps) => (
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
      <DaoInfoContext.Provider value={info}>
        <SuspenseLoader fallback={<PageLoader />}>
          <VotingModuleAdapterProvider
            contractName={info.votingModuleContractName}
            options={{
              votingModuleAddress: info.votingModuleAddress,
              coreAddress: info.coreAddress,
              Logo,
              Loader,
            }}
          >
            {children}
          </VotingModuleAdapterProvider>
        </SuspenseLoader>
      </DaoInfoContext.Provider>
    ) : (
      <DaoNotFound />
    )}
  </>
)

// Register voting module adapters.
registerVotingModuleAdapters([Cw4VotingAdapter, Cw20StakedBalanceVotingAdapter])

// Register proposal module adapters.
registerProposalModuleAdapters([CwProposalSingleAdapter])
