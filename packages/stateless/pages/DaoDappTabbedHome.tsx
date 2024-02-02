import { DaoDappTabbedHomeProps } from '@dao-dao/types'

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
  )
}
