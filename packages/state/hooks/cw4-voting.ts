/* eslint-disable react-hooks/rules-of-hooks */

import { useCallback } from 'react'

import { useRecoilValue } from 'recoil'

import { Client as ExecuteClient } from '../clients/cw4-voting'
import {
  executeClient,
  ExecuteClientParams,
} from '../recoil/selectors/clients/cw4-voting'
import { FunctionKeyOf } from '../types'

const wrapExecuteHook =
  <T extends FunctionKeyOf<ExecuteClient>>(fn: T) =>
  (params: ExecuteClientParams) => {
    const client = useRecoilValue(executeClient(params))

    return useCallback(
      (...args: Parameters<ExecuteClient[T]>) => {
        if (client)
          return (
            client[fn] as (
              ...args: Parameters<ExecuteClient[T]>
            ) => ReturnType<ExecuteClient[T]>
          )(...args)
        throw new Error('Client undefined.')
      },
      [client]
    )
  }

export const useMemberChangedHook = wrapExecuteHook('memberChangedHook')
