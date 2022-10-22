import { useMemo } from 'react'

import { Action } from '@dao-dao/types'

import { useActionOptions } from '../../../../actions'
import { makeMintAction } from '../actions'

export const useActions = (): Action[] => {
  const options = useActionOptions()

  return useMemo(
    () => [makeMintAction(options)].filter(Boolean) as Action[],
    [options]
  )
}
