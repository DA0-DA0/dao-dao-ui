import { ReactNode } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import {
  betaWarningAcceptedAtom,
  mountedInBrowserAtom,
  navigationCompactAtom,
  proposalCreatedCardPropsAtom,
} from '@dao-dao/state'
import {
  BetaWarningModal,
  DaoCreatedModal,
  PageLoader,
  ProposalCreatedModal,
  SdaLayout as StatelessSdaLayout,
} from '@dao-dao/stateless'

import { useAutoRefreshData, useDaoTabs } from '../hooks'
import { daoCreatedCardPropsAtom } from '../recoil/atoms/newDao'
import { LinkWrapper } from './LinkWrapper'
import { SidebarWallet } from './NavWallet'
import { SuspenseLoader } from './SuspenseLoader'
import { WalletModals } from './wallet'

export const SdaLayout = ({ children }: { children: ReactNode }) => {
  const mountedInBrowser = useRecoilValue(mountedInBrowserAtom)
  const [betaWarningAccepted, setBetaWarningAccepted] = useRecoilState(
    betaWarningAcceptedAtom
  )
  const [compact, setCompact] = useRecoilState(navigationCompactAtom)
  const [proposalCreatedCardProps, setProposalCreatedCardProps] =
    useRecoilState(proposalCreatedCardPropsAtom)

  //! Auto refresh various data used across the UI
  useAutoRefreshData()

  const [daoCreatedCardProps, setDaoCreatedCardProps] = useRecoilState(
    daoCreatedCardPropsAtom
  )

  const loadingTabs = useDaoTabs()

  return (
    <StatelessSdaLayout
      navigationProps={{
        tabs: loadingTabs.loading ? [] : loadingTabs.data,
        LinkWrapper,
        compact,
        setCompact,
        mountedInBrowser,
        SidebarWallet,
      }}
    >
      <SuspenseLoader fallback={<PageLoader />}>{children}</SuspenseLoader>

      {/* Modals */}

      <BetaWarningModal
        onClose={() => setBetaWarningAccepted(true)}
        visible={mountedInBrowser && !betaWarningAccepted}
      />

      {daoCreatedCardProps && (
        <DaoCreatedModal
          itemProps={{
            ...daoCreatedCardProps,

            follow: {
              hide: true,
            },
            LinkWrapper,
          }}
          modalProps={{
            onClose: () => setDaoCreatedCardProps(undefined),
          }}
          subDao={!!daoCreatedCardProps}
        />
      )}

      {proposalCreatedCardProps && (
        <ProposalCreatedModal
          itemProps={{
            ...proposalCreatedCardProps,
            LinkWrapper,
          }}
          modalProps={{
            onClose: () => setProposalCreatedCardProps(undefined),
          }}
        />
      )}

      <WalletModals />
    </StatelessSdaLayout>
  )
}
