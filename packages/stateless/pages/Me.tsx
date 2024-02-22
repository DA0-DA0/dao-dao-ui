import {
  GroupRounded,
  ReceiptRounded,
  WalletRounded,
} from '@mui/icons-material'
import { useRouter } from 'next/router'
import { ComponentType, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import {
  AccountTab,
  AccountTabId,
  WalletProfileHeaderProps,
} from '@dao-dao/types'

import { CopyableAddress, TabBar, WalletProfileHeader } from '../components'

export type MeProps = {
  MeBalances: ComponentType
  MeTransactionBuilder: ComponentType
  MeDaos: ComponentType
} & Pick<
  WalletProfileHeaderProps,
  'openProfileNftUpdate' | 'profileData' | 'updateProfileName'
>

export const Me = ({
  MeBalances,
  MeTransactionBuilder,
  MeDaos,
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
    <div className="flex flex-col items-stretch gap-6">
      <WalletProfileHeader editable {...headerProps}>
        <CopyableAddress address={headerProps.profileData.address} />
      </WalletProfileHeader>

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
  )
}
