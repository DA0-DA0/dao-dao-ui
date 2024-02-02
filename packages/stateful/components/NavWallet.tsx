import { useSetRecoilState } from 'recoil'

import { updateProfileNftVisibleAtom } from '@dao-dao/state'
import { NavWallet as StatelessNavWallet } from '@dao-dao/stateless'
import { StatefulNavWalletProps } from '@dao-dao/types'

import { useInboxApiWithUi, useWallet, useWalletInfo } from '../hooks'
import { InboxMainItemRenderer } from './inbox'
import { SuspenseLoader } from './SuspenseLoader'

export const NavWallet = (props: StatefulNavWalletProps) => {
  const { openView, isWalletConnected, address, wallet, disconnect } =
    useWallet()
  const { walletProfileData, updateProfileName } = useWalletInfo()
  const setUpdateProfileNftVisible = useSetRecoilState(
    updateProfileNftVisibleAtom
  )
  const inbox = useInboxApiWithUi({
    mode: 'popup',
  })

  return (
    <SuspenseLoader fallback={<StatelessNavWallet connected={false} loading />}>
      {isWalletConnected && address && wallet ? (
        <StatelessNavWallet
          InboxMainItemRenderer={InboxMainItemRenderer}
          connected
          disconnect={disconnect}
          inbox={inbox}
          onEditProfileImage={() => setUpdateProfileNftVisible(true)}
          updateProfileName={updateProfileName}
          wallet={wallet}
          walletAddress={address}
          walletProfileData={walletProfileData}
          {...props}
        />
      ) : (
        <StatelessNavWallet connected={false} onConnect={openView} {...props} />
      )}
    </SuspenseLoader>
  )
}
