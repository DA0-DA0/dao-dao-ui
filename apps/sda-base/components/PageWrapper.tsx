import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { FunctionComponent, PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'

import { ErrorPage, PageLoader, SuspenseLoader } from '@dao-dao/ui'
import { VotingModuleAdapterProvider } from '@dao-dao/voting-module-adapter/react'

import { DAO_ADDRESS } from '@/util'

import { DAOInfo, DAOInfoContext, Header, Loader, Logo } from '.'

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
  const { t } = useTranslation()
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

      <SuspenseLoader fallback={<PageLoader />}>
        {daoInfo ? (
          <VotingModuleAdapterProvider
            contractName={daoInfo.votingModuleContractName}
            options={{
              votingModuleAddress: daoInfo.votingModuleAddress,
              coreAddress: DAO_ADDRESS,
              Logo,
              Loader,
            }}
          >
            <DAOInfoContext.Provider value={daoInfo}>
              <Header />

              <SuspenseLoader
                // Make room at top for Header.
                fallback={<PageLoader className="!min-h-[calc(100vh-5rem)]" />}
              >
                <div className="p-4 mx-auto max-w-page sm:p-8">{children}</div>
              </SuspenseLoader>
            </DAOInfoContext.Provider>
          </VotingModuleAdapterProvider>
        ) : (
          <ErrorPage title={t('title.500')}>
            <p>{t('error.internalServerError')}</p>
          </ErrorPage>
        )}
      </SuspenseLoader>
    </>
  )
}
