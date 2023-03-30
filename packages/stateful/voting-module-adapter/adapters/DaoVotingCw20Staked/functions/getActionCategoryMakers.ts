import { ActionCategoryKey, ActionCategoryMaker } from '@dao-dao/types'

import { makeMintAction } from '../actions'

export const getActionCategoryMakers = (): ActionCategoryMaker[] => [
  () => ({
    // Add to DAO Governance category.
    key: ActionCategoryKey.DaoGovernance,
    actionMakers: [makeMintAction],
  }),
]
