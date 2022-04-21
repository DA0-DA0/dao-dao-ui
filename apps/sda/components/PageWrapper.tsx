import { FunctionComponent, PropsWithChildren, Suspense } from 'react'

import { NextSeo } from 'next-seo'

import { LoadingScreen } from '@/components/LoadingScreen'

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
