import { ReactNode } from 'react'

import { PageLoader, RightSidebarContent } from '../components'

export type LogInRequiredPageProps = {
  rightSidebarContent: ReactNode
  connectWalletButton: ReactNode
  connecting: boolean
}

export const LogInRequiredPage = ({
  rightSidebarContent,
  connectWalletButton,
  connecting,
}: LogInRequiredPageProps) => (
  <>
    <RightSidebarContent>{rightSidebarContent}</RightSidebarContent>

    {connecting ? (
      <PageLoader />
    ) : (
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-start pt-10">
        {connectWalletButton}
      </div>
    )}
  </>
)
