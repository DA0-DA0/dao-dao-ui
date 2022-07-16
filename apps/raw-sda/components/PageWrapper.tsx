import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { FunctionComponent, PropsWithChildren } from 'react'

import { PageLoader, SuspenseLoader } from '@dao-dao/ui'
import { CW20STAKEDBALANCEVOTING_CONTRACT_NAME } from '@dao-dao/utils'
import { VotingModuleAdapterProvider } from '@dao-dao/voting-module-adapter/react'

import { DAO_ADDRESS } from '@/util'

import {
  DAOInfo,
  DAOInfoContext,
  DefaultDAOInfo,
  Header,
  Loader,
  Logo,
} from '.'

export type PageWrapperProps = PropsWithChildren<{
  url?: string
  title: string
  description: string
  daoInfo?: DAOInfo
}>

export const PageWrapper: FunctionComponent<PageWrapperProps> = ({
  url,
  title,
  description,
  daoInfo,
  children,
}) => {
  const { isFallback } = useRouter()

  // If not on a fallback page, DAO info must be loaded.
  if (!isFallback && !daoInfo) {
    throw new Error('DAO info failed to load.')
  }

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

      <VotingModuleAdapterProvider
        contractName={CW20STAKEDBALANCEVOTING_CONTRACT_NAME}
        options={{
          coreAddress: DAO_ADDRESS,
          Logo,
          Loader,
        }}
      >
        <DAOInfoContext.Provider value={daoInfo || DefaultDAOInfo}>
          <Header />

          <SuspenseLoader
            // Make room at top for Header.
            fallback={<PageLoader className="!min-h-[calc(100vh-5rem)]" />}
          >
            <div className="p-4 mx-auto max-w-page sm:p-8">{children}</div>
          </SuspenseLoader>
        </DAOInfoContext.Provider>
      </VotingModuleAdapterProvider>
    </>
  )
}
