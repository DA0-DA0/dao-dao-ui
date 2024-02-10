import { useTranslation } from 'react-i18next'

import { SortFn, TokenCardInfo, TypedOption } from '@dao-dao/types'

/**
 * Options to use with the `useButtonPopupSorter` hook and the `ButtonPopup`
 * component for sorting token lists.
 */
export const useTokenSortOptions = (): TypedOption<
  SortFn<Pick<TokenCardInfo, 'token' | 'unstakedBalance' | 'lazyInfo'>>
>[] => {
  const { t } = useTranslation()

  return [
    {
      label: t('info.highestUsdValue'),
      value: (a, b) => {
        // If loading or no price, show at bottom.
        const aPrice =
          a.lazyInfo.loading || !a.lazyInfo.data.usdUnitPrice?.usdPrice
            ? undefined
            : a.lazyInfo.data.totalBalance *
              a.lazyInfo.data.usdUnitPrice.usdPrice
        const bPrice =
          b.lazyInfo.loading || !b.lazyInfo.data.usdUnitPrice?.usdPrice
            ? undefined
            : b.lazyInfo.data.totalBalance *
              b.lazyInfo.data.usdUnitPrice.usdPrice

        // If prices are equal, sort alphabetically by symbol.
        return aPrice === bPrice
          ? a.token.symbol
              .toLocaleLowerCase()
              .localeCompare(b.token.symbol.toLocaleLowerCase())
          : aPrice === undefined
          ? 1
          : bPrice === undefined
          ? -1
          : bPrice - aPrice
      },
    },
    {
      label: t('info.lowestUsdValue'),
      value: (a, b) => {
        // If loading or no price, show at bottom.
        const aPrice =
          a.lazyInfo.loading || !a.lazyInfo.data.usdUnitPrice?.usdPrice
            ? undefined
            : a.lazyInfo.data.totalBalance *
              a.lazyInfo.data.usdUnitPrice.usdPrice
        const bPrice =
          b.lazyInfo.loading || !b.lazyInfo.data.usdUnitPrice?.usdPrice
            ? undefined
            : b.lazyInfo.data.totalBalance *
              b.lazyInfo.data.usdUnitPrice.usdPrice

        // If prices are equal, sort alphabetically by symbol.
        return aPrice === bPrice
          ? a.token.symbol
              .toLocaleLowerCase()
              .localeCompare(b.token.symbol.toLocaleLowerCase())
          : aPrice === undefined
          ? 1
          : bPrice === undefined
          ? -1
          : aPrice - bPrice
      },
    },
    {
      // Most token symbols are in English, so no need to translate.
      label: 'A → Z',
      value: (a, b) =>
        a.token.symbol
          .toLocaleLowerCase()
          .localeCompare(b.token.symbol.toLocaleLowerCase()),
    },
    {
      // Most token symbols are in English, so no need to translate.
      label: 'Z → A',
      value: (a, b) =>
        b.token.symbol
          .toLocaleLowerCase()
          .localeCompare(a.token.symbol.toLocaleLowerCase()),
    },
  ]
}
