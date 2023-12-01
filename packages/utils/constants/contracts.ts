export enum ContractName {
  CwTokenSwap = 'crates.io:cw-token-swap',
  CwTokenfactoryIssuer = 'crates.io:cw-tokenfactory-issuer',
  PolytoneProxy = 'crates.io:polytone-proxy',
  PreProposeMultiple = 'crates.io:dao-pre-propose-multiple',
  PreProposeSingle = 'crates.io:dao-pre-propose-single',
  PreProposeApprovalSingle = 'crates.io:dao-pre-propose-approval-single',
  PreProposeApprover = 'crates.io:dao-pre-propose-approver',
}

export const DAO_CORE_CONTRACT_NAMES = [
  // V1
  'crates.io:cw-core',
  // V2+
  'crates.io:cwd-core',
  'crates.io:dao-core',
]

export const LEGACY_DAO_CONTRACT_NAMES = [
  'crates.io:sg_dao',
  'crates.io:cw3_dao',
]

export const DAO_VOTING_CW20_STAKED_CONTRACT_NAMES = [
  // V1
  'crates.io:cw20-staked-balance-voting',
  // V2+
  'crates.io:cwd-voting-cw20-staked',
  'crates.io:dao-voting-cw20-staked',
]

export const DAO_VOTING_CW4_CONTRACT_NAMES = [
  // V1
  'crates.io:cw4-voting',
  // V2
  'crates.io:cwd-voting-cw4',
  'crates.io:dao-voting-cw4',
]

export const DAO_VOTING_CW721_STAKED_CONTRACT_NAMES = [
  // V2+
  'crates.io:dao-voting-cw721-staked',
]

export const DAO_VOTING_TOKEN_STAKED_CONTRACT_NAMES = [
  // V2.3.0+
  'crates.io:dao-voting-token-staked',
]

export const DAO_PRE_PROPOSE_SINGLE_CONTRACT_NAMES = [
  ContractName.PreProposeSingle,
]

export const DAO_PROPOSAL_SINGLE_CONTRACT_NAMES = [
  // V1
  'crates.io:cw-govmod-single',
  'crates.io:cw-proposal-single',
  // V2+
  'crates.io:cwd-proposal-single',
  'crates.io:dao-proposal-single',
]

export const DAO_PRE_PROPOSE_MULTIPLE_CONTRACT_NAMES = [
  ContractName.PreProposeMultiple,
]

export const DAO_PROPOSAL_MULTIPLE_CONTRACT_NAMES = [
  // V1 (Neutron's modified contracts)
  'crates.io:cwd-proposal-multiple',
  // V2+ (DAO DAO has only used on V2+ contracts)
  'crates.io:dao-proposal-multiple',
]

export const DAO_VOTING_NATIVE_STAKED_CONTRACT_NAMES = [
  // V1
  'crates.io:cw-native-staked-balance-voting',
  // V2+
  'crates.io:cwd-voting-native-staked',
  'crates.io:dao-voting-native-staked',
]
