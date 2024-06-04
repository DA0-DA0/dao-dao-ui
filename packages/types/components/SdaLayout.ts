import { ComponentType, ReactNode } from 'react'

import { SdaNavigationProps } from './SdaNavigation'

export type SdaLayoutProps = {
  /**
   * Props for the SdaNavigation component.
   */
  navigationProps: SdaNavigationProps
  /**
   * PageHeader stateful component.
   */
  PageHeader: ComponentType
  /**
   * App content.
   */
  children: ReactNode
}
