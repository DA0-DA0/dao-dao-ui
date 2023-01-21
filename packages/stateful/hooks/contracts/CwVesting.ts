/* eslint-disable react-hooks/rules-of-hooks */

import { ExecuteResult } from '@cosmjs/cosmwasm-stargate'
import { useCallback } from 'react'
import { useRecoilValueLoadable } from 'recoil'

import { CwVestingClient as ExecuteClient } from '@dao-dao/state/contracts/CwVesting'
import {
  ExecuteClientParams,
  executeClient,
} from '@dao-dao/state/recoil/selectors/contracts/CwVesting'
import { FunctionKeyOf } from '@dao-dao/types'

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

export const useReceive = wrapExecuteHook('receive')
export const useDistribute = wrapExecuteHook('distribute')
export const useCancel = wrapExecuteHook('cancel')
export const useDelegate = wrapExecuteHook('delegate')
export const useRedelegate = wrapExecuteHook('redelegate')
export const useUndelegate = wrapExecuteHook('undelegate')
export const useSetWithdrawAddress = wrapExecuteHook('setWithdrawAddress')
export const useWithdrawDelegatorReward = wrapExecuteHook(
  'withdrawDelegatorReward'
)
export const useWithdrawDelegatorRewards = wrapExecuteHook(
  'withdrawDelegatorRewards'
)
export const useUpdateOwnership = wrapExecuteHook('updateOwnership')
