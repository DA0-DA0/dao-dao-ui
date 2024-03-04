import { useSetRecoilState } from 'recoil'

import { mergeProfilesVisibleAtom } from '@dao-dao/state'
import { NavWallet as StatelessNavWallet } from '@dao-dao/stateless'
import { StatefulNavWalletProps } from '@dao-dao/types'

import { useInboxApiWithUi, useManageProfile, useWallet } from '../hooks'
import { ButtonLink } from './ButtonLink'
import { InboxMainItemRenderer } from './inbox'
import { SuspenseLoader } from './SuspenseLoader'

export const NavWallet = (props: StatefulNavWalletProps) => {
  const { openView, isWalletConnected, address, wallet, disconnect } =
    useWallet()
  const { profile, otherProfiles } = useManageProfile()

  const setMergeProfilesModalVisible = useSetRecoilState(
    mergeProfilesVisibleAtom
  )

  // Ignore errors loading inbox because the SDA does not have an inbox.
  let inbox
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    inbox = useInboxApiWithUi({
      mode: 'popup',
    })
  } catch {}

  return (
    <SuspenseLoader
      fallback={
        <StatelessNavWallet connected={false} loading mode={props.mode} />
      }
    >
      {isWalletConnected && address && wallet ? (
        <StatelessNavWallet
          ButtonLink={ButtonLink}
          InboxMainItemRenderer={InboxMainItemRenderer}
          connected
          disconnect={disconnect}
          inbox={inbox}
          onMergeProfiles={() => setMergeProfilesModalVisible(true)}
          otherProfilesExist={otherProfiles.length > 0}
          profile={profile}
          wallet={wallet}
          {...props}
        />
      ) : (
        <StatelessNavWallet connected={false} onConnect={openView} {...props} />
      )}
    </SuspenseLoader>
  )
}

export const HeaderWallet = () => <NavWallet mode="header" />
export const SidebarWallet = () => <NavWallet mode="sidebar" />
export const DockWallet = () => <NavWallet mode="dock" />
