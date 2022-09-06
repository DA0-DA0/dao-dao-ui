import { useMemo } from 'react'

import { ProposalModule } from '@dao-dao/utils'

import { makeUpdateProposalConfigAction } from '../actions'

export const makeUseActions = (proposalModule: ProposalModule) => () =>
  useMemo(() => [makeUpdateProposalConfigAction(proposalModule)], [])
