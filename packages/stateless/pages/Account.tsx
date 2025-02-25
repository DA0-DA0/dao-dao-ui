import { GroupRounded, WalletRounded } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { ComponentType, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import {
  AccountTab,
  AccountTabId,
  ButtonLinkProps,
  LoadingDataWithError,
  SuspenseLoaderProps,
  WalletProfileHeaderProps,
} from '@dao-dao/types'
import { getAccountPath } from '@dao-dao/utils'

import {
  CopyableAddress,
  ErrorPage,
  Loader,
  TabBar,
  WalletProfileHeader,
} from '../components'

export type AccountProps = {
  address: string
  hexPublicKey: LoadingDataWithError<string | undefined>
  AccountDaos: ComponentType
  AccountWallet: ComponentType
  SuspenseLoader: ComponentType<SuspenseLoaderProps>
  ButtonLink: ComponentType<ButtonLinkProps>
} & Pick<WalletProfileHeaderProps, 'profile' | 'entity'>

export const Account = ({
  address,
  hexPublicKey,
  AccountDaos,
  AccountWallet,
  SuspenseLoader,
  ButtonLink,
  ...headerProps
}: AccountProps) => {
  const { t } = useTranslation()
  const router = useRouter()

  const tabs: AccountTab[] = [
    {
      id: AccountTabId.Daos,
      label: t('title.daos'),
      Icon: GroupRounded,
      Component: AccountDaos,
    },
    {
      id: AccountTabId.Wallet,
      label: t('title.wallet'),
      Icon: WalletRounded,
      Component: AccountWallet,
    },
  ]

  // Pre-fetch tabs.
  useEffect(() => {
    tabs.forEach(({ id }) => {
      router.prefetch(getAccountPath(address, id))
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, address])

  const _tab = router.query.tab
  const tabPath = _tab && Array.isArray(_tab) ? _tab[0] : undefined
  const selectedTabId =
    // If tabPath is not a valid tab, default to first tab. This ensures that
    // the default `/account/:address` page will render the first tab, and also
    // that an invalid tab was not passed.
    tabPath && tabs.some(({ id }) => id === tabPath)
      ? (tabPath as AccountTabId)
      : tabs[0].id
  const selectedTab = tabs.find(({ id }) => id === selectedTabId)

  return (
    <div className="flex min-h-full flex-col items-stretch gap-6">
      {!hexPublicKey.loading && (hexPublicKey.errored || !hexPublicKey.data) ? (
        <ErrorPage title={t('error.couldntFindWallet')}>
          <ButtonLink href="/" variant="secondary">
            {t('button.returnHome')}
          </ButtonLink>
        </ErrorPage>
      ) : (
        <>
          <WalletProfileHeader editable={false} {...headerProps}>
            <CopyableAddress address={address} />
          </WalletProfileHeader>

          <TabBar
            onSelect={(tab) =>
              router.replace(getAccountPath(address, tab), undefined, {
                shallow: true,
              })
            }
            selectedTabId={selectedTabId}
            tabs={tabs}
          />

          {/* Don't render a tab unless it is visible. */}
          {selectedTab && (
            <SuspenseLoader fallback={<Loader />}>
              <selectedTab.Component />
            </SuspenseLoader>
          )}
        </>
      )}
    </div>
  )
}
