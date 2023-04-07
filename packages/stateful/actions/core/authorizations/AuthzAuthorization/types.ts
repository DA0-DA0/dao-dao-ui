export type AuthzData = {
  mode: 'grant' | 'revoke'
  authorizationTypeUrl?: AuthorizationTypeUrl
  customTypeUrl?: boolean
  grantee: string
  contract?: string
  funds?: { denom: string; amount: number }[]
  msgTypeUrl?: string
  filterType?: FilterTypes
  filterKeys?: string
  filterMsg?: string
  limitType?: LimitTypes
  calls?: number
}

export enum AuthzExecActionTypes {
  Delegate = '/cosmos.staking.v1beta1.MsgDelegate',
  Undelegate = '/cosmos.staking.v1beta1.MsgUndelegate',
  Redelegate = '/cosmos.staking.v1beta1.MsgBeginRedelegate',
  ClaimRewards = '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
  Vote = '/cosmos.gov.v1beta1.MsgVote',
  Spend = '/cosmos.bank.v1beta1.MsgSend',
  Execute = '/cosmwasm.wasm.v1.MsgExecuteContract',
  Migrate = '/cosmwasm.wasm.v1.MsgMigrateContract',
  Custom = 'custom',
}

export enum AuthorizationTypeUrl {
  Generic = '/cosmos.authz.v1beta1.GenericAuthorization',
  ContractExecution = '/cosmwasm.wasm.v1.ContractExecutionAuthorization',
  ContractMigration = '/cosmwasm.wasm.v1.ContractMigrationAuthorization',
  Spend = '/cosmos.bank.v1beta1.SendAuthorization',
}

export enum FilterTypes {
  All = '/cosmwasm.wasm.v1.AllowAllMessagesFilter',
  Keys = '/cosmwasm.wasm.v1.AcceptedMessageKeysFilter',
  Msg = '/cosmwasm.wasm.v1.AcceptedMessagesFilter',
}

export enum LimitTypes {
  Combined = '/cosmwasm.wasm.v1.CombinedLimit',
  Calls = '/cosmwasm.wasm.v1.MaxCallsLimit',
  Funds = '/cosmwasm.wasm.v1.MaxFundsLimit',
}
