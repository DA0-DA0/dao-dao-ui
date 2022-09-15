import { useMemo } from 'react'

import { ProposalModule } from '@dao-dao/tstypes'

import { makeUpdateProposalConfigAction } from '../actions'

export const makeUseActions = (proposalModule: ProposalModule) => () =>
  useMemo(() => [makeUpdateProposalConfigAction(proposalModule)], [])
