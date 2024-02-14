import clsx from 'clsx'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  LazyNftCardInfo,
  TokenCardInfo,
  WalletBalancesProps,
} from '@dao-dao/types'

import { useButtonPopupSorter, useTokenSortOptions } from '../../hooks'
import { Button } from '../buttons'
import { ErrorPage } from '../error'
import { DropdownIconButton } from '../icon_buttons'
import { LineLoaders } from '../LineLoader'
import { NftSection } from '../nft/NftSection'
import { ButtonPopup } from '../popup'
import { TokenLineHeader } from '../token/TokenLineHeader'

export const WalletBalances = <
  T extends TokenCardInfo,
  N extends LazyNftCardInfo
>({
  tokens,
  hiddenTokens,
  TokenLine,
  nfts,
  NftCard,
}: WalletBalancesProps<T, N>) => {
  const { t } = useTranslation()

  const tokenSortOptions = useTokenSortOptions()
  const {
    sortedData: sortedTokens,
    buttonPopupProps: sortTokenButtonPopupProps,
  } = useButtonPopupSorter({
    data: tokens.loading || tokens.errored ? undefined : tokens.data,
    options: tokenSortOptions,
  })

  const visibleBalances = hiddenTokens.loading
    ? []
    : sortedTokens.filter(
        ({ token }) => !hiddenTokens.data.includes(token.denomOrAddress)
      )
  const hiddenBalances = hiddenTokens.loading
    ? []
    : sortedTokens.filter(({ token }) =>
        hiddenTokens.data.includes(token.denomOrAddress)
      )

  const [showingHidden, setShowingHidden] = useState(false)

  return (
    <div className="flex flex-col gap-8">
      <div>
        {tokens.loading ||
        hiddenTokens.loading ||
        (!tokens.errored && tokens.data.length > 0) ? (
          <div>
            <div className="mb-6 flex flex-row justify-end">
              <ButtonPopup position="left" {...sortTokenButtonPopupProps} />
            </div>

            <TokenLineHeader />

            {tokens.loading || hiddenTokens.loading ? (
              <LineLoaders lines={10} type="token" />
            ) : (
              <div className="space-y-1">
                {visibleBalances.map((props, index) => (
                  <TokenLine
                    key={
                      props.token.chainId + props.token.denomOrAddress + index
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
          <p className="secondary-text">{t('info.nothingFound')}</p>
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
                  key={props.token.chainId + props.token.denomOrAddress + index}
                  transparentBackground={index % 2 !== 0}
                  {...(props as T)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <NftSection NftCard={NftCard} nfts={nfts} />
    </div>
  )
}
