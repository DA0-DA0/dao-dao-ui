import { ComponentType } from 'react'

import { StatefulProfileDisplayProps } from './ProfileDisplay'

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

  ProfileDisplay: ComponentType<StatefulProfileDisplayProps>
  className?: string
}
