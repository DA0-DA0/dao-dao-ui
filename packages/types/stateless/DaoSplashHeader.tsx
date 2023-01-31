import { ComponentType } from 'react'

import { DaoInfo } from '../dao'
import { FollowState } from './DaoCard'
import { LinkWrapperProps } from './LinkWrapper'

export type DaoSplashHeaderProps = {
  daoInfo: DaoInfo
  follow?: FollowState
  DaoInfoBar: ComponentType
  LinkWrapper: ComponentType<LinkWrapperProps>
}
