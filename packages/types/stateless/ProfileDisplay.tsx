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
}
