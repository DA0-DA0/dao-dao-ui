import { ChainInfoID } from '@noahsaso/cosmodal'

import { Widget } from '@dao-dao/types'
import { CHAIN_ID } from '@dao-dao/utils'

import {
  PressWidget,
  RetroactiveCompensationWidget,
  VestingPaymentsWidget,
  WyndDepositWidget,
} from './widgets'

// Add widgets here.
export const getWidgets = (): readonly Widget[] => [
  // MintNftWidget,

  VestingPaymentsWidget,
  RetroactiveCompensationWidget,
  PressWidget,

  // WYND only available on Juno mainnet.
  ...(CHAIN_ID === ChainInfoID.Juno1 ? [WyndDepositWidget] : []),
]

export const getWidgetById = (id: string) =>
  getWidgets().find((widget) => widget.id === id)
