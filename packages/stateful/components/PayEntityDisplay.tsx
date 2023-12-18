import { waitForAll } from 'recoil'

import { genericTokenSelector } from '@dao-dao/state/recoil'
import {
  Loader,
  PayEntityDisplay as StatelessPayEntityDisplay,
  useCachedLoading,
  useChain,
} from '@dao-dao/stateless'
import { StatefulPayEntityDisplayProps, TokenType } from '@dao-dao/types'

import { EntityDisplay } from './EntityDisplay'

export const PayEntityDisplay = ({
  coins,
  ...props
}: StatefulPayEntityDisplayProps) => {
  const { chain_id: chainId } = useChain()

  const tokens = useCachedLoading(
    waitForAll(
      coins.map(({ denom }) =>
        genericTokenSelector({
          chainId,
          type: TokenType.Native,
          denomOrAddress: denom,
        })
      )
    ),
    []
  )

  return tokens.loading ? (
    <Loader size={32} />
  ) : (
    <StatelessPayEntityDisplay
      {...props}
      EntityDisplay={EntityDisplay}
      tokens={tokens.data.map((token, index) => ({
        token,
        balance: coins[index].amount,
      }))}
    />
  )
}
