import { ArrowOutwardRounded } from '@mui/icons-material'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { DaoDappTabbedHomeProps, DaoPageMode } from '@dao-dao/types'
import { SDA_URL_PREFIX, getDaoPath as baseGetDaoPath } from '@dao-dao/utils'

import {
  IconButtonLink,
  Loader,
  PageHeaderContent,
  RightSidebarContent,
  SegmentedControls,
  Tooltip,
} from '../components'
import { DaoSplashHeader } from '../components/dao/DaoSplashHeader'
import { useDaoInfoContext } from '../hooks/useDaoInfoContext'
import { useNavHelpers } from '../hooks/useNavHelpers'

export const DaoDappTabbedHome = ({
  daoInfo,
  follow,
  DaoInfoBar,
  rightSidebarContent,
  SuspenseLoader,
  LinkWrapper,
  tabs,
}: DaoDappTabbedHomeProps) => {
  const { t } = useTranslation()
  const { coreAddress } = useDaoInfoContext()

  const {
    getDaoPath,
    router: { asPath },
  } = useNavHelpers()
  // Swap the DAO path prefixes instead of just rebuilding the path to preserve
  // any additional info (such as query params), except remove the hash since we
  // want to start on the SDA home.
  const singleDaoPath = asPath
    .replace(getDaoPath(''), baseGetDaoPath(DaoPageMode.Sda, ''))
    .split('#')[0]

  useEffect(() => {
    // Trigger SDA to cache page the user might switch to.
    fetch(SDA_URL_PREFIX + `/api/revalidate?d=${coreAddress}`).catch(
      console.error
    )
  }, [coreAddress])

  const [selectedTab, setSelectedTab] = useState(() => {
    // Default to tab from URL hash if present and valid.
    const windowHash =
      typeof window === 'undefined'
        ? undefined
        : // Remove hash prefix and split on slash to get tab ID. Anything after a slash is tab-specific info.
          window.location.hash.replace('#', '').split('/')[0]

    return windowHash && tabs.some(({ id }) => id === windowHash)
      ? windowHash
      : tabs[0].id
  })

  // Store selected tab in URL hash.
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    // Make sure hash is set to the selected tab with optional parameters.
    if (!new RegExp(`^#${selectedTab}(/.*)?$`).test(window.location.hash)) {
      window.location.hash = selectedTab
    }
  }, [selectedTab])

  return (
    <>
      <RightSidebarContent>{rightSidebarContent}</RightSidebarContent>
      <PageHeaderContent
        breadcrumbs={{
          home: true,
          current: daoInfo.name,
        }}
        className="mx-auto max-w-5xl"
        gradient
        rightNode={
          // Go to SDA.
          <Tooltip title={t('button.viewDaosPage')}>
            <IconButtonLink
              Icon={ArrowOutwardRounded}
              href={SDA_URL_PREFIX + singleDaoPath}
              variant="ghost"
            />
          </Tooltip>
        }
      />

      <div className="relative z-[1] mx-auto -mt-4 flex max-w-5xl flex-col items-stretch">
        <DaoSplashHeader
          DaoInfoBar={DaoInfoBar}
          LinkWrapper={LinkWrapper}
          daoInfo={daoInfo}
          follow={follow}
        />

        <div className="h-[1px] bg-border-base" />

        <div className="styled-scrollbar -mx-6 mb-2 overflow-x-auto px-6 pt-6 pb-2">
          <SegmentedControls
            className="hidden mdlg:grid"
            moreTabs={
              tabs.length > 4
                ? tabs.slice(4).map(({ id, label }) => ({ label, value: id }))
                : undefined
            }
            onSelect={setSelectedTab}
            selected={selectedTab}
            tabs={tabs
              .slice(0, 4)
              .map(({ id, label }) => ({ label, value: id }))}
          />

          <SegmentedControls
            className="mdlg:hidden"
            noWrap
            onSelect={setSelectedTab}
            selected={selectedTab}
            tabs={tabs.map(({ id, label }) => ({ label, value: id }))}
          />
        </div>

        <div className="mt-2 border-t border-border-secondary py-6">
          {tabs.map(({ id, Component }) => (
            <div key={id} className={clsx(selectedTab !== id && 'hidden')}>
              <SuspenseLoader fallback={<Loader />}>
                <Component />
              </SuspenseLoader>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
