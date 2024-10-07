import { useTranslation } from 'react-i18next'

import { SortFn, TokenCardInfo, TypedOption } from '@dao-dao/types'
import {
  sortTokensValueAscending,
  sortTokensValueDescending,
} from '@dao-dao/utils'

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
      value: sortTokensValueDescending,
    },
    {
      label: t('info.lowestUsdValue'),
      value: sortTokensValueAscending,
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
