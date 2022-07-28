/* eslint-disable react-hooks/rules-of-hooks */

import { ExecuteResult } from '@cosmjs/cosmwasm-stargate'
import { useCallback } from 'react'
import { useRecoilValueLoadable } from 'recoil'

import { CwNativeStakedBalanceVotingClient as ExecuteClient } from '../../clients/cw-native-staked-balance-voting'
import {
  ExecuteClientParams,
  executeClient,
} from '../../recoil/selectors/clients/cw-native-staked-balance-voting'
import { FunctionKeyOf } from '../../types'

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
