import { Widget } from '@dao-dao/types'

import { WyndDepositWidget } from './widgets'

export const getWidgets = (): readonly Widget[] => [
  // MintNftWidget,
  WyndDepositWidget,
]

export const getWidgetById = (id: string) =>
  getWidgets().find((widget) => widget.id === id)
