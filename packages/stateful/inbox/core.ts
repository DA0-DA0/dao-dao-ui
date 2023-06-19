import { InboxSource } from '@dao-dao/types'

import { JoinedDao, OpenProposals } from './sources'

export const getSources = (): readonly InboxSource[] => [
  OpenProposals,
  JoinedDao,
]
