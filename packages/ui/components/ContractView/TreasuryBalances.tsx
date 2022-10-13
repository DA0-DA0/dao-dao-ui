import { useTranslation } from 'react-i18next'

import { CopyToClipboard } from '@dao-dao/ui'
import {
  NATIVE_DENOM,
  convertMicroDenomToDenomWithDecimals,
  nativeTokenLabel,
  nativeTokenLogoURI,
} from '@dao-dao/utils'

import { BalanceIcon, UnknownAssetBalanceIcon } from './BalanceIcon'
import { BalanceListItem } from './BalanceListItem'

export interface TreasuryBalancesProps {
  nativeTokens: {
    denom: string
    amount: string
    decimals: number
  }[]
  cw20Tokens: {
    symbol: string
    amount: string
    decimals: number
    imageUrl?: string
  }[]
  usdcValue: number
}

export const TreasuryBalances = ({
  nativeTokens,
  cw20Tokens,
  usdcValue,
}: TreasuryBalancesProps) => {
  const { t } = useTranslation()
  return (
    <ul className="flex flex-col gap-2 mt-6 list-none">
      {usdcValue > 0 && (
        <BalanceListItem>
          <span className="pb-4 header-text">
            {t('format.token', {
              amount: usdcValue.toLocaleString(undefined, {
                maximumFractionDigits: 3,
              }),
              symbol: 'USDC',
            })}
          </span>
        </BalanceListItem>
      )}
      {nativeTokens.map(({ denom, amount, decimals }) => {
        const symbol = nativeTokenLabel(denom)
        const icon = nativeTokenLogoURI(denom)
        if (symbol.toLowerCase().startsWith('ibc')) {
          // We're dealing with an IBC token we don't know about. Instead
          // of showing a long hash, allow the user to copy it.
          return (
            <BalanceListItem key={symbol}>
              <UnknownAssetBalanceIcon />
              {convertMicroDenomToDenomWithDecimals(
                amount,
                decimals
              ).toLocaleString(undefined, {
                maximumFractionDigits: decimals,
              })}{' '}
              <CopyToClipboard
                className="gap-0 caption-text"
                takeStartEnd={{
                  start: 6,
                  end: 4,
                }}
                value={symbol}
              />
            </BalanceListItem>
          )
        }
        return (
          <BalanceListItem key={symbol}>
            <BalanceIcon iconURI={icon} />
            {convertMicroDenomToDenomWithDecimals(
              amount,
              decimals
            ).toLocaleString(undefined, {
              maximumFractionDigits: decimals,
            }) +
              ' $' +
              symbol}
          </BalanceListItem>
        )
      })}
      {!nativeTokens.length && (
        <BalanceListItem>
          {/* eslint-disable-next-line i18next/no-literal-string */}
          <BalanceIcon /> 0 ${nativeTokenLabel(NATIVE_DENOM)}
        </BalanceListItem>
      )}
      {cw20Tokens.map(({ symbol, amount, decimals, imageUrl }) => (
        <BalanceListItem key={symbol}>
          <BalanceIcon iconURI={imageUrl} />
          {convertMicroDenomToDenomWithDecimals(
            amount,
            decimals
          ).toLocaleString(undefined, {
            maximumFractionDigits: decimals,
          })}{' '}
          ${symbol}
        </BalanceListItem>
      ))}
    </ul>
  )
}
