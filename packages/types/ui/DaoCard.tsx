import { DaoCardInfo } from '../dao'

export interface DaoCardProps extends DaoCardInfo {
  pinned: boolean
  onPin: () => void
  showIsMember?: boolean
  className?: string
  onMouseOver?: () => void
  onMouseLeave?: () => void
}
