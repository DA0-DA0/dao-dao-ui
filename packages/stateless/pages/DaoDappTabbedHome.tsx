import { ArrowBackIosNew, ArrowOutwardRounded } from '@mui/icons-material'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'

import { ContractVersion, DaoDappTabbedHomeProps } from '@dao-dao/types'

import {
  Button,
  IconButton,
  IconButtonLink,
  Loader,
  PageHeaderContent,
  RightSidebarContent,
} from '../components'
import { DaoSplashHeader } from '../components/dao/DaoSplashHeader'
import { useChainContext } from '../hooks'

export const DaoDappTabbedHome = ({
  daoInfo,
  follow,
  rightSidebarContent,
  SuspenseLoader,
  ButtonLink,
  LinkWrapper,
  tabs,
  selectedTabId,
  onSelectTabId,
  breadcrumbsOverride,
  parentProposalRecognizeSubDaoHref,
}: DaoDappTabbedHomeProps) => {
  const { config: chainConfig } = useChainContext()

  const selectedTab = tabs.find(({ id }) => id === selectedTabId)

  const tabContainerRef = useRef<HTMLDivElement>(null)
  const [showTabLeftButton, setShowTabLeftButton] = useState(false)
  const [showTabRightButton, setShowTabRightButton] = useState(false)

  // When the selected tab changes, center the new tab.
  useEffect(() => {
    const tabIndex = tabs.findIndex(({ id }) => id === selectedTabId)
    if (tabIndex < 0) {
      return
    }

    const tab = tabContainerRef.current?.children[tabIndex]
    if (tab) {
      const containerRect = tabContainerRef.current.getBoundingClientRect()
      const containerCenter = containerRect.width / 2

      const tabRect = tab.getBoundingClientRect()
      // The scrollable container may be offset from the left of the screen by
      // the nav sidebar. Thus, to center the tab horizontally in the container,
      // we need to subtract the container's left offset.
      // `getBoundingClientRect` is relative to the whole window, but the scroll
      // position is relative to the container itself, so we need the center of
      // the container.
      const tabCenter = tabRect.left + tabRect.width / 2 - containerRect.left

      tabContainerRef.current.scrollTo({
        left: tabContainerRef.current.scrollLeft + tabCenter - containerCenter,
        behavior: 'smooth',
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTabId])

  // Show/hide the tab left/right buttons based on scroll position.
  useEffect(() => {
    if (typeof window === 'undefined' || !tabContainerRef.current) {
      return
    }

    const tabContainer = tabContainerRef.current

    const updateVisibilities = () => {
      setShowTabLeftButton(tabContainer.scrollLeft > 0)
      // This needs a tiny 2 pixel buffer in case of rounding in some cases.
      setShowTabRightButton(
        tabContainer.scrollLeft <
          tabContainer.scrollWidth - tabContainer.offsetWidth - 2
      )
    }

    tabContainer.addEventListener('scroll', updateVisibilities)
    window.addEventListener('resize', updateVisibilities)

    return () => {
      tabContainer.removeEventListener('scroll', updateVisibilities)
      window.removeEventListener('resize', updateVisibilities)
    }
  }, [])

  // Detect vertical scrolling from a mouse and scroll the tabs horizontally if
  // the mouse is hovering over them. This is to add support for scrolling the
  // tabs on a desktop with only a single scrollable direction. Horizontal
  // scrolling can be used natively by holding shift, but most people don't know
  // that.
  const [horizontalScrollActive, setHorizontalScrollActive] = useState(false)
  useEffect(() => {
    if (!horizontalScrollActive || !tabContainerRef.current) {
      return
    }

    const tabContainer = tabContainerRef.current

    const onWheel = (event: WheelEvent) => {
      // Subtract Y delta so that this scrolls horizontally to the right when
      // scrolling down and to the left when scrolling up.
      tabContainer.scrollLeft += event.deltaX - event.deltaY

      event.preventDefault()
    }

    tabContainer.addEventListener('wheel', onWheel)
    return () => tabContainer.removeEventListener('wheel', onWheel)
  }, [horizontalScrollActive])

  return (
    <>
      <RightSidebarContent>{rightSidebarContent}</RightSidebarContent>
      <PageHeaderContent
        breadcrumbs={{
          home: true,
          override: !!breadcrumbsOverride,
          current: breadcrumbsOverride || daoInfo.name,
        }}
        className="mx-auto max-w-5xl"
        gradient
        rightNode={
          daoInfo.coreVersion === ContractVersion.Gov ? (
            chainConfig?.explorerUrlTemplates?.gov ? (
              // Go to governance page of chain explorer.
              <IconButtonLink
                Icon={ArrowOutwardRounded}
                href={chainConfig.explorerUrlTemplates.gov}
                variant="ghost"
              />
            ) : undefined
          ) : undefined
        }
      />

      <div className="relative z-[1] mx-auto -mt-4 flex max-w-5xl flex-col items-stretch">
        <DaoSplashHeader
          ButtonLink={ButtonLink}
          LinkWrapper={LinkWrapper}
          daoInfo={daoInfo}
          follow={follow}
          parentProposalRecognizeSubDaoHref={parentProposalRecognizeSubDaoHref}
        />

        <div className="relative flex flex-row items-center justify-center border-b border-border-primary">
          {/* -bottom-1 to account for border of the container */}
          <div
            className={clsx(
              'pointer-events-none absolute left-0 top-0 -bottom-1 z-10 flex animate-fade-in flex-col items-center justify-center transition-opacity',
              showTabLeftButton ? 'opacity-100' : 'opacity-0'
            )}
          >
            <div
              className="absolute top-0 bottom-0 left-0 w-6"
              style={{
                background:
                  'linear-gradient(to left, rgba(var(--color-background-base), 0), rgba(var(--color-background-base), 1) 100%)',
              }}
            ></div>

            <IconButton
              Icon={ArrowBackIosNew}
              className={clsx(
                'relative -left-6',
                showTabLeftButton && 'pointer-events-auto'
              )}
              iconClassName="text-icon-tertiary"
              onClick={() => {
                if (tabContainerRef.current) {
                  tabContainerRef.current.scrollBy({
                    left: -tabContainerRef.current.offsetWidth,
                    behavior: 'smooth',
                  })
                }
              }}
              size="xs"
              variant="none"
            />
          </div>

          {/* -bottom-1 to account for border of the container */}
          <div
            className={clsx(
              'pointer-events-none absolute right-0 top-0 -bottom-1 z-10 flex animate-fade-in flex-col items-center justify-center transition-opacity',
              showTabRightButton ? 'opacity-100' : 'opacity-0'
            )}
          >
            <div
              className="absolute top-0 bottom-0 right-0 w-6"
              style={{
                background:
                  'linear-gradient(to right, rgba(var(--color-background-base), 0), rgba(var(--color-background-base), 1) 100%)',
              }}
            ></div>

            <IconButton
              Icon={ArrowBackIosNew}
              className={clsx(
                'relative -right-6',
                showTabRightButton && 'pointer-events-auto'
              )}
              iconClassName="rotate-180 text-icon-tertiary"
              onClick={() => {
                if (tabContainerRef.current) {
                  tabContainerRef.current.scrollBy({
                    left: tabContainerRef.current.offsetWidth,
                    behavior: 'smooth',
                  })
                }
              }}
              size="xs"
              variant="none"
            />
          </div>

          {/* -mb-[1px] to account for border of the container so the selected tab's border overlaps instead of stacking vertically */}
          <div
            className="no-scrollbar -mb-[1px] flex flex-row items-end overflow-x-auto pt-1"
            onMouseLeave={() => setHorizontalScrollActive(false)}
            onMouseOver={() => setHorizontalScrollActive(true)}
            ref={tabContainerRef}
          >
            {tabs.map(({ id, label, IconFilled }) => (
              <Button
                key={id}
                className={clsx(
                  'shrink-0 !rounded-b-none border-b border-transparent !py-2 !px-3 text-text-primary md:!px-4',
                  selectedTabId === id && '!border-icon-primary'
                )}
                contentContainerClassName="!gap-1.5"
                onClick={() => onSelectTabId(id)}
                size="lg"
                variant="none"
              >
                <IconFilled className="!h-6 !w-6" />
                {label}
              </Button>
            ))}
          </div>
        </div>

        <div className="pt-5 pb-6">
          {/* Don't render a tab unless it is visible. */}
          {selectedTab && (
            <SuspenseLoader fallback={<Loader />}>
              <selectedTab.Component />
            </SuspenseLoader>
          )}
        </div>
      </div>
    </>
  )
}
