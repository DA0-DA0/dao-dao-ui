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
        : window.location.hash.replace('#', '')

    return windowHash && tabs.some(({ id }) => id === windowHash)
      ? windowHash
      : tabs[0].id
  })

  // Store selected tab in URL hash.
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    if (window.location.hash.replace('#', '') !== selectedTab) {
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

        <div className="flex flex-col items-center border-y border-t-border-base border-b-border-secondary py-6">
          <SegmentedControls
            className="w-full max-w-2xl shrink"
            onSelect={setSelectedTab}
            selected={selectedTab}
            tabs={tabs.map(({ id, label }) => ({ label, value: id }))}
          />
        </div>

        <div className="py-6">
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
