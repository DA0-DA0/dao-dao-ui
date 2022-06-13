import { VotingModuleType } from '@dao-dao/utils'

export interface Cw4VotingMember {
  addr: string
  weight: number
}

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

export type ActionRendererMessage = { [key: string]: any }

export interface ActionsRendererProps {
  coreAddress: string
  votingModuleType: VotingModuleType
  proposalId: number
  messages: ActionRendererMessage[]
}

export interface MintExecuteMsg {
  amount: string
  recipient: string
}
