import {
  ErrorPage,
  Loader,
  PayEntityDisplay as StatelessPayEntityDisplay,
  useChain,
} from '@dao-dao/stateless'
import { StatefulPayEntityDisplayProps, TokenType } from '@dao-dao/types'

import { useQueryTokens } from '../hooks'
import { EntityDisplay } from './EntityDisplay'

export const PayEntityDisplay = ({
  coins,
  ...props
}: StatefulPayEntityDisplayProps) => {
  const { chain_id: chainId } = useChain()

  const tokens = useQueryTokens(
    coins.map(({ denom }) => ({
      chainId,
      type: TokenType.Native,
      denomOrAddress: denom,
    }))
  )

  return tokens.loading ? (
    <Loader size={32} />
  ) : tokens.errored ? (
    <ErrorPage error={tokens.error} />
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
