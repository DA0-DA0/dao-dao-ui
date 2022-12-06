import { Profile } from '../profile'
import { LoadingData } from './common'
import { CopyToClipboardProps } from './CopyToClipboard'

export interface ProfileDisplayProps {
  address: string
  loadingProfile: LoadingData<Profile>
  imageSize?: number
  hideImage?: boolean
  copyToClipboardProps?: Partial<Omit<CopyToClipboardProps, 'label' | 'value'>>
  size?: 'default' | 'lg'
  className?: string
}

export type StatefulProfileDisplayProps = Omit<
  ProfileDisplayProps,
  'loadingProfile'
> & {
  // Allow specifying public key to speed up profile loading. Just providing an
  // address requires a chain query to fetch the public key. If we know the
  // profile is a wallet and have its public key, we can skip the chain query.
  walletHexPublicKey?: string
}
