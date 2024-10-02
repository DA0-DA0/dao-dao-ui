import { GenericAuthorization } from '@dao-dao/types/protobuf/codegen/cosmos/authz/v1beta1/authz'
import { SendAuthorization } from '@dao-dao/types/protobuf/codegen/cosmos/bank/v1beta1/authz'
import { MsgSend } from '@dao-dao/types/protobuf/codegen/cosmos/bank/v1beta1/tx'
import { MsgWithdrawDelegatorReward } from '@dao-dao/types/protobuf/codegen/cosmos/distribution/v1beta1/tx'
import { MsgVote } from '@dao-dao/types/protobuf/codegen/cosmos/gov/v1beta1/tx'
import {
  MsgBeginRedelegate,
  MsgDelegate,
  MsgUndelegate,
} from '@dao-dao/types/protobuf/codegen/cosmos/staking/v1beta1/tx'
import {
  AcceptedMessageKeysFilter,
  AcceptedMessagesFilter,
  AllowAllMessagesFilter,
  CombinedLimit,
  ContractExecutionAuthorization,
  ContractMigrationAuthorization,
  MaxCallsLimit,
  MaxFundsLimit,
} from '@dao-dao/types/protobuf/codegen/cosmwasm/wasm/v1/authz'
import {
  MsgExecuteContract,
  MsgMigrateContract,
  MsgStoreCode,
} from '@dao-dao/types/protobuf/codegen/cosmwasm/wasm/v1/tx'

export type AuthzGrantRevokeData = {
  chainId: string
  mode: 'grant' | 'revoke'
  authorizationTypeUrl: string
  customTypeUrl: boolean
  grantee: string
  contract: string
  funds: {
    denom: string
    amount: string
    // Will multiply `amount` by 10^decimals when generating the message.
    decimals: number
  }[]
  msgTypeUrl: string
  filterTypeUrl: string
  filterKeys: string
  filterMsgs: string
  limitTypeUrl: string
  calls: number
}

export const ACTION_TYPES = [
  {
    type: MsgDelegate,
    i18nKey: 'info.stake',
  },
  {
    type: MsgUndelegate,
    i18nKey: 'info.unstake',
  },
  {
    type: MsgBeginRedelegate,
    i18nKey: 'info.redelegate',
  },
  {
    type: MsgWithdrawDelegatorReward,
    i18nKey: 'info.withdrawStakingRewards',
  },
  {
    type: MsgVote,
    i18nKey: 'title.vote',
  },
  {
    type: MsgSend,
    i18nKey: 'title.spend',
  },
  {
    type: MsgExecuteContract,
    i18nKey: 'title.executeSmartContract',
  },
  {
    type: MsgMigrateContract,
    i18nKey: 'title.migrateSmartContract',
  },
  {
    type: MsgStoreCode,
    i18nKey: 'title.uploadSmartContractCode',
  },
]

export const AUTHORIZATION_TYPES = [
  {
    type: GenericAuthorization,
    i18nKey: 'form.generic',
  },
  {
    type: SendAuthorization,
    i18nKey: 'title.send',
  },
  {
    type: ContractExecutionAuthorization,
    i18nKey: 'title.executeSmartContract',
  },
  {
    type: ContractMigrationAuthorization,
    i18nKey: 'title.migrateSmartContract',
  },
]

export const FILTER_TYPES = [
  {
    type: AllowAllMessagesFilter,
    i18nKey: 'title.all',
  },
  {
    type: AcceptedMessageKeysFilter,
    i18nKey: 'form.allowedMethods',
  },
  {
    type: AcceptedMessagesFilter,
    i18nKey: 'form.message',
  },
]

export const LIMIT_TYPES = [
  {
    type: MaxCallsLimit,
    i18nKey: 'form.calls',
  },
  {
    type: MaxFundsLimit,
    i18nKey: 'form.funds',
  },
  {
    type: CombinedLimit,
    i18nKey: 'form.combined',
  },
]
