import { useMemo } from 'react'

import { useActionOptions } from '@dao-dao/common/actions/react/context'
import { Action } from '@dao-dao/types'

import { makeMintAction } from '../actions'

export const useActions = (): Action[] => {
  const options = useActionOptions()

  return useMemo(
    () => [makeMintAction(options)].filter(Boolean) as Action[],
    [options]
  )
}
