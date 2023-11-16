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

export type ProcessedQuorum = {
  quorum: ProcessedTQ
}

export type CodeIdConfig = {
  // https://github.com/CosmWasm/cw-plus
  Cw1Whitelist: number
  Cw4Group: number
  // https://github.com/CosmWasm/cw-nfts
  Cw721Base?: number

  // https://github.com/DA0-DA0/dao-contracts
  CwPayrollFactory: number
  CwTokenSwap: number
  CwTokenfactoryIssuer: number
  CwVesting: number
  DaoCore: number
  DaoMigrator: number
  DaoPreProposeMultiple: number
  DaoPreProposeSingle: number
  DaoProposalMultiple: number
  DaoProposalSingle: number
  DaoVotingCw4: number
  DaoVotingCw721Staked: number
  DaoVotingTokenStaked: number
  // v2.1.0 and below, for migrating v1 to v2 DAOs
  Cw20Stake?: number
  DaoVotingCw20Staked?: number
}

export type PolytoneConnection = {
  // Contract address of note on the local/current chain.
  note: string
  // Contract address of the note's listener on the local/current chain.
  listener: string
  // Contract address of the note's voice on the remote chain.
  voice: string
  // IBC connection IDs
  localConnection: string
  remoteConnection: string
  // IBC channel IDs
  localChannel: string
  remoteChannel: string
  // Whether or not the user needs to self-relay an execution. This should be
  // true if no relayers are running on the established connection. If using an
  // existing active connection, the relayers will automatically perform the
  // relay.
  needsSelfRelay?: boolean
}

// Map chain ID to polytone connection information.
export type PolytoneConfig = Record<string, PolytoneConnection>

export type ParametersExceptFirst<F> = F extends (
  arg0: any,
  ...rest: infer R
) => any
  ? R
  : never

export type DecodedStargateMsg<Value = any> = {
  stargate: {
    typeUrl: string
    value: Value
  }
}
