import {
  AddRounded,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
  TagRounded,
} from '@mui/icons-material'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { DaoTabId } from '@dao-dao/types'
import { SdpNavigationProps } from '@dao-dao/types/stateless/SdpNavigation'

import { useDaoInfoContext, useNavHelpers } from '../../hooks'
import { DaoImage } from '../dao/DaoImage'
import { IconButton, ThemeToggle } from '../icon_buttons'
import { Tooltip } from '../tooltip/Tooltip'
import { useAppLayoutContext } from './AppLayoutContext'
import { Footer } from './Footer'
import { PageHeader } from './PageHeader'
import { Row } from './Row'

// Width of `lg` tailwind selector. Don't change this without changing the
// compact button media query class that shows the compact toggle at the very
// bottom, so the user can toggle between compact and not compact mode when it
// is not forced.
const FORCE_COMPACT_NAVIGATION_AT_WIDTH = 1024
// Width of `sm` tailwind selector. Don't change this without changing all of
// the `sm:` tailwind class media queries since they are set based on when it is
// in responsive mobile mode.
const FORCE_MOBILE_NAVIGATION_AT_WIDTH = 640

// Force off when in responsive mobile mode since it displays full width when
// open and we can show all details. Force on when larger than mobile but still
// not very wide since it takes up a lot of space.
const getForceCompact = () =>
  window.innerWidth < FORCE_MOBILE_NAVIGATION_AT_WIDTH
    ? false
    : window.innerWidth < FORCE_COMPACT_NAVIGATION_AT_WIDTH
    ? true
    : undefined

export const SdpNavigation = ({
  tabs,
  version,
  compact,
  setCompact,
  mountedInBrowser,
  LinkWrapper,
}: SdpNavigationProps) => {
  const daoInfo = useDaoInfoContext()
  const { t } = useTranslation()
  const { getDaoPath, getDaoProposalPath } = useNavHelpers()
  const {
    responsiveNavigation: {
      enabled: responsiveEnabled,
      toggle: toggleResponsive,
    },
    responsiveRightSidebar: { enabled: responsiveRightSidebarEnabled },
  } = useAppLayoutContext()

  // Use screen resize to determine when compact should be forced on or off.
  const [forceCompact, setForceCompact] = useState<boolean | undefined>(
    // Initialize not compact to prevent hydration errors (since it takes at
    // least 1 render to update this).
    false
  )
  useEffect(() => {
    // Only run in browser.
    if (typeof window === 'undefined' || !mountedInBrowser) {
      return
    }

    const updateForceCompact = () => setForceCompact(getForceCompact())

    // Update on initialization.
    updateForceCompact()

    window.addEventListener('resize', updateForceCompact)
    // Clean up on umount
    return () => window.removeEventListener('resize', updateForceCompact)
  }, [mountedInBrowser])

  // If forceCompact is set to a boolean, override compact.
  if (forceCompact !== undefined) {
    compact = forceCompact
  }

  const { asPath } = useRouter()

  return (
    <>
      {/* Layer underneath that allows closing the responsive navigation by tapping on visible parts of the page. */}
      {responsiveEnabled && (
        <div
          className="absolute top-0 right-0 bottom-0 left-0 z-[19] cursor-pointer sm:hidden"
          onClick={() => responsiveEnabled && toggleResponsive()}
        ></div>
      )}

      <nav
        className={clsx(
          // General
          'no-scrollbar flex h-full shrink-0 flex-col overflow-y-auto bg-background-base py-6 pt-0 text-lg',
          // If compact, items will manager their own padding so that
          // highlighted rows fill the whole width.
          !compact && 'px-6',
          // Responsive
          'absolute top-0 bottom-0 z-20 w-[90vw] shadow-dp8 transition-all',
          responsiveEnabled ? 'left-0' : '-left-full',
          // Large
          'sm:relative sm:left-0 sm:shadow-none sm:transition-[padding-left]',
          compact ? 'sm:w-min' : 'sm:w-[264px]',

          // Dim if responsive right sidebar is open. Right sidebar can be responsive up to xl size. After that, it automatically displays.
          responsiveRightSidebarEnabled
            ? 'opacity-30 xl:opacity-100'
            : 'opacity-100'
        )}
      >
        <PageHeader
          centerNode={
            <Link href="/">
              <a className="flex flex-row items-center gap-2 overflow-hidden">
                <DaoImage
                  LinkWrapper={LinkWrapper}
                  coreAddress={daoInfo.coreAddress}
                  daoName={daoInfo.name}
                  hideRing
                  imageUrl={daoInfo.imageUrl}
                  size="md"
                />

                {!compact && (
                  <Tooltip title={daoInfo.name}>
                    <p className="header-text truncate">{daoInfo.name}</p>
                  </Tooltip>
                )}
              </a>
            </Link>
          }
          forceCenter={compact}
          noBorder={compact}
        />

        <div className={clsx(!compact && 'pt-2')}>
          {tabs.map((tab) => {
            const isOnProposalsTab =
              tab.id === DaoTabId.Proposals && asPath.includes('/proposals')
            const isCreatingProposal = asPath.startsWith(
              getDaoProposalPath(daoInfo.coreAddress, 'create')
            )

            const isCreatingSubDao =
              tab.id === DaoTabId.Subdaos && asPath.endsWith('/create')

            return (
              <Row
                key={tab.id}
                LinkWrapper={LinkWrapper}
                compact={compact}
                forceExpanded
                href={getDaoPath(daoInfo.coreAddress) + `#${tab.id}`}
                selected={
                  // When no hash is present, the home tab is selected. This is an
                  // edge case since the hash can be present or not to show the
                  // home.
                  tab.id === DaoTabId.Home && !asPath.includes('#')
                }
                {...tab}
              >
                {isOnProposalsTab && (
                  <Row
                    Icon={isCreatingProposal ? AddRounded : TagRounded}
                    LinkWrapper={LinkWrapper}
                    compact={compact}
                    href={asPath}
                    label={
                      isCreatingProposal
                        ? t('title.createProposal')
                        : `${t('title.proposal')} ${asPath.split('/').pop()}`
                    }
                  />
                )}
                {isCreatingSubDao && (
                  <Row
                    Icon={AddRounded}
                    LinkWrapper={LinkWrapper}
                    compact={compact}
                    href={asPath}
                    label={t('title.createASubDao')}
                  />
                )}
              </Row>
            )
          })}
        </div>

        <div className={clsx('mt-8 flex grow flex-col justify-end gap-2')}>
          {!compact && (
            <div className="caption-text space-y-3 font-mono">
              <p className="pl-[10px]">
                {t('info.daodaoWithVersion', { version })}
              </p>

              <Footer />
            </div>
          )}

          <div
            className={clsx(
              'mt-8 flex gap-2',
              compact ? 'mx-6 flex-col' : 'flex-row items-center'
            )}
          >
            {compact ? (
              <Tooltip title={t('button.toggleTheme')}>
                <ThemeToggle compact />
              </Tooltip>
            ) : (
              <ThemeToggle />
            )}

            <IconButton
              Icon={
                compact ? KeyboardDoubleArrowRight : KeyboardDoubleArrowLeft
              }
              circular
              className="hidden lg:flex"
              onClick={() => setCompact(!compact)}
              size={compact ? 'default' : 'xl'}
              variant="secondary"
            />
          </div>
        </div>
      </nav>
    </>
  )
}
