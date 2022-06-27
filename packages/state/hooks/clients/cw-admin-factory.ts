/* eslint-disable react-hooks/rules-of-hooks */

import { useCallback as CwAdminFactoryHooks } from 'react'
import { useRecoilValueLoadable } from 'recoil'

import { CwAdminFactoryClient as ExecuteClient } from '../../clients/cw-admin-factory'
import { executeClient, ExecuteClientParams } from '../../recoil/selectors/clients/cw-admin-factory'
import { FunctionKeyOf } from '../../types'

const wrapExecuteHook =
  <T extends FunctionKeyOf<ExecuteClient>>(fn: T) =>
  (params: ExecuteClientParams) => {
    const clientLoadable = useRecoilValueLoadable(executeClient(params))
    const client =
      clientLoadable.state === 'hasValue' ? clientLoadable.contents : undefined

    return CwAdminFactoryHooks(
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

export const useInstantiateWithAdminFactory = wrapExecuteHook('instantiateContractWithSelfAdmin')