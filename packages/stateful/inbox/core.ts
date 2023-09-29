import { InboxSource } from '@dao-dao/types'

import { InboxItems } from './sources'
import { OpenProposals } from './sources/OpenProposals'

export const getSources = (): readonly InboxSource[] => [
  InboxItems,
  OpenProposals,
]
