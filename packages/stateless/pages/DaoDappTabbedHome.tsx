import clsx from 'clsx'

import { DaoDappTabbedHomeProps } from '@dao-dao/types'
import { UNDO_PAGE_PADDING_TOP_CLASSES_WITH_TOP } from '@dao-dao/utils'

import { Loader, TabBar } from '../components'
import { DaoSplashHeader } from '../components/dao/DaoSplashHeader'
import { useDaoInfoContext } from '../hooks'

export const DaoDappTabbedHome = ({
  follow,
  SuspenseLoader,
  ButtonLink,
  LinkWrapper,
  tabs,
  selectedTabId,
  onSelectTabId,
  parentProposalRecognizeSubDaoHref,
}: DaoDappTabbedHomeProps) => {
  const daoInfo = useDaoInfoContext()
  const selectedTab = tabs.find(({ id }) => id === selectedTabId)

  return (
    <div className="relative z-[1] flex flex-col items-stretch">
      <DaoSplashHeader
        ButtonLink={ButtonLink}
        LinkWrapper={LinkWrapper}
        daoInfo={daoInfo}
        follow={follow}
        parentProposalRecognizeSubDaoHref={parentProposalRecognizeSubDaoHref}
      />

      <TabBar
        className={clsx(
          // Stick to the top when the tab content scrolls down. Use higher z
          // index to make sure this stays above tab content.
          'sticky z-20 bg-background-base',
          UNDO_PAGE_PADDING_TOP_CLASSES_WITH_TOP
        )}
        onSelect={onSelectTabId}
        selectedTabId={selectedTabId}
        tabs={tabs.map(({ id, label, IconFilled }) => ({
          id,
          label,
          Icon: IconFilled,
        }))}
      />

      <div className="z-10 pt-5 pb-6">
        {/* Don't render a tab unless it is visible. */}
        {selectedTab && (
          <SuspenseLoader fallback={<Loader />}>
            <selectedTab.Component />
          </SuspenseLoader>
        )}
      </div>
    </div>
  )
}
