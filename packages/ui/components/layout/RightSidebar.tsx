import { ReactNode } from 'react'

import { Footer } from '../Footer'

export interface RightSidebarProps {
  wallet: ReactNode
  children: ReactNode
}

export const RightSidebar = ({ wallet, children }: RightSidebarProps) => {
  return (
    <div className="flex flex-col shrink-0 items-stretch p-6 pt-0 w-96">
      {wallet}

      <div className="mt-2">{children}</div>

      <div className="mt-7">
        <Footer />
      </div>
    </div>
  )
}
