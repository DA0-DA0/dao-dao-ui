import {
  GroupRounded,
  ReceiptRounded,
  WalletRounded,
} from '@mui/icons-material'
import { useRouter } from 'next/router'
import { ComponentType, ReactNode, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import {
  AccountTab,
  AccountTabId,
  WalletProfileHeaderProps,
} from '@dao-dao/types'

import {
  PageHeaderContent,
  RightSidebarContent,
  TabBar,
  WalletProfileHeader,
} from '../components'

export type MeProps = {
  rightSidebarContent: ReactNode
  MeBalances: ComponentType
  MeTransactionBuilder: ComponentType
  MeDaos: ComponentType
  ChainSwitcher: ComponentType<any>
} & Pick<
  WalletProfileHeaderProps,
  'openProfileNftUpdate' | 'profileData' | 'updateProfileName'
>

export const Me = ({
  rightSidebarContent,
  MeBalances,
  MeTransactionBuilder,
  MeDaos,
  ChainSwitcher,
  ...headerProps
}: MeProps) => {
  const { t } = useTranslation()
  const router = useRouter()

  const tabs: AccountTab[] = [
    {
      id: AccountTabId.Balances,
      label: t('title.balances'),
      Icon: WalletRounded,
      Component: MeBalances,
    },
    {
      id: AccountTabId.Daos,
      label: t('title.daos'),
      Icon: GroupRounded,
      Component: MeDaos,
    },
    {
      id: AccountTabId.TransactionBuilder,
      label: t('title.transactionBuilder'),
      Icon: ReceiptRounded,
      Component: MeTransactionBuilder,
    },
  ]

  // Pre-fetch tabs.
  useEffect(() => {
    Object.values(AccountTabId).forEach((tab) => {
      router.prefetch(`/me/${tab}`)
    })
  }, [router])

  const _tab = router.query.tab
  const tabPath = _tab && Array.isArray(_tab) ? _tab[0] : undefined
  const selectedTabId =
    // If tabPath is not a valid tab, default to first tab. This ensures that
    // the default `/me` page will render the first tab, and also that an
    // invalid tab was not passed, though that should be impossible because Next
    // will render any invalid tabs (not in the `getStaticPaths` function) with
    // a 404 page.
    tabPath && tabs.some(({ id }) => id === tabPath)
      ? (tabPath as AccountTabId)
      : tabs[0].id
  const selectedTab = tabs.find(({ id }) => id === selectedTabId)

  return (
    <>
      <RightSidebarContent>{rightSidebarContent}</RightSidebarContent>
      <PageHeaderContent
        className="mx-auto max-w-5xl"
        gradient
        rightNode={<ChainSwitcher />}
        title={t('title.account')}
      />

      <div className="mx-auto flex max-w-5xl flex-col items-stretch gap-6">
        <WalletProfileHeader editable {...headerProps} />

        <TabBar
          onSelect={(tab) =>
            router.replace(`/me/${tab}`, undefined, { shallow: true })
          }
          selectedTabId={selectedTabId}
          tabs={tabs}
        />

        {/* Don't render a tab unless it is visible. */}
        {selectedTab && <selectedTab.Component />}
      </div>
    </>
  )
}
