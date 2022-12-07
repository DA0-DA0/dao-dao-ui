export enum ProcessedTQType {
  Majority,
  Absolute,
  Percent,
}

export type ProcessedTQ = { display: string } & (
  | { type: ProcessedTQType.Majority }
  | { type: ProcessedTQType.Absolute | ProcessedTQType.Percent; value: number }
)

export type ProcessedThresholdQuorum = {
  threshold: ProcessedTQ
  quorum?: ProcessedTQ
}

export interface CodeIdConfig {
  Cw20Base: number
  Cw20Stake: number
  Cw4Group: number
  CwAdminFactory: number
  CwdCore: number
  CwdPreProposeMultiple: number
  CwdPreProposeSingle: number
  CwdProposalMultiple: number
  CwdProposalSingle: number
  CwdVotingCw20Staked: number
  CwdVotingCw4: number
  CwdVotingCw721Staked: number
  CwdVotingNativeStaked: number
  CwTokenSwap: number
}

export interface ChainPrefixIdMap {
  juno: string
}
