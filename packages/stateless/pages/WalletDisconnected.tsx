import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import {
  PageHeaderContent,
  PageLoader,
  RightSidebarContent,
} from '../components'

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

  return (
    <>
      <RightSidebarContent>{rightSidebarContent}</RightSidebarContent>
      <PageHeaderContent
        className="mx-auto max-w-5xl"
        title={t('title.wallet')}
      />

      {autoConnecting ? (
        <PageLoader />
      ) : (
        <div className="mx-auto max-w-5xl">{connectWalletButton}</div>
      )}
    </>
  )
}
