import { DaoCreator } from '@dao-dao/types'

import { MembershipBasedCreator } from './MembershipBased'
import { NftBasedCreator } from './NftBased'
import { TokenBasedCreator } from './TokenBased'

export const getCreators = (): readonly DaoCreator[] => [
  MembershipBasedCreator,
  TokenBasedCreator,
  NftBasedCreator,
]

export const getCreatorById = (id: string) =>
  getCreators().find((creator) => creator.id === id)
