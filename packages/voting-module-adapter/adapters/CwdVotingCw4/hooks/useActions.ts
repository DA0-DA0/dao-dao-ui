import { useMemo } from 'react'

import { makeManageMembersAction } from '../actions'

export const useActions = () => useMemo(() => [makeManageMembersAction()], [])
