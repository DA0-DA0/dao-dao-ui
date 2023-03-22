import { ArrowRightRounded, SensorsRounded } from '@mui/icons-material'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { DappLayoutProps } from '@dao-dao/types/stateless/DappLayout'

import { ErrorBoundary } from '../error/ErrorBoundary'
import { IconButton } from '../icon_buttons'
import { ProfileImage } from '../profile/ProfileImage'
import { Tooltip } from '../tooltip'
import { useAppContext } from './AppContext'
import { DappNavigation } from './DappNavigation'
import { RightSidebar } from './RightSidebar'

export * from '@dao-dao/types/stateless/DappLayout'

export const DappLayout = ({
  navigationProps,
  children,
  rightSidebarProps,
  walletProfileData,
  connect,
  connected,
  connectWalletButton,
}: DappLayoutProps) => {
  const { t } = useTranslation()
  const router = useRouter()
  const { responsiveNavigation, responsiveRightSidebar, setPageHeaderRef } =
    useAppContext()

  const scrollableContainerRef = useRef<HTMLDivElement>(null)

  // On route change, close responsive bars and scroll to top.
  useEffect(() => {
    responsiveNavigation.enabled && responsiveNavigation.toggle()
    responsiveRightSidebar.enabled && responsiveRightSidebar.toggle()

    // When on a page, and navigating to another page with a Link, we need to
    // make sure the scrollable container moves to the top since we may be
    // scrolled lower on the page. Next.js automatically does this for the html
    // tag, but we have a nested scrollable container, so we have to do this
    // manually.
    scrollableContainerRef.current?.scrollTo({
      top: 0,
    })

    // Only toggle on route change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath])

  const [connectHidden, setConnectHidden] = useState(false)

  return (
    <div className="relative z-[1] flex h-full w-full flex-row items-stretch overflow-hidden">
      <ErrorBoundary>
        <DappNavigation {...navigationProps} />
      </ErrorBoundary>

      <main
        className={clsx(
          'flex grow flex-col overflow-hidden border-x border-border-base transition-opacity',
          // Navigation bar can be responsive up to sm size. After that, it
          // automatically displays.
          responsiveNavigation.enabled
            ? 'opacity-30 sm:opacity-100'
            : // Right sidebar can be responsive up to 2xl size. After that, it automatically displays.
            responsiveRightSidebar.enabled
            ? 'opacity-30 2xl:opacity-100'
            : 'opacity-100'
        )}
      >
        <div
          className={clsx(
            'fixed right-4 bottom-4 z-10 cursor-pointer sm:right-6 sm:bottom-6 2xl:hidden'
          )}
          onClick={connected ? responsiveRightSidebar.toggle : undefined}
        >
          {connected ? (
            <Tooltip title={t('info.openProfileSidebarTooltip')}>
              <div className="rounded-full bg-background-base shadow-dp8">
                <ProfileImage
                  className="bg-background-primary transition hover:bg-background-interactive-hover active:bg-background-interactive-pressed"
                  fallbackIconClassName="!text-icon-primary !w-3/5 !h-3/5"
                  imageUrl={walletProfileData?.profile.imageUrl}
                  loading={walletProfileData?.loading}
                  size="xs"
                />
              </div>
            </Tooltip>
          ) : (
            <div
              className={clsx(
                'relative flex flex-row items-center transition-all',
                connectHidden
                  ? 'right-[calc(2.5rem_-_100%)] gap-6 sm:gap-8'
                  : 'right-0 gap-2'
              )}
            >
              <Tooltip
                title={
                  connectHidden
                    ? t('button.connectWallet')
                    : t('button.hideConnectButton')
                }
              >
                <div className="rounded-md bg-background-base shadow-dp8">
                  <IconButton
                    Icon={connectHidden ? SensorsRounded : ArrowRightRounded}
                    onClick={() => {
                      connectHidden && connect()
                      setConnectHidden((hidden) => !hidden)
                    }}
                    size="lg"
                    variant="secondary"
                  />
                </div>
              </Tooltip>

              <div className="rounded-md bg-background-base shadow-dp8">
                {connectWalletButton}
              </div>
            </div>
          )}
        </div>

        <div className="shrink-0 px-6" ref={setPageHeaderRef}></div>

        {/* Make horizontal padding 1 unit more than page header so that the body is not touching the sides of the page header's bottom border when it scrolls. */}
        <div
          className="no-scrollbar relative grow overflow-y-auto px-7 pt-10 pb-12"
          // PageHeader uses this ID to obtain this element and track its
          // scroll position so that it can move the top gradient accordingly
          // to match the underlying gradient on the page.
          id="main-content-scrollable"
          ref={scrollableContainerRef}
        >
          <ErrorBoundary>{children}</ErrorBoundary>
        </div>
      </main>

      <ErrorBoundary>
        <RightSidebar {...rightSidebarProps} />
      </ErrorBoundary>
    </div>
  )
}
