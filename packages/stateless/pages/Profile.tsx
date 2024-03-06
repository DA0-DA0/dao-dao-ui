import { useRouter } from 'next/router'
import { ComponentType, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import {
  AccountTab,
  AccountTabId,
  StatefulConnectWalletProps,
  WalletProfileHeaderProps,
} from '@dao-dao/types'

import { TabBar, WalletProfileHeader, WarningCard } from '../components'

export type ProfileProps = {
  tabs: AccountTab[]
} & Pick<
  WalletProfileHeaderProps,
  | 'openProfileNftUpdate'
  | 'profile'
  | 'updateProfile'
  | 'mergeProfileType'
  | 'openMergeProfilesModal'
> &
  (
    | {
        connected: false
        connect: () => Promise<void>
        ConnectWallet: ComponentType<StatefulConnectWalletProps>
      }
    | {
        connected: true
        connect?: never
        ConnectWallet?: never
      }
  )

export const Profile = ({
  tabs,
  connected,
  connect,
  ConnectWallet,
  ...headerProps
}: ProfileProps) => {
  const { t } = useTranslation()
  const router = useRouter()

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
    // the default `/profile` page will render the first tab, and also that an
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
        {!connected && <ConnectWallet variant="ghost" />}
      </WalletProfileHeader>

      <TabBar
        onSelect={(tab) =>
          router.replace(`/me/${tab}`, undefined, { shallow: true })
        }
        selectedTabId={selectedTabId}
        tabs={tabs}
      />

      {/* Don't render a tab unless it is visible. */}
      {connected ? (
        selectedTab && <selectedTab.Component />
      ) : (
        <WarningCard
          className="self-center mt-4"
          content={t('info.logInToViewPage')}
          onClick={connect}
        />
      )}
    </div>
  )
}
