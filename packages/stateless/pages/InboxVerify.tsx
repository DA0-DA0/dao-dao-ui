import { WalletConnectionStatus } from '@noahsaso/cosmodal'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { Button, PageHeaderContent, RightSidebarContent } from '../components'

export type InboxVerifyProps = {
  verify: () => void
  verifying: boolean
  status: WalletConnectionStatus
  connectWalletButton: ReactNode
  rightSidebarContent: ReactNode
}

export const InboxVerify = ({
  verify,
  verifying,
  status,
  connectWalletButton,
  rightSidebarContent,
}: InboxVerifyProps) => {
  const { t } = useTranslation()

  return (
    <>
      <RightSidebarContent>{rightSidebarContent}</RightSidebarContent>
      <PageHeaderContent
        className="mx-auto max-w-5xl"
        title={t('title.verifyEmail')}
      />

      <div className="mx-auto max-w-5xl">
        {status !== WalletConnectionStatus.Connected ? (
          connectWalletButton
        ) : (
          <Button center loading={verifying} onClick={verify} size="lg">
            {t('button.verify')}
          </Button>
        )}
      </div>
    </>
  )
}
