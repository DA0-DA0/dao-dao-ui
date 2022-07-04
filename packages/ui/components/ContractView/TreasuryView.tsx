import { FC } from 'react'

import { useTranslation } from '@dao-dao/i18n'
import {
  NATIVE_DENOM,
  convertMicroDenomToDenomWithDecimals,
  nativeTokenLabel,
  nativeTokenLogoURI,
} from '@dao-dao/utils'

import { BalanceIcon } from './BalanceIcon'
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
  tvl: {
    amount: number
    denom: string
  }
}

export const TreasuryBalances: FC<TreasuryBalancesProps> = ({
  nativeTokens,
  cw20Tokens,
  tvl,
}) => {
  const { t } = useTranslation()
  return (
    <ul className="flex flex-col gap-2 mt-6 list-none">
      {tvl.amount > 0 && (
        <BalanceListItem>
          <span className="text-lg font-bold text-slate-50">
            {t('format.currency', { val: tvl.amount })}
          </span>
        </BalanceListItem>
      )}
      {nativeTokens.map(({ denom, amount, decimals }) => {
        const symbol = nativeTokenLabel(denom)
        const icon = nativeTokenLogoURI(denom)
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
