import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { PropsWithChildren, useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { accountsSelector, walletChainIdAtom } from '@dao-dao/state/recoil'
import {
  DaoNotFound,
  ErrorPage500,
  PageLoader,
  useCachedLoadingWithError,
  useThemeContext,
} from '@dao-dao/stateless'
import {
  CommonProposalInfo,
  DaoInfo,
  DaoInfoSerializable,
} from '@dao-dao/types'
import { transformIpfsUrlToHttpsIfNecessary } from '@dao-dao/utils'

import { daoInfoSelector } from '../../recoil'
import { SuspenseLoader } from '../SuspenseLoader'
import { DaoProviders } from './DaoProviders'

export type DaoPageWrapperProps = PropsWithChildren<{
  url?: string | null
  title: string
  description: string
  accentColor?: string | null
  serializedInfo?: DaoInfoSerializable
  error?: string
  setIcon?: (icon: string | undefined) => void
}>

export interface DaoProposalPageWrapperProps extends DaoPageWrapperProps {
  proposalInfo: CommonProposalInfo | null
}

export const DaoPageWrapper = ({
  url,
  title,
  description,
  accentColor,
  serializedInfo,
  error,
  setIcon,
  children,
}: DaoPageWrapperProps) => {
  const { isReady, isFallback } = useRouter()
  const { setAccentColor, theme } = useThemeContext()

  const [walletChainId, setWalletChainId] = useRecoilState(walletChainIdAtom)
  // Update walletChainId to whatever the current DAO is so the right address
  // appears in the sidebar.
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

  // Load all accounts since the static props only loads some. This should load
  // faster than the DAO info selector below that will eventually replace this.
  const accounts = useCachedLoadingWithError(
    serializedInfo
      ? accountsSelector({
          chainId: serializedInfo.chainId,
          address: serializedInfo.coreAddress,
        })
      : undefined
  )

  const info: DaoInfo | undefined = serializedInfo && {
    ...serializedInfo,
    accounts:
      accounts.loading || accounts.errored
        ? serializedInfo.accounts
        : accounts.data,
    created: serializedInfo.created
      ? new Date(serializedInfo.created)
      : undefined,
  }

  // Load DAO info once static props are loaded so it's more up to date.
  const loadingDaoInfo = useCachedLoadingWithError(
    serializedInfo
      ? daoInfoSelector({
          chainId: serializedInfo.chainId,
          coreAddress: serializedInfo.coreAddress,
        })
      : undefined
  )

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
          <DaoProviders
            info={
              // Use the loading info once it's loaded, otherwise fallback to
              // info from static props.
              !loadingDaoInfo.loading && !loadingDaoInfo.errored
                ? loadingDaoInfo.data
                : info
            }
          >
            {/* Suspend children to prevent unmounting and remounting InnerDaoPageWrapper and the context providers inside it every time something needs to suspend (which causes a lot of flickering loading states). */}
            <SuspenseLoader fallback={<PageLoader />}>
              {children}
            </SuspenseLoader>
          </DaoProviders>
        ) : error ? (
          <ErrorPage500 error={error} />
        ) : (
          <DaoNotFound />
        )}
      </SuspenseLoader>
    </>
  )
}
