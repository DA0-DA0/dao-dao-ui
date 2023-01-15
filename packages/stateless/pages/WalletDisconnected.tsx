import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { PageLoader, useAppLayoutContext } from '../components'

export interface WalletDisconnectedProps {
  rightSidebarContent: ReactNode
  connectWalletButton: ReactNode
  autoConnecting: boolean
}

export const WalletDisconnected = ({
  rightSidebarContent,
  connectWalletButton,
  autoConnecting,
}: WalletDisconnectedProps) => {
  const { t } = useTranslation()
  const { RightSidebarContent, PageHeader } = useAppLayoutContext()

  return (
    <>
      <RightSidebarContent>{rightSidebarContent}</RightSidebarContent>
      <PageHeader className="mx-auto max-w-5xl" title={t('title.wallet')} />

      {autoConnecting ? (
        <PageLoader />
      ) : (
        <div className="mx-auto max-w-5xl">{connectWalletButton}</div>
      )}
    </>
  )
}
