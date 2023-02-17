import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { PropsWithChildren, ReactNode, useEffect } from 'react'

import {
  DaoNotFound,
  ErrorPage500,
  PageLoader,
  useAppContext,
  useThemeContext,
} from '@dao-dao/stateless'
import {
  CommonProposalInfo,
  DaoInfo,
  DaoInfoSerializable,
} from '@dao-dao/types'
import { transformIpfsUrlToHttpsIfNecessary } from '@dao-dao/utils'

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
  proposalInfo: CommonProposalInfo | undefined
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
          <InnerDaoPageWrapper info={info}>
            {/* Suspend children to prevent unmounting and remounting InnerDaoPageWrapper and the context providers inside it every time something needs to suspend (which causes a lot of flickering loading states). */}
            <SuspenseLoader fallback={<PageLoader />}>
              {children}
            </SuspenseLoader>
          </InnerDaoPageWrapper>
        ) : error ? (
          <ErrorPage500 error={error} />
        ) : (
          <DaoNotFound />
        )}
      </SuspenseLoader>
    </>
  )
}

type InnerDaoPageWrapperProps = {
  info: DaoInfo
  children: ReactNode
}

const InnerDaoPageWrapper = ({ info, children }: InnerDaoPageWrapperProps) => {
  // Ensure connected to current DAO's WebSocket.
  const {
    daoWebSocket: { connect },
  } = useAppContext()
  useEffect(() => {
    connect({
      chainId: info.chainId,
      coreAddress: info.coreAddress,
    })
  }, [connect, info.chainId, info.coreAddress])

  return <DaoProviders info={info}>{children}</DaoProviders>
}
