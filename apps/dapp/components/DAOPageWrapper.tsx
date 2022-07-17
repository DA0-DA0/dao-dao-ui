import { NextSeo } from 'next-seo'
import {
  FunctionComponent,
  PropsWithChildren,
  createContext,
  useContext,
} from 'react'

import { Loader, Logo, PageLoader, SuspenseLoader } from '@dao-dao/ui'
import { ProposalModule } from '@dao-dao/utils'
import { VotingModuleAdapterProvider } from '@dao-dao/voting-module-adapter'

import { DAONotFound } from './dao/NotFound'

interface DAOInfo {
  coreAddress: string
  votingModuleAddress: string
  votingModuleContractName: string
  proposalModules: ProposalModule[]
  name: string
  description: string
  imageUrl: string | null
}

const DAOInfoContext = createContext<DAOInfo | null>(null)

export const useDAOInfoContext = () => {
  const context = useContext(DAOInfoContext)
  if (!context) {
    throw new Error(
      'useDAOInfoContext can only be used in a descendant of DAOInfoContext.'
    )
  }

  return context
}

export type DAOPageWrapperProps = PropsWithChildren<{
  url?: string
  title: string
  description: string
  info?: DAOInfo
}>

export const DAOPageWrapper: FunctionComponent<DAOPageWrapperProps> = ({
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

    <SuspenseLoader fallback={<PageLoader />}>
      {info ? (
        <VotingModuleAdapterProvider
          contractName={info.votingModuleContractName}
          options={{
            votingModuleAddress: info.votingModuleAddress,
            coreAddress: info.coreAddress,
            Logo,
            Loader,
          }}
        >
          <DAOInfoContext.Provider value={info}>
            {children}
          </DAOInfoContext.Provider>
        </VotingModuleAdapterProvider>
      ) : (
        <DAONotFound />
      )}
    </SuspenseLoader>
  </>
)
