import { ComponentType } from 'react'

import { StatefulEntityDisplayProps } from './EntityDisplay'

export interface TokenSwapStatusProps {
  selfParty: {
    address: string
    amount: number
    decimals: number
    symbol: string
    tokenLogoUrl?: string | null
    provided: boolean
  }
  counterparty: {
    address: string
    amount: number
    decimals: number
    symbol: string
    tokenLogoUrl?: string | null
    provided: boolean
  }

  EntityDisplay: ComponentType<StatefulEntityDisplayProps>
  className?: string
}
