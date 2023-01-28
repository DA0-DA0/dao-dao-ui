import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { PropsWithChildren, useEffect } from 'react'

import {
  DaoInfoContext,
  DaoNotFound,
  ErrorPage500,
  PageLoader,
  useThemeContext,
} from '@dao-dao/stateless'
import {
  ActionOptionsContextType,
  CommonProposalInfo,
  DaoInfo,
  DaoInfoSerializable,
} from '@dao-dao/types'
import { transformIpfsUrlToHttpsIfNecessary } from '@dao-dao/utils'

import { ActionsProvider } from '../../actions'
import { VotingModuleAdapterProvider } from '../../voting-module-adapter'
import { SuspenseLoader } from '../SuspenseLoader'

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
  ...innerProps
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
          <InnerDaoPageWrapper info={info} {...innerProps}>
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

interface InnerDaoPageWrapperProps
  extends Pick<DaoPageWrapperProps, 'children'> {
  info: DaoInfo
}

const InnerDaoPageWrapper = ({ info, children }: InnerDaoPageWrapperProps) => (
  // Add a unique key here to tell React to re-render everything when the
  // `coreAddress` is changed, since for some insane reason, Next.js does not
  // reset state when navigating between dynamic rotues. Even though the
  // `info` value passed below changes, somehow no re-render occurs... unless
  // the `key` prop is unique. See the issue below for more people compaining
  // about this to no avail. https://github.com/vercel/next.js/issues/9992
  <DaoInfoContext.Provider key={info.coreAddress} value={info}>
    <VotingModuleAdapterProvider
      contractName={info.votingModuleContractName}
      options={{
        votingModuleAddress: info.votingModuleAddress,
        coreAddress: info.coreAddress,
      }}
    >
      <ActionsProvider
        options={{
          chainId: info.chainId,
          bech32Prefix: info.bech32Prefix,
          address: info.coreAddress,
          context: {
            type: ActionOptionsContextType.Dao,
            info,
          },
        }}
      >
        {children}
      </ActionsProvider>
    </VotingModuleAdapterProvider>
  </DaoInfoContext.Provider>
)
