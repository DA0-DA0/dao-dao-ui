import { ArrowOutwardRounded } from '@mui/icons-material'
import clsx from 'clsx'
import { useEffect } from 'react'
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
import { useDaoNavHelpers } from '../hooks/useDaoNavHelpers'

export const DaoDappTabbedHome = ({
  daoInfo,
  follow,
  DaoInfoBar,
  rightSidebarContent,
  SuspenseLoader,
  LinkWrapper,
  tabs,
  selectedTabId,
  onSelectTabId,
}: DaoDappTabbedHomeProps) => {
  const { t } = useTranslation()
  const { coreAddress } = useDaoInfoContext()

  const {
    getDaoPath,
    router: { asPath },
  } = useDaoNavHelpers()
  // Swap the DAO path prefixes instead of just rebuilding the path to preserve
  // any additional info (such as query params).
  const singleDaoPath = asPath.replace(
    getDaoPath(''),
    baseGetDaoPath(DaoPageMode.Sda, '')
  )

  useEffect(() => {
    // Trigger SDA to cache page the user might switch to.
    fetch(SDA_URL_PREFIX + `/api/revalidate?d=${coreAddress}`).catch(
      console.error
    )
  }, [coreAddress])

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
            className="mx-auto hidden w-max max-w-full mdlg:grid"
            moreTabs={
              tabs.length > 4
                ? tabs.slice(4).map(({ id, label }) => ({ label, value: id }))
                : undefined
            }
            onSelect={onSelectTabId}
            selected={selectedTabId}
            tabs={tabs
              .slice(0, 4)
              .map(({ id, label }) => ({ label, value: id }))}
          />

          <SegmentedControls
            className="mdlg:hidden"
            noWrap
            onSelect={onSelectTabId}
            selected={selectedTabId}
            tabs={tabs.map(({ id, label }) => ({ label, value: id }))}
          />
        </div>

        <div className="mt-2 border-t border-border-secondary py-6">
          {tabs.map(({ id, Component }) => (
            <div key={id} className={clsx(selectedTabId !== id && 'hidden')}>
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
