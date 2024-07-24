import { CopyAll, WarningRounded } from '@mui/icons-material'
import clsx from 'clsx'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import {
  AccountType,
  ProfileWalletProps,
  TokenCardInfo,
  ValenceAccount,
} from '@dao-dao/types'
import {
  abbreviateAddress,
  areAccountsEqual,
  getDisplayNameForChainId,
  getImageUrlForChainId,
  sortTokensValueDescending,
} from '@dao-dao/utils'

import { Button } from '../buttons'
import { ErrorPage } from '../error'
import { DropdownIconButton } from '../icon_buttons'
import { LineLoaders } from '../LineLoader'
import { NoContent } from '../NoContent'
import { FilterableItemPopup } from '../popup'
import { TokenLineHeader } from '../token/TokenLineHeader'
import { ValenceAccountDisplay } from '../ValenceAccountDisplay'

export const ProfileWallet = <T extends TokenCardInfo>({
  readOnly,
  accounts,
  tokens,
  hiddenTokens,
  TokenLine,
  ProfileAddChains,
  ...valenceAccountTreasuryProps
}: ProfileWalletProps<T>) => {
  const { t } = useTranslation()

  const valenceAccounts =
    accounts.loading || accounts.errored
      ? []
      : accounts.data.filter(
          (account): account is ValenceAccount =>
            account.type === AccountType.Valence
        )
  // Separate valence from non-valence account tokens and display valence
  // separately.
  const nonValenceTokens =
    tokens.loading || tokens.errored
      ? []
      : tokens.data.filter(({ owner }) => owner.type !== AccountType.Valence)

  const visibleBalances =
    tokens.loading ||
    tokens.errored ||
    hiddenTokens.loading ||
    hiddenTokens.errored
      ? []
      : nonValenceTokens
          .filter(
            ({ token }) => !hiddenTokens.data.includes(token.denomOrAddress)
          )
          .sort(sortTokensValueDescending)
  const hiddenBalances =
    tokens.loading ||
    tokens.errored ||
    hiddenTokens.loading ||
    hiddenTokens.errored
      ? []
      : nonValenceTokens
          .filter(({ token }) =>
            hiddenTokens.data.includes(token.denomOrAddress)
          )
          .sort(sortTokensValueDescending)

  const [showingHidden, setShowingHidden] = useState(false)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <p className="title-text">{t('title.tokens')}</p>

        <FilterableItemPopup
          filterableItemKeys={FILTERABLE_KEYS}
          items={
            accounts.loading || accounts.errored
              ? []
              : accounts.data.map(({ type, chainId, address }) => ({
                  key: chainId + address,
                  label: getDisplayNameForChainId(chainId),
                  iconUrl: getImageUrlForChainId(chainId),
                  description: abbreviateAddress(address),
                  rightNode: (
                    <p className="caption-text self-end md:self-center">
                      {t(`accountTypeLabel.${type}`)}
                    </p>
                  ),
                  iconClassName: '!h-8 !w-8',
                  contentContainerClassName: '!gap-4',
                  chainId,
                  address,
                }))
          }
          onSelect={({ chainId, address }) => {
            navigator.clipboard.writeText(address)
            toast.success(
              t('info.copiedChainAddress', {
                chain: getDisplayNameForChainId(chainId),
              })
            )
          }}
          searchPlaceholder={t('info.searchForChain')}
          trigger={{
            type: 'button',
            props: {
              className: 'self-start',
              variant: 'secondary',
              contentContainerClassName: '!gap-1',
              loading: accounts.loading,
              disabled:
                accounts.loading ||
                accounts.errored ||
                accounts.data.length === 0,
              children: (
                <>
                  <CopyAll className="!h-4 !w-4" />
                  {t('button.copyAddress')}
                </>
              ),
            },
          }}
        />
      </div>

      <div>
        {tokens.loading ||
        hiddenTokens.loading ||
        (!tokens.errored && nonValenceTokens.length > 0) ? (
          <div>
            <TokenLineHeader />

            {tokens.loading || hiddenTokens.loading ? (
              <LineLoaders lines={10} type="token" />
            ) : (
              <div className="space-y-1">
                {visibleBalances.map((props, index) => (
                  <TokenLine
                    key={
                      props.token.chainId +
                      props.token.denomOrAddress +
                      props.owner.address
                    }
                    transparentBackground={index % 2 !== 0}
                    {...(props as T)}
                  />
                ))}
              </div>
            )}
          </div>
        ) : tokens.errored ? (
          <ErrorPage error={tokens.error} />
        ) : (
          <NoContent Icon={WarningRounded} body={t('info.nothingFound')} />
        )}

        {hiddenBalances.length > 0 && !readOnly && (
          <div className="mt-6 space-y-6">
            <div className="link-text ml-2 flex flex-row items-center gap-3 text-text-secondary">
              <DropdownIconButton
                className="text-icon-primary"
                open={showingHidden}
                toggle={() => setShowingHidden((s) => !s)}
              />

              <Button
                className="text-text-secondary"
                onClick={() => setShowingHidden((s) => !s)}
                variant="none"
              >
                {t('title.hidden')}
              </Button>
            </div>

            <div className={clsx('space-y-1', !showingHidden && 'hidden')}>
              {hiddenBalances.map((props, index) => (
                <TokenLine
                  key={
                    props.token.chainId +
                    props.token.denomOrAddress +
                    props.owner
                  }
                  transparentBackground={index % 2 !== 0}
                  {...(props as T)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {!readOnly && (
        <ProfileAddChains
          className="self-end"
          prompt={t('button.addChains')}
          promptTooltip={t('info.chainTokensNotShowingUpPrompt')}
        />
      )}

      {/* Valence Accounts */}
      {valenceAccounts.map((account) => (
        <ValenceAccountDisplay<T>
          {...valenceAccountTreasuryProps}
          key={account.address}
          TokenLine={TokenLine}
          account={account}
          className="mt-6"
          tokens={
            tokens.loading || tokens.errored
              ? tokens
              : {
                  loading: false,
                  errored: false,
                  updating: tokens.updating,
                  data: tokens.data.filter(({ owner }) =>
                    areAccountsEqual(owner, account)
                  ),
                }
          }
        />
      ))}
    </div>
  )
}

const FILTERABLE_KEYS = ['label', 'chainId', 'address']
