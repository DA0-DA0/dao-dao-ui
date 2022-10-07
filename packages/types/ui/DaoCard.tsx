import { DaoCardInfo } from '../dao'

export interface DaoCardProps extends DaoCardInfo {
  pinned: boolean
  onPin: () => void
  onMouseOver?: () => void
  onMouseLeave?: () => void
}
