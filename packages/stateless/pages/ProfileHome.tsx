import clsx from 'clsx'
import { useRouter } from 'next/router'
import { ComponentType } from 'react'

import {
  AccountTab,
  AccountTabId,
  SuspenseLoaderProps,
  WalletActionsProviderProps,
  WalletProfileHeaderProps,
} from '@dao-dao/types'
import {
  PAGE_PADDING_HORIZONTAL_CLASSES,
  UNDO_PAGE_PADDING_HORIZONTAL_CLASSES,
  UNDO_PAGE_PADDING_TOP_CLASSES,
  UNDO_PAGE_PADDING_TOP_CLASSES_WITH_TOP,
  transformBech32Address,
} from '@dao-dao/utils'

import { Loader, TabBar, WalletProfileHeader } from '../components'
import { useChain } from '../hooks'

export type ProfileHomeProps = {
  tabs: AccountTab[]
  walletAddress?: string
  SuspenseLoader: ComponentType<SuspenseLoaderProps>
  WalletActionsProvider: ComponentType<WalletActionsProviderProps>
} & Pick<
  WalletProfileHeaderProps,
  | 'openProfileNftUpdate'
  | 'profile'
  | 'updateProfile'
  | 'mergeProfileType'
  | 'openMergeProfilesModal'
>

export const ProfileHome = ({
  tabs,
  walletAddress,
  SuspenseLoader,
  WalletActionsProvider,
  ...headerProps
}: ProfileHomeProps) => {
  const router = useRouter()
  const { chain_id: chainId } = useChain()

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
    <div
      className={clsx(
        'relative z-[1] flex flex-col items-stretch gap-6 min-h-full',
        // Only undo top page padding on mobile, not desktop.
        'md:!mt-0',
        UNDO_PAGE_PADDING_TOP_CLASSES
      )}
    >
      {/* Only show on desktop. On mobile, shows on EditProfile page. */}
      <WalletProfileHeader
        className="hidden md:flex"
        editable
        {...headerProps}
      />

      <div
        className={clsx(
          // Stick to the top when the tab content scrolls down. Use higher z
          // index to make sure this stays above tab content.
          'sticky z-20 flex flex-col items-stretch bg-background-base',
          UNDO_PAGE_PADDING_TOP_CLASSES_WITH_TOP,
          // Only undo horizontal page padding on mobile, not desktop.
          'md:!mx-0 md:!px-0',
          UNDO_PAGE_PADDING_HORIZONTAL_CLASSES,
          PAGE_PADDING_HORIZONTAL_CLASSES
        )}
      >
        <TabBar
          onSelect={(tab) =>
            router.replace(`/${tab}`, undefined, { shallow: true })
          }
          selectedTabId={selectedTabId}
          tabs={tabs}
        />
      </div>

      {/* Don't render a tab unless visible. */}
      {selectedTab && (
        <div
          className={clsx(
            'grow flex flex-col justify-start items-stretch mb-4'
          )}
        >
          <WalletActionsProvider
            address={
              // Convert address to prevent blink on chain switch.
              walletAddress
                ? transformBech32Address(walletAddress, chainId)
                : undefined
            }
          >
            {/* Suspend to prevent hydration error since we load state on first render from localStorage. */}
            <SuspenseLoader fallback={<Loader />}>
              <selectedTab.Component />
            </SuspenseLoader>
          </WalletActionsProvider>
        </div>
      )}
    </div>
  )
}
