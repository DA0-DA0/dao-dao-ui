import { useMemo } from 'react'

import { Action } from '@dao-dao/types'

export const useActions = (): Action[] => {
  return useMemo(() => [].filter(Boolean) as Action[], [])
}
