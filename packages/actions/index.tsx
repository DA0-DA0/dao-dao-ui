import {
  addTokenAction,
  customAction,
  executeAction,
  instantiateAction,
  mintAction,
  removeTokenAction,
  spendAction,
  stakeAction,
  updateInfoAction,
  updateProposalConfigAction,
} from './actions'
import { Action } from './types'

export const actions: Action[] = [
  spendAction,
  mintAction,
  stakeAction,
  updateInfoAction,
  addTokenAction,
  removeTokenAction,
  updateProposalConfigAction,
  instantiateAction,
  executeAction,
  // Ensure custom is always last for two reasons:
  // 1. It should display last since it is a catch-all.
  // 2. It should be the last action type matched against when listing
  //    proposals in the UI since it will match any message.
  customAction,
]

export * from './actions'
export * from './components'
export * from './hooks'
export * from './types'
