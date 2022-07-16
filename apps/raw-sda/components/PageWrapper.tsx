import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { FunctionComponent, PropsWithChildren } from 'react'

import { SuspenseLoader } from '@dao-dao/ui'
import { CW20STAKEDBALANCEVOTING_CONTRACT_NAME } from '@dao-dao/utils'
import { VotingModuleAdapterProvider } from '@dao-dao/voting-module-adapter/react'

import { DAOInfo, DAOInfoContext, DefaultDAOInfo, Header, Loader } from '.'

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
  const { isFallback, isReady } = useRouter()

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
      >
        <DAOInfoContext.Provider value={daoInfo || DefaultDAOInfo}>
          <Header />

          {/* Suspend children so SEO stays intact while page loads. */}
          <SuspenseLoader
            fallback={<Loader fillScreen size={64} />}
            forceFallback={isFallback || !isReady}
          >
            <div className="p-4 mx-auto max-w-page sm:p-8">{children}</div>
          </SuspenseLoader>
        </DAOInfoContext.Provider>
      </VotingModuleAdapterProvider>
    </>
  )
}
