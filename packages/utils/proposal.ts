import {
  ProposalStatus,
  ProposalStatusKey,
} from '@dao-dao/types/contracts/common'
import {
  ProposalStatus as PreProposeStatus,
  ProposalStatusKey as PreProposeStatusKey,
} from '@dao-dao/types/contracts/DaoPreProposeApprovalSingle'

// Get the status key from the weirdly-formatted status enum.
export const keyFromPreProposeStatus = (
  status: PreProposeStatus
): PreProposeStatusKey => Object.keys(status)[0] as PreProposeStatusKey

/**
 * Returns the flattened key of the proposal status.
 *
 * @param {ProposalStatus} status - The proposal status.
 * @return {ProposalStatusKey} The flattened key of the proposal status.
 */
export const getProposalStatusKey = (
  status: ProposalStatus
): ProposalStatusKey =>
  typeof status === 'string'
    ? status
    : typeof status === 'object' && status
    ? (Object.keys(status)[0] as any)
    : (() => {
        throw new Error('Invalid proposal status.')
      })()
