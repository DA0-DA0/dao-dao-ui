import { DehydratedState } from '@tanstack/react-query'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { PropsWithChildren, useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { walletChainIdAtom } from '@dao-dao/state/recoil'
import {
  DaoNotFound,
  ErrorPage500,
  PageLoader,
  useAppContext,
  useThemeContext,
} from '@dao-dao/stateless'
import { CommonProposalInfo, DaoInfo } from '@dao-dao/types'
import { transformIpfsUrlToHttpsIfNecessary } from '@dao-dao/utils'

import { makeDaoContext, makeGenericContext } from '../../command'
import { PageHeaderContent } from '../PageHeaderContent'
import { SuspenseLoader } from '../SuspenseLoader'
import { DaoProviders } from './DaoProviders'

export type DaoPageWrapperProps = PropsWithChildren<{
  url?: string | null
  title: string
  description: string
  accentColor?: string | null
  info?: DaoInfo
  error?: string
  setIcon?: (icon: string | undefined) => void
  reactQueryDehydratedState?: DehydratedState
}>

export type DaoProposalProps = DaoPageWrapperProps & {
  proposalInfo: CommonProposalInfo | null
}

export const DaoPageWrapper = ({
  url,
  title,
  description,
  accentColor,
  info,
  error,
  setIcon,
  children,
}: DaoPageWrapperProps) => {
  const { isReady, isFallback } = useRouter()
  const { setAccentColor, theme } = useThemeContext()
  const { setRootCommandContextMaker } = useAppContext()

  const [walletChainId, setWalletChainId] = useRecoilState(walletChainIdAtom)
  // Update walletChainId to whatever the current DAO is to ensure we connect
  // correctly.
  const currentChainId = info?.chainId
  useEffect(() => {
    if (currentChainId && currentChainId !== walletChainId) {
      setWalletChainId(currentChainId)
    }
  }, [currentChainId, setWalletChainId, walletChainId])

  // Set theme's accentColor.
  useEffect(() => {
    if (!isReady || isFallback) {
      return
    }

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

  // On load, set DAO context for command modal.
  useEffect(() => {
    if (setRootCommandContextMaker && info) {
      setRootCommandContextMaker((options) =>
        makeDaoContext({
          ...options,
          dao: {
            chainId: info.chainId,
            coreAddress: info.coreAddress,
            coreVersion: info.coreVersion,
            name: info.name,
            imageUrl: info.imageUrl,
          },
        })
      )
    }

    // Unset on unmount.
    return () => {
      if (setRootCommandContextMaker) {
        setRootCommandContextMaker(makeGenericContext)
      }
    }
  }, [info, setRootCommandContextMaker])

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
          <DaoProviders info={info}>
            {/* Suspend children to prevent unmounting and remounting the context providers inside it every time something needs to suspend (which causes a lot of flickering loading states). */}
            <SuspenseLoader fallback={<PageLoader />}>
              {children}
            </SuspenseLoader>
          </DaoProviders>
        ) : error ? (
          <ErrorPage500 PageHeaderContent={PageHeaderContent} error={error} />
        ) : (
          <DaoNotFound PageHeaderContent={PageHeaderContent} />
        )}
      </SuspenseLoader>
    </>
  )
}
