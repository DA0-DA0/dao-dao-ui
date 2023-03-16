import { Widget } from '@dao-dao/types'

import { MintNftWidget, WyndDepositWidget } from './widgets'

// The item key in a DAO's core contract that stores the widgets.
export const DAO_WIDGETS_ITEM_KEY = 'widgets'

export const getWidgets = (): readonly Widget[] => [
  MintNftWidget,
  WyndDepositWidget,
]

export const getWidgetById = (id: string) =>
  getWidgets().find((widget) => widget.id === id)
