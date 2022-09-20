import { ReactNode, RefCallback } from 'react'

export interface RightSidebarProps {
  wallet: ReactNode
  setContentRef: RefCallback<HTMLDivElement>
}

export interface RightSidebarContentProps {
  children: ReactNode
}
