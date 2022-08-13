import { useMemo } from 'react'

import { makeUpdateProposalConfigAction } from '../actions'

export const useActions = () =>
  useMemo(() => [makeUpdateProposalConfigAction()], [])
