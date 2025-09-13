import { BallotRounded } from '@mui/icons-material'

import {
  Module,
  ModuleDisplayLocation,
  ModuleId,
  ModuleType,
  ModuleVisibilityContext,
} from '@dao-dao/types'
import { DAO_PROPOSAL_SINGLE_CONTRACT_NAMES } from '@dao-dao/utils'

export const SingleChoiceProposalModule: Module = {
  id: ModuleId.SingleChoiceProposalModule,
  type: ModuleType.Proposal,
  contractName: DAO_PROPOSAL_SINGLE_CONTRACT_NAMES,
  title: 'Single Choice Proposals',
  description: 'Create Yes/No/Abstain proposals.',
  Icon: BallotRounded,
  IconFilled: BallotRounded,
  // TODO: make optional for proposal modules?
  location: ModuleDisplayLocation.Manual,
  visibilityContext: ModuleVisibilityContext.Always,
}
