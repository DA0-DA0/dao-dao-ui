import { ComponentType, ReactNode } from 'react'

import { DaoInfo, DaoTabWithComponent } from '../dao'
import { DaoSplashHeaderProps } from './DaoSplashHeader'
import { LinkWrapperProps } from './LinkWrapper'
import { SuspenseLoaderProps } from './SuspenseLoader'

export type DaoDappTabbedHomeProps = DaoSplashHeaderProps & {
  daoInfo: DaoInfo
  rightSidebarContent: ReactNode
  SuspenseLoader: ComponentType<SuspenseLoaderProps>
  LinkWrapper: ComponentType<LinkWrapperProps>
  tabs: DaoTabWithComponent[]
}
