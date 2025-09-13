import { BallotRounded } from '@mui/icons-material'

import {
  Module,
  ModuleDisplayLocation,
  ModuleId,
  ModuleType,
  ModuleVisibilityContext,
} from '@dao-dao/types'
import { DAO_PROPOSAL_MULTIPLE_CONTRACT_NAMES } from '@dao-dao/utils'

export const MultipleChoiceProposalModule: Module = {
  id: ModuleId.MultipleChoiceProposalModule,
  type: ModuleType.Proposal,
  contractName: DAO_PROPOSAL_MULTIPLE_CONTRACT_NAMES,
  title: 'Multiple Choice Proposals',
  description: 'Create multiple choice proposals.',
  Icon: BallotRounded,
  IconFilled: BallotRounded,
  // TODO: make optional for proposal modules?
  location: ModuleDisplayLocation.Manual,
  visibilityContext: ModuleVisibilityContext.Always,
}
