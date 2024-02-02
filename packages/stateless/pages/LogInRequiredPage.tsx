import { ReactNode } from 'react'

import { PageLoader } from '../components'

export type LogInRequiredPageProps = {
  connectWalletButton: ReactNode
  connecting: boolean
}

export const LogInRequiredPage = ({
  connectWalletButton,
  connecting,
}: LogInRequiredPageProps) =>
  connecting ? (
    <PageLoader />
  ) : (
    <div className="flex flex-col items-center justify-start pt-10">
      {connectWalletButton}
    </div>
  )
