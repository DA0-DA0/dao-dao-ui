/* eslint-disable react-hooks/rules-of-hooks */

import { wrapExecuteHook } from './wrapExecuteHook'

export const useExecuteProposalHook = wrapExecuteHook('executeProposalHook')
export const useUpdateConfig = wrapExecuteHook('updateConfig')
export const useUpdateVotingModule = wrapExecuteHook('updateVotingModule')
export const useUpdateGovernanceModules = wrapExecuteHook(
  'updateGovernanceModules'
)
export const useSetItem = wrapExecuteHook('setItem')
export const useRemoveItem = wrapExecuteHook('removeItem')
export const useReceive = wrapExecuteHook('receive')
export const useReceiveNft = wrapExecuteHook('receiveNft')
export const useUpdateCw20List = wrapExecuteHook('updateCw20List')
export const useUpdateCw721List = wrapExecuteHook('updateCw721List')
