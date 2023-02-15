import { ComponentType } from 'react'

import { Action, ActionMaker, ActionOptions } from './actions'

export type PayrollAdapter = {
  id: string
  PayrollTab: ComponentType
  actionMakers?: ActionMaker[]
}

export type PayrollAdapterWithActions = Omit<PayrollAdapter, 'actionMakers'> & {
  makeActions: (options: ActionOptions) => Action[]
}
