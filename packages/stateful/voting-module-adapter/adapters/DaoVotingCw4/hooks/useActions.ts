import { useMemo } from 'react'

import { Action } from '@dao-dao/types'

import { useActionOptions } from '../../../../actions'
import { makeManageMembersAction } from '../actions'

export const useActions = (): Action[] => {
  const options = useActionOptions()

  return useMemo(
    () => [makeManageMembersAction(options)].filter(Boolean) as Action[],
    [options]
  )
}
