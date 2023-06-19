import { InboxSource } from '@dao-dao/types'

import { OpenProposals, JoinedDao } from './sources'

export const getSources = (): readonly InboxSource[] => [
  OpenProposals,
  JoinedDao,
]
