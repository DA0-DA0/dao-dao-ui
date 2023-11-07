import clsx from 'clsx'
import { useSetRecoilState } from 'recoil'

import { updateProfileNftVisibleAtom } from '@dao-dao/state/recoil'
import {
  CopyableAddress,
  ProfileImage,
  ProfileNameDisplayAndEditor,
} from '@dao-dao/stateless'

import { useWallet, useWalletInfo } from '../../hooks'

export type ConnectedWalletDisplayProps = {
  className?: string
}

export const ConnectedWalletDisplay = ({
  className,
}: ConnectedWalletDisplayProps) => {
  const { address = '' } = useWallet()
  const { walletProfileData, updateProfileName } = useWalletInfo()
  const setUpdateProfileNftVisible = useSetRecoilState(
    updateProfileNftVisibleAtom
  )

  return (
    <div className={clsx('flex flex-row items-center gap-2', className)}>
      {/* Image */}
      <ProfileImage
        imageUrl={walletProfileData.profile.imageUrl}
        loading={walletProfileData.loading}
        onEdit={() => setUpdateProfileNftVisible(true)}
        size="sm"
      />

      <div className="flex min-w-0 flex-col">
        {/* Name */}
        <ProfileNameDisplayAndEditor
          compact
          updateProfileName={updateProfileName}
          walletProfileData={walletProfileData}
        />

        {/* Address */}
        <CopyableAddress
          address={address}
          className="!w-auto"
          hideIcon
          textClassName="!text-xs"
        />
      </div>
    </div>
  )
}
