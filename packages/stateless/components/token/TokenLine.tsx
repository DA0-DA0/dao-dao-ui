import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  ChainLogo,
  Modal,
  TokenAmountDisplay,
  Tooltip,
} from '@dao-dao/stateless'
import { TokenCardInfo, TokenLineProps } from '@dao-dao/types'
import {
  getDisplayNameForChainId,
  getFallbackImage,
  shortenTokenSymbol,
  toAccessibleImageUrl,
} from '@dao-dao/utils'

export const TokenLine = <T extends TokenCardInfo>(
  props: TokenLineProps<T>
) => {
  const {
    TokenCard,
    token,
    transparentBackground,
    lazyInfo,
    color,
    hideChainIcon,
  } = props
  const { t } = useTranslation()

  const { tokenSymbol } = shortenTokenSymbol(token.symbol)

  const [cardVisible, setCardVisible] = useState(false)
  // On route change, close the card.
  const { asPath } = useRouter()
  useEffect(() => {
    setCardVisible(false)
  }, [asPath])

  return (
    <>
      <div
        className={clsx(
          'box-content grid h-8 cursor-pointer grid-cols-2 items-center gap-4 rounded-lg py-2 px-3 transition hover:bg-background-interactive-hover active:bg-background-interactive-pressed sm:grid-cols-[2fr_1fr_1fr] md:py-3 md:px-4',
          !transparentBackground && 'bg-background-tertiary'
        )}
        onClick={() => setCardVisible(true)}
      >
        <div className="flex min-w-0 flex-row items-center gap-2 md:gap-3">
          <Tooltip
            title={t('info.tokenOnChain', {
              token: tokenSymbol,
              chain: getDisplayNameForChainId(token.chainId),
            })}
          >
            <div
              className="relative h-6 w-6 shrink-0 rounded-full bg-cover bg-center md:h-8 md:w-8"
              style={{
                backgroundImage: `url(${toAccessibleImageUrl(
                  token.imageUrl || getFallbackImage(token.denomOrAddress)
                )})`,
              }}
            >
              {!hideChainIcon && (
                <>
                  {/* Large screen */}
                  <ChainLogo
                    chainId={token.chainId}
                    className="absolute -bottom-1 -right-1 hidden md:block"
                    size={16}
                  />
                  {/* Small screen */}
                  <ChainLogo
                    chainId={token.chainId}
                    className="absolute -bottom-1 -right-1 md:hidden"
                    size={12}
                  />
                </>
              )}
            </div>
          </Tooltip>

          <p className="title-text truncate text-sm md:text-base">
            {tokenSymbol}
          </p>

          {color && (
            <div
              className="hidden h-2 w-2 shrink-0 rounded-full md:block"
              style={{
                backgroundColor: color,
              }}
            ></div>
          )}
        </div>

        <TokenAmountDisplay
          amount={
            lazyInfo.loading ? { loading: true } : lazyInfo.data.totalBalance
          }
          className="body-text truncate text-right font-mono"
          decimals={token.decimals}
          hideSymbol
          showFullAmount
        />

        {/* Only show on larger screen. */}
        {lazyInfo.loading || lazyInfo.data.usdUnitPrice?.usdPrice ? (
          <div className="hidden flex-row items-center justify-end sm:flex">
            <TokenAmountDisplay
              amount={
                lazyInfo.loading || !lazyInfo.data.usdUnitPrice?.usdPrice
                  ? { loading: true }
                  : lazyInfo.data.totalBalance *
                    lazyInfo.data.usdUnitPrice.usdPrice
              }
              className="caption-text font-mono"
              dateFetched={
                lazyInfo.loading || !lazyInfo.data.usdUnitPrice
                  ? undefined
                  : lazyInfo.data.usdUnitPrice.timestamp
              }
              estimatedUsdValue
              hideSymbol
              prefix="$"
            />
          </div>
        ) : (
          <div className="hidden sm:block"></div>
        )}
      </div>

      <Modal
        containerClassName="border-border-primary w-full"
        contentContainerClassName="!p-0"
        hideCloseButton
        onClose={() => setCardVisible(false)}
        visible={cardVisible}
      >
        <TokenCard {...props} />
      </Modal>
    </>
  )
}
