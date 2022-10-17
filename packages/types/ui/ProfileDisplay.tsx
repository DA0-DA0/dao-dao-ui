import { CopyToClipboardProps } from '@dao-dao/ui'

import { WalletProfile } from '../wallet'
import { LoadingData } from './common'

export interface ProfileDisplayProps {
  address: string
  loadingProfile: LoadingData<WalletProfile>
  imageSize?: number
  hideImage?: boolean
  copyToClipboardProps?: Partial<Omit<CopyToClipboardProps, 'label' | 'value'>>
}
