import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { PropsWithChildren, useEffect, useMemo } from 'react'
import { useRecoilState } from 'recoil'

import { accountsSelector, walletChainIdAtom } from '@dao-dao/state/recoil'
import {
  DaoNotFound,
  ErrorPage500,
  PageLoader,
  useAppContext,
  useCachedLoadingWithError,
  useThemeContext,
} from '@dao-dao/stateless'
import { CommonProposalInfo, DaoInfo } from '@dao-dao/types'
import {
  getFallbackImage,
  transformIpfsUrlToHttpsIfNecessary,
} from '@dao-dao/utils'

import { makeDaoContext, makeGenericContext } from '../../command'
import { daoInfoSelector } from '../../recoil'
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
}>

export type DaoProposalProps = DaoPageWrapperProps & {
  proposalInfo: CommonProposalInfo | null
}

export const DaoPageWrapper = ({
  url,
  title,
  description,
  accentColor,
  info: _info,
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
  const currentChainId = _info?.chainId
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

  // Load all accounts since the static props only loads some. This should load
  // faster than the DAO info selector below that will eventually replace this.
  const accounts = useCachedLoadingWithError(
    _info
      ? accountsSelector({
          chainId: _info.chainId,
          address: _info.coreAddress,
        })
      : undefined
  )

  const info = useMemo(
    (): DaoInfo | undefined =>
      _info && {
        ..._info,
        accounts:
          accounts.loading || accounts.errored ? _info.accounts : accounts.data,
      },
    [_info, accounts]
  )

  // Load DAO info once static props are loaded so it's more up to date.
  const loadingDaoInfo = useCachedLoadingWithError(
    info
      ? daoInfoSelector({
          chainId: info.chainId,
          coreAddress: info.coreAddress,
        })
      : undefined
  )

  // Use the loading info once it's loaded, otherwise fallback to info from
  // static props.
  const loadedInfo =
    !loadingDaoInfo.loading && !loadingDaoInfo.errored
      ? loadingDaoInfo.data
      : info

  // Set icon for the page from info if setIcon is present.
  useEffect(() => {
    if (setIcon) {
      setIcon(
        loadedInfo?.imageUrl
          ? transformIpfsUrlToHttpsIfNecessary(loadedInfo.imageUrl)
          : undefined
      )
    }
  }, [setIcon, loadedInfo?.imageUrl])

  // On load, set DAO context for command modal.
  useEffect(() => {
    if (setRootCommandContextMaker && loadedInfo) {
      setRootCommandContextMaker((options) =>
        makeDaoContext({
          ...options,
          dao: {
            chainId: loadedInfo.chainId,
            coreAddress: loadedInfo.coreAddress,
            coreVersion: loadedInfo.coreVersion,
            name: loadedInfo.name,
            imageUrl:
              loadedInfo.imageUrl || getFallbackImage(loadedInfo.coreAddress),
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
  }, [loadedInfo, setRootCommandContextMaker])

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
        {loadedInfo ? (
          <DaoProviders info={loadedInfo}>
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
