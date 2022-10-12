// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { useMemo } from 'react'
import { useRecoilValue, waitForAll } from 'recoil'

import { useDaoInfoContext } from '@dao-dao/common'
import {
  Cw20BaseSelectors,
  CwCoreV1Selectors,
  daoTvlSelector,
  nativeBalancesSelector,
} from '@dao-dao/state'
import { TreasuryBalances as StatelessTreasuryBalances } from '@dao-dao/ui'
import {
  NATIVE_DECIMALS,
  NATIVE_DENOM,
  nativeTokenDecimals,
} from '@dao-dao/utils'

export const TreasuryBalances = () => {
  const { coreAddress } = useDaoInfoContext()

  const nativeBalances = useRecoilValue(nativeBalancesSelector(coreAddress))

  const cw20s = useRecoilValue(
    CwCoreV1Selectors.cw20BalancesInfoSelector(coreAddress)
  )

  const cw20MarketingInfo = useRecoilValue(
    waitForAll(
      cw20s.map(({ denom }) =>
        Cw20BaseSelectors.marketingInfoSelector({
          contractAddress: denom,
          params: [],
        })
      )
    )
  )

  const cw20Tokens: {
    imageUrl: string | undefined
    symbol: string
    denom: string
    amount: string
    decimals: number
  }[] = useMemo(
    () =>
      cw20s.map((info, idx) => {
        const logoInfo = cw20MarketingInfo[idx].logo

        return {
          ...info,
          imageUrl:
            !!logoInfo && logoInfo !== 'embedded' && 'url' in logoInfo
              ? logoInfo.url
              : undefined,
        }
      }),
    [cw20MarketingInfo, cw20s]
  )

  const nativeTokens: {
    denom: string
    amount: string
    decimals: number
  }[] = useMemo(
    () =>
      nativeBalances.length
        ? nativeBalances.map(({ denom, amount }) => ({
            denom,
            amount,
            decimals: nativeTokenDecimals(denom) || NATIVE_DECIMALS,
          }))
        : [{ denom: NATIVE_DENOM, amount: '0', decimals: NATIVE_DECIMALS }],
    [nativeBalances]
  )

  const usdcValue = useRecoilValue(daoTvlSelector(coreAddress))

  return (
    <StatelessTreasuryBalances
      cw20Tokens={cw20Tokens}
      nativeTokens={nativeTokens}
      usdcValue={usdcValue}
    />
  )
}
