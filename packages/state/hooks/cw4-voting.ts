/* eslint-disable react-hooks/rules-of-hooks */

import { useCallback } from 'react'

import { useRecoilValue } from 'recoil'

import { Client as ExecuteClient } from '../clients/cw4-voting'
import {
  executeClient,
  ExecuteClientParams,
} from '../recoil/selectors/cw4-voting'

// Get the keys that are functions.
type FunctionKeyOf<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never
}[keyof T]

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
