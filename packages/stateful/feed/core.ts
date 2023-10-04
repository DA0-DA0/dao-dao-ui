import { FeedSource } from '@dao-dao/types'

import { OpenProposals } from './sources'

export const getSources = (): readonly FeedSource[] => [OpenProposals]
