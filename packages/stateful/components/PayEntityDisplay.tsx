import { waitForAll } from 'recoil'

import { genericTokenBalanceSelector } from '@dao-dao/state/recoil'
import {
  Loader,
  PayEntityDisplay as StatelessPayEntityDisplay,
  useCachedLoading,
} from '@dao-dao/stateless'
import { StatefulPayEntityDisplayProps, TokenType } from '@dao-dao/types'

import { EntityDisplay } from './EntityDisplay'

export const PayEntityDisplay = ({
  coins,
  ...props
}: StatefulPayEntityDisplayProps) => {
  // TODO: get chainId from useChain

  const tokenBalances = useCachedLoading(
    waitForAll(
      coins.map(({ denom }) =>
        genericTokenBalanceSelector({
          type: TokenType.Native,
          denomOrAddress: denom,
          walletAddress: props.recipient,
        })
      )
    ),
    []
  )

  return tokenBalances.loading ? (
    <Loader size={32} />
  ) : (
    <StatelessPayEntityDisplay
      {...props}
      EntityDisplay={EntityDisplay}
      tokens={tokenBalances.data.map(({ token }, index) => ({
        token,
        balance: coins[index].amount,
      }))}
    />
  )
}
