import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { FunctionComponent, PropsWithChildren } from 'react'

import { SuspenseLoader } from '@dao-dao/ui'

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

      <DAOInfoContext.Provider value={daoInfo || DefaultDAOInfo}>
        <Header />

        {/* Suspend children so SEO stays intact while page loads. */}
        <SuspenseLoader
          fallback={<Loader fillScreen size={64} />}
          forceFallback={isFallback || !isReady}
        >
          <div className="mx-auto max-w-page p-4 sm:p-8">{children}</div>
        </SuspenseLoader>
      </DAOInfoContext.Provider>
    </>
  )
}
