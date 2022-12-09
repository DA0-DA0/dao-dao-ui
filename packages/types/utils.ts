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
  DaoCore: number
  DaoPreProposeMultiple: number
  DaoPreProposeSingle: number
  DaoProposalMultiple: number
  DaoProposalSingle: number
  DaoVotingCw20Staked: number
  DaoVotingCw4: number
  DaoVotingCw721Staked: number
  DaoVotingNativeStaked: number
  CwTokenSwap: number
}

export interface ChainPrefixIdMap {
  juno: string
}
