import { ReactNode } from 'react'

import { DappNavigationProps } from './DappNavigation'

export interface DappLayoutProps {
  navigationProps: DappNavigationProps
  children: ReactNode
}
