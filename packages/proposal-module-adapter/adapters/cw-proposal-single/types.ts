import { ActionKeyAndData } from '@dao-dao/actions'
import { CosmosMsg_for_Empty } from '@dao-dao/state/clients/cw-proposal-single'

export interface NewProposalForm {
  title: string
  description: string
  actionData: ActionKeyAndData[]
}

// Converted data from actions into Cosmos messages.
export interface NewProposalData extends Omit<NewProposalForm, 'actionData'> {
  msgs: CosmosMsg_for_Empty[]
}
