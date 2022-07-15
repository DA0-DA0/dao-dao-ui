import { NextSeo } from 'next-seo'
import {
  FunctionComponent,
  PropsWithChildren,
  createContext,
  useContext,
} from 'react'

import { SuspenseLoader } from '@dao-dao/ui'
import { VotingModuleAdapterProvider } from '@dao-dao/voting-module-adapter/react'

import { DAONotFound } from './dao/NotFound'
import { PageLoader } from './Loader'

interface DAOInfo {
  coreAddress: string
  votingModuleContractName: string
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
      {/* We only know a DAO is not found if info is still empty when
       * when the page is ready and not a fallback page.
       */}
      {!info ? (
        <DAONotFound />
      ) : (
        <VotingModuleAdapterProvider
          contractName={info.votingModuleContractName}
        >
          <DAOInfoContext.Provider value={info}>
            {children}
          </DAOInfoContext.Provider>
        </VotingModuleAdapterProvider>
      )}
    </SuspenseLoader>
  </>
)
