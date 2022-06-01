import { FC } from 'react'

import {
  nativeTokenLabel,
  nativeTokenLogoURI,
  convertMicroDenomToDenomWithDecimals,
  convertDenomToHumanReadableDenom,
  NATIVE_DENOM,
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
}

export const TreasuryBalances: FC<TreasuryBalancesProps> = ({
  nativeTokens,
  cw20Tokens,
}) => (
  <ul className="flex flex-col gap-2 mt-6 list-none">
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
            maximumFractionDigits: 20,
          }) +
            ' $' +
            symbol}
        </BalanceListItem>
      )
    })}
    {!nativeTokens.length && (
      <BalanceListItem>
        <BalanceIcon />0 $
        {convertDenomToHumanReadableDenom(NATIVE_DENOM).toUpperCase()}
      </BalanceListItem>
    )}
    {cw20Tokens.map(({ symbol, amount, decimals, imageUrl }) => (
      <BalanceListItem key={symbol}>
        <BalanceIcon iconURI={imageUrl} />
        {convertMicroDenomToDenomWithDecimals(amount, decimals).toLocaleString(
          undefined,
          {
            maximumFractionDigits: decimals,
          }
        )}{' '}
        ${symbol}
      </BalanceListItem>
    ))}
  </ul>
)
