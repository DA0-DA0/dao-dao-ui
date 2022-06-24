import { FC } from 'react'
import { useRecoilValue, waitForAll } from 'recoil'

import {
  Cw20BaseSelectors,
  CwCoreSelectors,
  nativeBalancesSelector,
} from '@dao-dao/state'
import { TokenInfoResponse } from '@dao-dao/state/clients/cw20-base'
import { TreasuryBalances as StatelessTreasuryBalances } from '@dao-dao/ui'
import {
  NATIVE_DECIMALS,
  NATIVE_DENOM,
  nativeTokenDecimals,
} from '@dao-dao/utils'

import { useDAOInfoContext } from './DAOPageWrapper'

export const TreasuryBalances: FC = () => {
  const { coreAddress } = useDAOInfoContext()

  const nativeBalances =
    useRecoilValue(nativeBalancesSelector(coreAddress)) ?? []

  const cw20List =
    useRecoilValue(
      CwCoreSelectors.allCw20BalancesSelector({ contractAddress: coreAddress })
    ) ?? []

  const cw20Info = useRecoilValue(
    waitForAll(
      cw20List.map(({ addr }) =>
        Cw20BaseSelectors.tokenInfoSelector({
          contractAddress: addr,
          params: [],
        })
      )
    )
  ).filter(Boolean) as TokenInfoResponse[]
  const cw20MarketingInfo = useRecoilValue(
    waitForAll(
      cw20List.map(({ addr }) =>
        Cw20BaseSelectors.marketingInfoSelector({
          contractAddress: addr,
          params: [],
        })
      )
    )
  )

  const cw20Tokens = cw20Info.map((info, idx) => {
    const logoInfo = cw20MarketingInfo[idx]?.logo

    return {
      symbol: info.symbol,
      amount: cw20List[idx].balance,
      decimals: info.decimals,
      imageUrl:
        !!logoInfo && logoInfo !== 'embedded' && 'url' in logoInfo
          ? logoInfo.url
          : undefined,
    }
  })

  const nativeTokens = nativeBalances.length
    ? nativeBalances.map(({ denom, amount }) => ({
        denom: denom,
        amount,
        decimals: nativeTokenDecimals(denom) || NATIVE_DECIMALS,
      }))
    : [{ denom: NATIVE_DENOM, amount: '0', decimals: NATIVE_DECIMALS }]

  return (
    <StatelessTreasuryBalances
      cw20Tokens={cw20Tokens}
      nativeTokens={nativeTokens}
    />
  )
}
