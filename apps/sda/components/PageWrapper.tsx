import { FunctionComponent, PropsWithChildren, Suspense } from 'react'

import type { GetServerSideProps } from 'next'

import { QueryClient } from '@dao-dao/state/clients/cw-governance'
import { cosmWasmClientRouter, CHAIN_RPC_ENDPOINT } from '@dao-dao/utils'
import { NextSeo } from 'next-seo'

import { LoadingScreen } from '@/components/LoadingScreen'
import { DAO_ADDRESS } from '@/util/constants'

export type PageWrapperProps = PropsWithChildren<{
  url?: string
  title: string
  description: string
  imageUrl: string | null
}>

export const PageWrapper: FunctionComponent<PageWrapperProps> = ({
  url,
  title,
  description,
  imageUrl,
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
        ...(!!imageUrl && { images: [{ url: imageUrl }] }),
      }}
      title={title}
    />

    {/* Suspend children so SEO stays intact while page loads. */}
    <Suspense fallback={<LoadingScreen />}>{children}</Suspense>
  </>
)

interface GetServerSidePropsMakerProps {
  leadingTitle?: string
  followingTitle?: string
  overrideTitle?: string
  overrideDescription?: string
}
type GetServerSidePropsMaker = (
  props?: GetServerSidePropsMakerProps
) => GetServerSideProps<PageWrapperProps>

// Computes PageWrapperProps for the DAO with optional alterations.
export const makeGetServerSideProps: GetServerSidePropsMaker =
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
          imageUrl: config.image_url || null,
        },
      }
    } catch (error) {
      console.error(error)
      return { notFound: true }
    }
  }
