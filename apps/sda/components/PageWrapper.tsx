import type { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { FunctionComponent, PropsWithChildren } from 'react'

import { CwCoreQueryClient as QueryClient } from '@dao-dao/state/clients/cw-core'
import { cosmWasmClientRouter, CHAIN_RPC_ENDPOINT } from '@dao-dao/utils'

import { Header, Loader, SuspenseLoader, DAOInfoContext, DAOInfo } from '.'
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
          ...(!!daoInfo.imageUrl && { images: [{ url: daoInfo.imageUrl }] }),
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
    try {
      const client = new QueryClient(
        await cosmWasmClientRouter.connect(CHAIN_RPC_ENDPOINT),
        DAO_ADDRESS
      )

      const config = await client.config()

      return {
        props: {
          title:
            overrideTitle ??
            [leadingTitle?.trim(), config.name.trim(), followingTitle?.trim()]
              .filter(Boolean)
              .join(' | '),
          description: overrideDescription ?? config.description,
          daoInfo: {
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
      return { notFound: true }
    }
  }
