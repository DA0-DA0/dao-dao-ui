import { ArrowOutwardRounded } from '@mui/icons-material'
import clsx from 'clsx'
import { useEffect, useRef } from 'react'

import { ContractVersion, DaoDappTabbedHomeProps } from '@dao-dao/types'

import {
  Button,
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

        <div className="flex flex-row items-center justify-center border-b border-border-primary">
          <div
            className="no-scrollbar flex flex-row items-end overflow-x-auto pt-1"
            ref={tabContainerRef}
          >
            {tabs.map(({ id, label, IconFilled }) => (
              <Button
                key={id}
                className={clsx(
                  'shrink-0 !rounded-b-none border-b border-transparent !py-2 !px-3 text-text-primary md:!px-4 lg:!px-5',
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
