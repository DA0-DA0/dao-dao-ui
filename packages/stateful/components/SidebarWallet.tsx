import { useSetRecoilState } from 'recoil'

import { updateProfileNftVisibleAtom } from '@dao-dao/state'
import {
  SidebarWallet as OriginalSidebarWallet,
  SidebarWalletProps,
} from '@dao-dao/stateless'

import { useWallet, useWalletInfo } from '../hooks'
import { IconButtonLink } from './IconButtonLink'
import { SuspenseLoader } from './SuspenseLoader'

export const SidebarWallet = (
  props: Pick<SidebarWalletProps, 'containerClasName'>
) => {
  const { openView, isWalletConnected, address, wallet, disconnect } =
    useWallet()
  const { walletProfileData, updateProfileName } = useWalletInfo()
  const setUpdateProfileNftVisible = useSetRecoilState(
    updateProfileNftVisibleAtom
  )

  return (
    <SuspenseLoader
      fallback={<OriginalSidebarWallet connected={false} loading />}
    >
      {isWalletConnected && address && wallet ? (
        <OriginalSidebarWallet
          IconButtonLink={IconButtonLink}
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
        <OriginalSidebarWallet
          connected={false}
          onConnect={openView}
          {...props}
        />
      )}
    </SuspenseLoader>
  )
}
