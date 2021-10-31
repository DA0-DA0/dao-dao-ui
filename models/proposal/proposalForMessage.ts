import { EmptyProposal, Proposal } from './proposal'
import { ProposalReducer } from './proposalReducer'

export function proposalForMessage(json: any): Proposal {
  let proposal: Proposal = { ...EmptyProposal }
  return updateProposalForMessage(proposal, json)
}

export function updateProposalForMessage(proposal: Proposal, json: any): Proposal {
  let valid = true

  const msgs: any[] | undefined = json['msgs']
  let updatedProposal = {...EmptyProposal}
  if (msgs && msgs?.length) {
    for (const message of msgs) {
      updatedProposal = ProposalReducer(updatedProposal, {
        type: 'addMessage',
        message,
        valid: true
      })
    }
  }
  if (!valid) {
    try {
      throw new Error(
        `invalid input json: ${JSON.stringify(json, undefined, 2)}`
      )
    } catch (e) {
      throw new Error(`invalid input json (could not stringify)`)
    }
  }
  proposal.activeMessageId = updatedProposal.activeMessageId
  proposal.title = json['title']
  proposal.description = json['description']
  return proposal
}
