import { ComponentType } from 'react'

import { ActionCategoryMaker, ActionMaker } from './actions'

export type PayrollAdapter = {
  id: string
  PayrollTab: ComponentType
  actionMakers?: ActionMaker[]
}

export type PayrollAdapterWithActions = Omit<PayrollAdapter, 'actionMakers'> & {
  actionCategoryMakers: ActionCategoryMaker[]
}
