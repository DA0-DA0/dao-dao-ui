import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { PageLoader, useAppLayoutContext } from '../components'

export interface MeDisconnectedProps {
  rightSidebarContent: ReactNode
  connectWalletButton: ReactNode
  connecting: boolean
}

export const MeDisconnected = ({
  rightSidebarContent,
  connectWalletButton,
  connecting,
}: MeDisconnectedProps) => {
  const { t } = useTranslation()
  const { RightSidebarContent, PageHeader } = useAppLayoutContext()

  return (
    <>
      <RightSidebarContent>{rightSidebarContent}</RightSidebarContent>
      <PageHeader className="mx-auto max-w-5xl" title={t('title.me')} />

      {connecting ? (
        <PageLoader />
      ) : (
        <div className="mx-auto max-w-5xl">{connectWalletButton}</div>
      )}
    </>
  )
}
