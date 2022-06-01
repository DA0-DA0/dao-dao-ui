import { FC, useMemo } from 'react'
import { useRecoilValue, waitForAll } from 'recoil'

import { nativeBalancesSelector, useGovernanceTokenInfo } from '@dao-dao/state'
import { TokenInfoResponse } from '@dao-dao/state/clients/cw20-base'
import { allCw20BalancesSelector } from '@dao-dao/state/recoil/selectors/clients/cw-core'
import {
  marketingInfoSelector,
  tokenInfoSelector,
} from '@dao-dao/state/recoil/selectors/clients/cw20-base'
import { TreasuryBalances as StatelessTreasuryBalances } from '@dao-dao/ui'
import {
  NATIVE_DECIMALS,
  NATIVE_DENOM,
  nativeTokenDecimals,
} from '@dao-dao/utils'

import { useOrgInfoContext } from './OrgPageWrapper'

export const TreasuryBalances: FC = () => {
  const { coreAddress } = useOrgInfoContext()
  const { governanceTokenAddress, treasuryBalance } = useGovernanceTokenInfo(
    coreAddress,
    { fetchTreasuryBalance: true }
  )

  const nativeBalances =
    useRecoilValue(nativeBalancesSelector(coreAddress)) ?? []

  const _cw20List = useRecoilValue(
    allCw20BalancesSelector({ contractAddress: coreAddress })
  )
  const cw20List = useMemo(() => {
    const list = _cw20List ? [..._cw20List] : []

    // Add governance token to beginning if exists and not already in list.
    if (
      governanceTokenAddress &&
      !list.some(({ addr }) => addr !== governanceTokenAddress)
    ) {
      list.splice(0, 0, {
        addr: governanceTokenAddress,
        balance: (treasuryBalance ?? 0).toString(),
      })
    }

    return list
  }, [_cw20List, governanceTokenAddress, treasuryBalance])

  const cw20Info = useRecoilValue(
    waitForAll(
      cw20List.map(({ addr }) =>
        tokenInfoSelector({ contractAddress: addr, params: [] })
      )
    )
  ).filter(Boolean) as TokenInfoResponse[]
  const cw20MarketingInfo = useRecoilValue(
    waitForAll(
      cw20List.map(({ addr }) =>
        marketingInfoSelector({ contractAddress: addr, params: [] })
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
