import { Widget } from '@dao-dao/types'

import {
  PressWidget,
  RetroactiveCompensationWidget,
  VestingPaymentsWidget,
} from './widgets'

// Add widgets here.
export const getWidgets = (chainId: string): readonly Widget[] =>
  [
    // MintNftWidget,
    VestingPaymentsWidget,
    RetroactiveCompensationWidget,
    PressWidget,
  ].filter(
    (widget) =>
      !widget.supportedChainIds || widget.supportedChainIds.includes(chainId)
  )

export const getWidgetById = (chainId: string, id: string) =>
  getWidgets(chainId).find((widget) => widget.id === id)
