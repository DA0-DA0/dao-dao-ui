import { ChainId, Widget } from '@dao-dao/types'

import {
  PressWidget,
  RetroactiveCompensationWidget,
  VestingPaymentsWidget,
  WyndDepositWidget,
} from './widgets'

// Add widgets here.
export const getWidgets = (chainId: string): readonly Widget[] => [
  // MintNftWidget,

  VestingPaymentsWidget,
  RetroactiveCompensationWidget,
  PressWidget,

  // WYND only available on Juno mainnet.
  ...(chainId === ChainId.JunoMainnet ? [WyndDepositWidget] : []),
]

export const getWidgetById = (chainId: string, id: string) =>
  getWidgets(chainId).find((widget) => widget.id === id)
