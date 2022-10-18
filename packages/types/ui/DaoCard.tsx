import { DaoParentInfo } from '../dao'
import { LoadingData } from './common'

// Loaded by card once displaying.
export interface DaoCardInfoLazyData {
  isMember: boolean
  tokenBalance: number
  proposalCount: number
}

export interface DaoCardInfo {
  // Use ChainInfoID from @noahsaso/cosmodal.
  chainId: string
  coreAddress: string
  name: string
  description: string
  imageUrl: string
  established?: Date
  className?: string
  showIsMember?: boolean
  parentDao?: DaoParentInfo
  tokenSymbol: string
  tokenDecimals: number

  lazyData: LoadingData<DaoCardInfoLazyData>
}

export interface DaoCardProps extends DaoCardInfo {
  pinned: boolean
  onPin: () => void
  hidePin?: boolean
  onMouseOver?: () => void
  onMouseLeave?: () => void
}
