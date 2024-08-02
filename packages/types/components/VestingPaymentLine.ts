import { ComponentType } from 'react'

import { VestingInfo } from '../vesting'
import { StatefulEntityDisplayProps } from './EntityDisplay'

export type VestingPaymentLineProps = {
  vestingInfo: VestingInfo
  onClick: () => void
  transparentBackground?: boolean
  EntityDisplay: ComponentType<StatefulEntityDisplayProps>
}

export type StatefulVestingPaymentLineProps = Omit<
  VestingPaymentLineProps,
  'EntityDisplay'
>
