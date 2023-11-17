import {
  ProposalStatus,
  ProposalStatusKey,
} from '@dao-dao/types/contracts/DaoPreProposeApprovalSingle'

// Get the status key from the weirdly-formatted status enum.
export const keyFromPreProposeStatus = (
  status: ProposalStatus
): ProposalStatusKey => Object.keys(status)[0] as ProposalStatusKey
