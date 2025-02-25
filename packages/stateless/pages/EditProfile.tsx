import { useRouter } from 'next/router'
import { ComponentType } from 'react'

import {
  StatefulDisconnectWalletProps,
  WalletProfileHeaderProps,
} from '@dao-dao/types'

import { WalletProfileHeader } from '../components'

export type EditProfileProps = {
  DisconnectWallet: ComponentType<StatefulDisconnectWalletProps>
} & Pick<
  WalletProfileHeaderProps,
  | 'openProfileNftUpdate'
  | 'profile'
  | 'entity'
  | 'updateProfile'
  | 'mergeProfileType'
  | 'openMergeProfilesModal'
>

export const EditProfile = ({
  DisconnectWallet,
  ...headerProps
}: EditProfileProps) => {
  const router = useRouter()

  return (
    <div className="flex flex-col items-stretch gap-8">
      <WalletProfileHeader editable {...headerProps} />

      <DisconnectWallet
        afterDisconnect={() => router.push('/')}
        center
        className="w-full max-w-xs self-center"
        variant="secondary"
      />
    </div>
  )
}
