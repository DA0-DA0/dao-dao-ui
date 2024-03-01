import { CopyAll, WarningRounded } from '@mui/icons-material'
import clsx from 'clsx'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { ProfileWalletProps, TokenCardInfo } from '@dao-dao/types'
import {
  concatAddressStartEnd,
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

export const ProfileWallet = <T extends TokenCardInfo>({
  chains,
  tokens,
  hiddenTokens,
  TokenLine,
  ProfileAddChains,
}: ProfileWalletProps<T>) => {
  const { t } = useTranslation()

  const visibleBalances =
    tokens.loading ||
    tokens.errored ||
    hiddenTokens.loading ||
    hiddenTokens.errored
      ? []
      : tokens.data
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
      : tokens.data
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
            chains.loading
              ? []
              : chains.data.map(({ chainId, address }) => ({
                  key: chainId + address,
                  label: getDisplayNameForChainId(chainId),
                  iconUrl: getImageUrlForChainId(chainId),
                  rightNode: (
                    <p className="caption-text">
                      {concatAddressStartEnd(address, 10, 6)}
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
        (!tokens.errored && tokens.data.length > 0) ? (
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

        {hiddenBalances.length > 0 && (
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

      <ProfileAddChains
        className="mt-4"
        prompt={t('info.chainTokensNotShowingUpPrompt')}
      />
    </div>
  )
}

const FILTERABLE_KEYS = ['label', 'chainId', 'address']
