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
  // https://github.com/DA0-DA0/dao-contracts
  Cw20Stake: number
  CwAdminFactory: number
  CwTokenSwap: number
  DaoCore: number
  DaoMigrator: number
  DaoPreProposeMultiple: number
  DaoPreProposeSingle: number
  DaoProposalMultiple: number
  DaoProposalSingle: number
  DaoVotingCw20Staked: number
  DaoVotingCw4: number
  DaoVotingCw721Staked: number
  DaoVotingNativeStaked: number
  // https://github.com/CosmWasm/cw-plus
  Cw20Base: number
  Cw4Group: number
  // https://github.com/CosmWasm/cw-nfts
  Cw721Base: number
}

export interface ChainPrefixIdMap {
  juno: string
}

export type ParametersExceptFirst<F> = F extends (
  arg0: any,
  ...rest: infer R
) => any
  ? R
  : never
