import { ComponentType } from 'react'

import { StatefulEntityDisplayProps } from './EntityDisplay'

export interface TokenSwapStatusProps {
  selfParty: {
    address: string
    amount: number
    decimals: number
    symbol: string
    tokenLogoUrl?: string
    provided: boolean
  }
  counterparty: {
    address: string
    amount: number
    decimals: number
    symbol: string
    tokenLogoUrl?: string
    provided: boolean
  }

  EntityDisplay: ComponentType<StatefulEntityDisplayProps>
  className?: string
}
