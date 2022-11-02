/* eslint-disable react-hooks/rules-of-hooks */

import { ExecuteResult } from '@cosmjs/cosmwasm-stargate'
import { useCallback } from 'react'
import { useRecoilValueLoadable } from 'recoil'

import { CwdVotingNativeStakedClient as ExecuteClient } from '../../clients/CwdVotingNativeStaked'
import {
  ExecuteClientParams,
  executeClient,
} from '../../recoil/selectors/clients/CwdVotingNativeStaked'
import { FunctionKeyOf } from '../../types'

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

export const useStake = wrapExecuteHook('stake')
export const useUnstake = wrapExecuteHook('unstake')
export const useUpdateConfig = wrapExecuteHook('updateConfig')
export const useClaim = wrapExecuteHook('claim')
