import clsx from 'clsx'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

import { LogInRequiredPage, Inbox as StatelessInbox } from '@dao-dao/stateless'
import {
  SITE_URL,
  UNDO_PAGE_PADDING_HORIZONTAL_CLASSES,
  UNDO_PAGE_PADDING_TOP_CLASSES,
} from '@dao-dao/utils'

import { useInboxApiWithUi, useWallet } from '../../hooks'
import { ConnectWallet } from '../ConnectWallet'
import { InboxMainItemRenderer } from '../inbox'
import { PageHeaderContent } from '../PageHeaderContent'

export const Inbox: NextPage = () => {
  const { t } = useTranslation()
  const { asPath } = useRouter()
  const { isWalletConnected, isWalletConnecting } = useWallet()

  const inbox = useInboxApiWithUi({
    mode: 'page',
  })

  return (
    <>
      <NextSeo
        description={t('info.notificationsDescription')}
        openGraph={{
          url: SITE_URL + asPath,
          title: t('title.notifications'),
          description: t('info.notificationsDescription'),
        }}
        title={t('title.notifications')}
      />

      <PageHeaderContent
        forceExpandBorderToEdge
        rightNode={
          <div className="hidden flex-row items-center gap-1 md:flex md:gap-2">
            {inbox.buttons.refresh}
            {inbox.buttons.clear}
            {inbox.buttons.settings}
          </div>
        }
        title={t('title.notifications')}
      />

      <div
        className={clsx(
          UNDO_PAGE_PADDING_TOP_CLASSES,
          UNDO_PAGE_PADDING_HORIZONTAL_CLASSES
        )}
      >
        {/* Mobile button header underneath page header. */}
        <div className="flex flex-row items-center justify-between border-b border-border-secondary py-3 px-4 md:hidden">
          <div className="flex flex-row items-center gap-2">
            {inbox.buttons.refresh}
            {inbox.buttons.settings}
          </div>

          {inbox.buttons.clear}
        </div>

        {isWalletConnected ? (
          <StatelessInbox
            InboxMainItemRenderer={InboxMainItemRenderer}
            connected
            inbox={inbox}
          />
        ) : (
          <LogInRequiredPage
            connectWalletButton={<ConnectWallet />}
            connecting={isWalletConnecting}
          />
        )}
      </div>
    </>
  )
}
