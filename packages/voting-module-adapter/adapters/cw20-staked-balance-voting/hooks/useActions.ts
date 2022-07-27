import { useMemo } from 'react'

import { makeMintAction } from '../actions'

export const useActions = () => useMemo(() => [makeMintAction()], [])
