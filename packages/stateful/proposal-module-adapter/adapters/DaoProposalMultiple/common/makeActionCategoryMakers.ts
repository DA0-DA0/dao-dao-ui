import {
  ActionCategoryKey,
  ActionCategoryMaker,
  IProposalModuleAdapterCommonOptions,
} from '@dao-dao/types'

import {
  makeUpdatePreProposeConfigActionMaker,
  makeUpdateProposalConfigActionMaker,
} from './actions'

export const makeActionCategoryMakers = ({
  proposalModule,
}: IProposalModuleAdapterCommonOptions): ActionCategoryMaker[] => [
  () => ({
    // Add to DAO Governance category.
    key: ActionCategoryKey.DaoGovernance,
    actionMakers: [
      makeUpdateProposalConfigActionMaker(proposalModule),
      makeUpdatePreProposeConfigActionMaker(proposalModule),
    ],
  }),
]
