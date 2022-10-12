/* eslint-disable react-hooks/rules-of-hooks */

import { ExecuteResult } from '@cosmjs/cosmwasm-stargate'
import { useCallback } from 'react'
import { useRecoilValueLoadable } from 'recoil'

import { FunctionKeyOf } from '../../../types'
import { CwdCoreV2Client as ExecuteClient } from '../../clients/CwdCore.v2'
import {
  ExecuteClientParams,
  executeClient,
} from '../../recoil/selectors/clients/CwdCore.v2'

// This hook wrapper lets us easily make hooks out of all execution functions on
// the contract clients, without having to fetch the `executeClient` selector as
// a loadable and add `useCallback` hooks in all the components.
const wrapExecuteHook =
  <T extends FunctionKeyOf<ExecuteClient>>(fn: T) =>
  (params: ExecuteClientParams) => {
    const clientLoadable = useRecoilValueLoadable(executeClient(params))
    const client =
      clientLoadable.state === 'hasValue' ? clientLoadable.contents : undefined

    return useCallback(
      (...args: Parameters<ExecuteClient[T]>) => {
        if (client)
          return (
            client[fn] as (
              ...args: Parameters<ExecuteClient[T]>
            ) => Promise<ExecuteResult>
          )(...args)
        throw new Error('Client undefined.')
      },
      [client]
    )
  }

export const useExecuteAdminMsgs = wrapExecuteHook('executeAdminMsgs')
export const useExecuteProposalHook = wrapExecuteHook('executeProposalHook')
export const usePause = wrapExecuteHook('pause')
export const useUpdateConfig = wrapExecuteHook('updateConfig')
export const useUpdateVotingModule = wrapExecuteHook('updateVotingModule')
export const useUpdateProposalModules = wrapExecuteHook('updateProposalModules')
export const useSetItem = wrapExecuteHook('setItem')
export const useRemoveItem = wrapExecuteHook('removeItem')
export const useReceive = wrapExecuteHook('receive')
export const useReceiveNft = wrapExecuteHook('receiveNft')
export const useUpdateCw20List = wrapExecuteHook('updateCw20List')
export const useUpdateCw721List = wrapExecuteHook('updateCw721List')
