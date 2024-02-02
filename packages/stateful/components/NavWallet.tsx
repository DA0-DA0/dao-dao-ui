import { useSetRecoilState } from 'recoil'

import { updateProfileNftVisibleAtom } from '@dao-dao/state'
import { NavWallet as StatelessNavWallet } from '@dao-dao/stateless'
import { StatefulNavWalletProps } from '@dao-dao/types'

import { useWallet, useWalletInfo } from '../hooks'
import { IconButtonLink } from './IconButtonLink'
import { InboxMainItemRenderer } from './inbox'
import { SuspenseLoader } from './SuspenseLoader'

export const NavWallet = (props: StatefulNavWalletProps) => {
  const { openView, isWalletConnected, address, wallet, disconnect } =
    useWallet()
  const { walletProfileData, updateProfileName } = useWalletInfo()
  const setUpdateProfileNftVisible = useSetRecoilState(
    updateProfileNftVisibleAtom
  )

  return (
    <SuspenseLoader fallback={<StatelessNavWallet connected={false} loading />}>
      {isWalletConnected && address && wallet ? (
        <StatelessNavWallet
          IconButtonLink={IconButtonLink}
          InboxMainItemRenderer={InboxMainItemRenderer}
          connected
          disconnect={disconnect}
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
