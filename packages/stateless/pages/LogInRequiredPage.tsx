import { ReactNode } from 'react'

import {
  PageHeaderContent,
  PageLoader,
  RightSidebarContent,
} from '../components'

export type LogInRequiredPageProps = {
  title: string
  rightSidebarContent: ReactNode
  connectWalletButton: ReactNode
  connecting: boolean
}

export const LogInRequiredPage = ({
  title,
  rightSidebarContent,
  connectWalletButton,
  connecting,
}: LogInRequiredPageProps) => (
  <>
    <RightSidebarContent>{rightSidebarContent}</RightSidebarContent>
    <PageHeaderContent className="mx-auto max-w-5xl" title={title} />

    {connecting ? (
      <PageLoader />
    ) : (
      <div className="mx-auto max-w-5xl">{connectWalletButton}</div>
    )}
  </>
)
