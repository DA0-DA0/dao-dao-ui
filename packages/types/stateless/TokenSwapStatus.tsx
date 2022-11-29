import { ComponentType } from 'react'

import { ProfileDisplayProps } from './ProfileDisplay'

export interface TokenSwapStatusProps {
  self: {
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

  ProfileDisplay: ComponentType<Omit<ProfileDisplayProps, 'loadingProfile'>>
}
