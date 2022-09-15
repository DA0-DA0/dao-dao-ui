import { ReactNode, RefCallback } from 'react'

export interface RightSidebarProps {
  wallet: ReactNode
  setContentRef: RefCallback<HTMLDivElement>
  profileImageUrl?: string
}

export interface RightSidebarContentProps {
  children: ReactNode
}
