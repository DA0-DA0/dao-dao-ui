import clsx from 'clsx'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

import { LogInRequiredPage, Inbox as StatelessInbox } from '@dao-dao/stateless'
import {
  NOTIFICATIONS_PAGE_DESCRIPTION,
  NOTIFICATIONS_PAGE_TITLE,
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
        description={NOTIFICATIONS_PAGE_DESCRIPTION}
        openGraph={{
          url: SITE_URL + asPath,
          title: NOTIFICATIONS_PAGE_TITLE,
          description: NOTIFICATIONS_PAGE_DESCRIPTION,
        }}
        title={NOTIFICATIONS_PAGE_TITLE}
      />

      <PageHeaderContent
        forceExpandBorderToEdge
        rightNode={
          <div className="flex flex-row items-center gap-1 md:gap-2">
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
