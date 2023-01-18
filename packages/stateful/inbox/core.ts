import { InboxSource } from '@dao-dao/types'

import { OpenProposals, PendingFollowing } from './sources'

export const getSources = (): readonly InboxSource[] => [
  OpenProposals,
  PendingFollowing,
]
