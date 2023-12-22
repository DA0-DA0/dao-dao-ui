import { FeedSource } from '@dao-dao/types'

import { OpenProposals, VetoableProposals } from './sources'

export const getSources = (): readonly FeedSource[] => [
  OpenProposals,
  VetoableProposals,
]
