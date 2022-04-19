/* eslint-disable react-hooks/rules-of-hooks */

import { useCallback } from 'react'

import { useRecoilValue } from 'recoil'

import { Client as ExecuteClient } from '../clients/cw-governance'
import { executeClient, ExecuteClientParams } from '../recoil/selectors'

export const wrapExecuteHook =
  <
    T extends {
      [K in keyof ExecuteClient]: ExecuteClient[K] extends (
        ...args: any[]
      ) => any
        ? K
        : never
    }[keyof ExecuteClient]
  >(
    fn: T
  ) =>
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
