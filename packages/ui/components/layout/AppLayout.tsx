import { ReactNode } from 'react'

import { Footer } from '../Footer'
import { Navigation, NavigationProps } from './Navigation'

export interface AppLayoutProps {
  children: ReactNode
  navigationProps: NavigationProps
  rightSidebar: ReactNode
}

export const AppLayout = ({
  children,
  navigationProps,
  rightSidebar,
}: AppLayoutProps) => (
  <div className="flex flex-row items-stretch w-full h-full">
    <div className="shrink-0 w-[264px]">
      <Navigation {...navigationProps} />
    </div>

    <main className="overflow-y-auto grow pb-6 border-x border-border-base">
      {children}
    </main>

    <div className="flex flex-col shrink-0 items-stretch p-6 space-y-6 w-96">
      {rightSidebar}

      <Footer />
    </div>
  </div>
)
