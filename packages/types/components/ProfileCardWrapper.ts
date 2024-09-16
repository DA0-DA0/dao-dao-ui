import { ReactNode } from 'react'

import { LoadingData } from '../misc'
import { UnifiedProfile } from '../profile'

export type ProfileCardWrapperProps = {
  children?: ReactNode | ReactNode[]
  profile: LoadingData<UnifiedProfile>
  underHeaderComponent?: ReactNode
  childContainerClassName?: string
  compact?: boolean
  className?: string
  tintColor?: string
}
