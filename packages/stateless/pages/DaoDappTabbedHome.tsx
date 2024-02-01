import { ArrowOutwardRounded } from '@mui/icons-material'

import { ContractVersion, DaoDappTabbedHomeProps } from '@dao-dao/types'

import {
  IconButtonLink,
  Loader,
  PageHeaderContent,
  RightSidebarContent,
  TabBar,
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

        <TabBar
          onSelect={onSelectTabId}
          selectedTabId={selectedTabId}
          tabs={tabs.map(({ id, label, IconFilled }) => ({
            id,
            label,
            Icon: IconFilled,
          }))}
        />

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
