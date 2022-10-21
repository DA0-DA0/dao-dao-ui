import { useMemo } from 'react'

import { useActionOptions } from '@dao-dao/actions/react/context'
import { Action } from '@dao-dao/types'

import { makeManageMembersAction } from '../actions'

export const useActions = (): Action[] => {
  const options = useActionOptions()

  return useMemo(
    () => [makeManageMembersAction(options)].filter(Boolean) as Action[],
    [options]
  )
}
