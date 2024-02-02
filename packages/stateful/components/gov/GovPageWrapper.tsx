import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { PropsWithChildren, useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { walletChainIdAtom } from '@dao-dao/state/recoil'
import {
  ChainProvider,
  DaoInfoContext,
  DaoNotFound,
  ErrorPage500,
  PageLoader,
  useThemeContext,
} from '@dao-dao/stateless'
import { DaoInfo, DaoInfoSerializable } from '@dao-dao/types'
import { transformIpfsUrlToHttpsIfNecessary } from '@dao-dao/utils'

import { PageHeaderContent } from '../PageHeaderContent'
import { SuspenseLoader } from '../SuspenseLoader'

export type GovPageWrapperProps = PropsWithChildren<{
  url?: string | null
  title: string
  description: string
  accentColor?: string | null
  serializedInfo?: DaoInfoSerializable
  error?: string
  setIcon?: (icon: string | undefined) => void
}>

export interface GovProposalPageWrapperProps extends GovPageWrapperProps {
  proposalId: string
}

export const GovPageWrapper = ({
  url,
  title,
  description,
  accentColor,
  serializedInfo,
  error,
  setIcon,
  children,
}: GovPageWrapperProps) => {
  const { isReady, isFallback } = useRouter()
  const { setAccentColor, theme } = useThemeContext()

  const [walletChainId, setWalletChainId] = useRecoilState(walletChainIdAtom)
  // Update walletChainId so the sidebar shows the correct wallet address.
  useEffect(() => {
    if (serializedInfo && serializedInfo.chainId !== walletChainId) {
      setWalletChainId(serializedInfo.chainId)
    }
  }, [serializedInfo, setWalletChainId, walletChainId])

  // Set theme's accentColor.
  useEffect(() => {
    if (!isReady || isFallback) return

    // Only set the accent color if we have enough contrast.
    if (accentColor) {
      const rgb = accentColor
        .replace(/^rgba?\(|\s+|\)$/g, '')
        .split(',')
        .map(Number)
      const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000
      if (
        (theme === 'dark' && brightness < 100) ||
        (theme === 'light' && brightness > 255 - 100)
      ) {
        setAccentColor(undefined)
        return
      }
    }

    setAccentColor(accentColor ?? undefined)
  }, [accentColor, setAccentColor, isReady, isFallback, theme])

  const info: DaoInfo | undefined = serializedInfo && {
    ...serializedInfo,
    created: serializedInfo.created
      ? new Date(serializedInfo.created)
      : undefined,
  }

  // Set icon for the page from info if setIcon is present.
  useEffect(() => {
    if (setIcon) {
      setIcon(
        info?.imageUrl
          ? transformIpfsUrlToHttpsIfNecessary(info.imageUrl)
          : undefined
      )
    }
  }, [setIcon, info?.imageUrl])

  return (
    <>
      <NextSeo
        description={description}
        openGraph={{
          ...(!!url && { url }),
          type: 'website',
          title,
          description,
          ...(!!info?.imageUrl && {
            images: [
              { url: transformIpfsUrlToHttpsIfNecessary(info.imageUrl) },
            ],
          }),
        }}
        title={title}
      />

      {/* On fallback page (waiting for static props), `info` is not yet present. Let's just display a loader until `info` is loaded. We can't access translations until static props are loaded anyways. */}
      <SuspenseLoader fallback={<PageLoader />}>
        {info ? (
          <ChainProvider chainId={info.chainId}>
            <DaoInfoContext.Provider key={info.chainId} value={info}>
              <SuspenseLoader fallback={<PageLoader />}>
                {children}
              </SuspenseLoader>
            </DaoInfoContext.Provider>
          </ChainProvider>
        ) : error ? (
          <ErrorPage500 PageHeaderContent={PageHeaderContent} error={error} />
        ) : (
          <DaoNotFound PageHeaderContent={PageHeaderContent} />
        )}
      </SuspenseLoader>
    </>
  )
}
