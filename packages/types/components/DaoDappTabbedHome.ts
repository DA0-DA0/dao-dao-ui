import { ComponentType } from 'react'

import { DaoTabWithComponent } from '../dao'
import { ButtonLinkProps } from './Buttonifier'
import { DaoSplashHeaderProps } from './DaoSplashHeader'
import { LinkWrapperProps } from './LinkWrapper'
import { SuspenseLoaderProps } from './SuspenseLoader'

export type DaoDappTabbedHomeProps = Omit<DaoSplashHeaderProps, 'dao'> & {
  SuspenseLoader: ComponentType<SuspenseLoaderProps>
  ButtonLink: ComponentType<ButtonLinkProps>
  LinkWrapper: ComponentType<LinkWrapperProps>
  tabs: DaoTabWithComponent[]
  selectedTabId: string
  onSelectTabId: (tab: string) => void
}
