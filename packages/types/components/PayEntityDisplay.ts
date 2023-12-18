import { ComponentType } from 'react'

import { Coin } from '../contracts/common'
import { GenericTokenBalance } from '../token'
import { StatefulEntityDisplayProps } from './EntityDisplay'

export type PayEntityDisplayRowProps = {
  token: GenericTokenBalance
  recipient: string
  EntityDisplay: ComponentType<StatefulEntityDisplayProps>
}

export type PayEntityDisplayProps = Omit<PayEntityDisplayRowProps, 'token'> & {
  tokens: PayEntityDisplayRowProps['token'][]
  className?: string
}

export type StatefulPayEntityDisplayProps = Omit<
  PayEntityDisplayProps,
  'tokens' | 'EntityDisplay'
> & {
  coins: Coin[]
}
