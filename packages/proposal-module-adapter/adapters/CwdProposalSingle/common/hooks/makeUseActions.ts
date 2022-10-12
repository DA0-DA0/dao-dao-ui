import { useMemo } from 'react'

import {
  ContractVersion,
  IProposalModuleAdapterCommonOptions,
} from '@dao-dao/tstypes'

import {
  makeUpdatePreProposeConfigAction,
  makeUpdateProposalConfigV1Action,
  makeUpdateProposalConfigV2Action,
} from '../actions'

export const makeUseActions =
  ({ proposalModule }: IProposalModuleAdapterCommonOptions) =>
  () =>
    useMemo(
      () =>
        proposalModule.version === ContractVersion.V0_1_0
          ? [makeUpdateProposalConfigV1Action(proposalModule)]
          : [
              makeUpdateProposalConfigV2Action(proposalModule),
              ...// If has pre propose module, add update config action.
              (proposalModule.preProposeAddress
                ? [makeUpdatePreProposeConfigAction(proposalModule)]
                : []),
            ],
      []
    )
