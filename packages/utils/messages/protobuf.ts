import {
  MsgClearAdminEncodeObject,
  MsgExecuteContractEncodeObject,
  MsgInstantiateContractEncodeObject,
  MsgMigrateContractEncodeObject,
  MsgUpdateAdminEncodeObject,
} from '@cosmjs/cosmwasm-stargate'
import { wasmTypes } from '@cosmjs/cosmwasm-stargate/build/modules'
import { fromBase64, toBase64 } from '@cosmjs/encoding'
import { EncodeObject, GeneratedType, Registry } from '@cosmjs/proto-signing'
import {
  MsgBeginRedelegateEncodeObject,
  MsgDelegateEncodeObject,
  MsgSendEncodeObject,
  MsgUndelegateEncodeObject,
  MsgVoteEncodeObject,
  MsgWithdrawDelegatorRewardEncodeObject,
  defaultRegistryTypes,
} from '@cosmjs/stargate'
import {
  GenericAuthorization,
  Grant,
} from 'cosmjs-types/cosmos/authz/v1beta1/authz'
import { SendAuthorization } from 'cosmjs-types/cosmos/bank/v1beta1/authz'
import { PubKey } from 'cosmjs-types/cosmos/crypto/ed25519/keys'
import { VoteOption as CosmosGovVoteOption } from 'cosmjs-types/cosmos/gov/v1beta1/gov'
import { MsgUnjail } from 'cosmjs-types/cosmos/slashing/v1beta1/tx'
import {
  AcceptedMessageKeysFilter,
  AcceptedMessagesFilter,
  AllowAllMessagesFilter,
  CombinedLimit,
  ContractExecutionAuthorization,
  ContractGrant,
  ContractMigrationAuthorization,
  MaxCallsLimit,
  MaxFundsLimit,
} from 'cosmjs-types/cosmwasm/wasm/v1/authz'
import { MsgInstantiateContract2 } from 'cosmjs-types/cosmwasm/wasm/v1/tx'
import { Any } from 'cosmjs-types/google/protobuf/any'
import { Timestamp } from 'cosmjs-types/google/protobuf/timestamp'
import { cosmos } from 'interchain-rpc'
import { juno } from 'juno-network'
import Long from 'long'

import {
  CosmosMsgFor_Empty,
  DecodedStargateMsg,
  GovProposal,
  GovProposalWithDecodedContent,
  StargateMsg,
  VoteOption,
} from '@dao-dao/types'

import { objectMatchesStructure } from '../objectMatchesStructure'

export const cwMsgToProtobuf = (
  ...params: Parameters<typeof cwMsgToEncodeObject>
): Any => encodeRawProtobufMsg(cwMsgToEncodeObject(...params))

export const protobufToCwMsg = (
  ...params: Parameters<typeof decodeRawProtobufMsg>
): {
  msg: CosmosMsgFor_Empty
  sender: string
} => decodedStargateMsgToCw(decodeRawProtobufMsg(...params))

export const cwMsgToEncodeObject = (
  msg: CosmosMsgFor_Empty,
  sender: string
): EncodeObject => {
  if ('bank' in msg) {
    const bankMsg = msg.bank

    if ('send' in bankMsg) {
      const encodeObject: MsgSendEncodeObject = {
        typeUrl: '/cosmos.bank.v1beta1.MsgSend',
        value: {
          fromAddress: sender,
          toAddress: bankMsg.send.to_address,
          amount: bankMsg.send.amount,
        },
      }

      return encodeObject
    }

    // burn does not exist?

    throw new Error('Unsupported bank module message.')
  }

  if ('staking' in msg) {
    const stakingMsg = msg.staking

    if ('delegate' in stakingMsg) {
      const encodeObject: MsgDelegateEncodeObject = {
        typeUrl: '/cosmos.staking.v1beta1.MsgDelegate',
        value: {
          delegatorAddress: sender,
          validatorAddress: stakingMsg.delegate.validator,
          amount: stakingMsg.delegate.amount,
        },
      }
      return encodeObject
    }

    if ('undelegate' in stakingMsg) {
      const encodeObject: MsgUndelegateEncodeObject = {
        typeUrl: '/cosmos.staking.v1beta1.MsgUndelegate',
        value: {
          delegatorAddress: sender,
          validatorAddress: stakingMsg.undelegate.validator,
          amount: stakingMsg.undelegate.amount,
        },
      }
      return encodeObject
    }

    if ('redelegate' in stakingMsg) {
      const encodeObject: MsgBeginRedelegateEncodeObject = {
        typeUrl: '/cosmos.staking.v1beta1.MsgBeginRedelegate',
        value: {
          delegatorAddress: sender,
          validatorSrcAddress: stakingMsg.redelegate.src_validator,
          validatorDstAddress: stakingMsg.redelegate.dst_validator,
          amount: stakingMsg.redelegate.amount,
        },
      }
      return encodeObject
    }

    throw new Error('Unsupported staking module message.')
  }

  if ('distribution' in msg) {
    const distributionMsg = msg.distribution

    // set_withdraw_address does not exist?

    if ('withdraw_delegator_reward' in distributionMsg) {
      const encodeObject: MsgWithdrawDelegatorRewardEncodeObject = {
        typeUrl: '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
        value: {
          delegatorAddress: sender,
          validatorAddress: distributionMsg.withdraw_delegator_reward.validator,
        },
      }
      return encodeObject
    }

    throw new Error('Unsupported distribution module message.')
  }

  if ('stargate' in msg) {
    return decodeStargateMessage(msg).stargate
  }

  if ('wasm' in msg) {
    const wasmMsg = msg.wasm

    // MsgStoreCodeEncodeObject missing from CosmosMsgFor_Empty.

    if ('execute' in wasmMsg) {
      const encodeObject: MsgExecuteContractEncodeObject = {
        typeUrl: '/cosmwasm.wasm.v1.MsgExecuteContract',
        value: {
          sender,
          contract: wasmMsg.execute.contract_addr,
          funds: wasmMsg.execute.funds,
          msg: fromBase64(wasmMsg.execute.msg),
        },
      }
      return encodeObject
    }

    if ('instantiate' in wasmMsg) {
      const encodeObject: MsgInstantiateContractEncodeObject = {
        typeUrl: '/cosmwasm.wasm.v1.MsgInstantiateContract',
        value: {
          sender,
          admin: wasmMsg.instantiate.admin ?? undefined,
          codeId: Long.fromInt(wasmMsg.instantiate.code_id),
          label: wasmMsg.instantiate.label,
          msg: fromBase64(wasmMsg.instantiate.msg),
          funds: wasmMsg.instantiate.funds,
        },
      }
      return encodeObject
    }

    if ('instantiate2' in wasmMsg) {
      const encodeObject: EncodeObject = {
        typeUrl: '/cosmwasm.wasm.v1.MsgInstantiateContract2',
        value: {
          sender,
          admin: wasmMsg.instantiate2.admin ?? undefined,
          codeId: Long.fromInt(wasmMsg.instantiate2.code_id),
          label: wasmMsg.instantiate2.label,
          msg: fromBase64(wasmMsg.instantiate2.msg),
          funds: wasmMsg.instantiate2.funds,
          salt: fromBase64(wasmMsg.instantiate2.salt),
          fixMsg: wasmMsg.instantiate2.fix_msg,
        },
      }
      return encodeObject
    }

    if ('migrate' in wasmMsg) {
      const encodeObject: MsgMigrateContractEncodeObject = {
        typeUrl: '/cosmwasm.wasm.v1.MsgMigrateContract',
        value: {
          sender,
          contract: wasmMsg.migrate.contract_addr,
          codeId: Long.fromInt(wasmMsg.migrate.new_code_id),
          msg: fromBase64(wasmMsg.migrate.msg),
        },
      }
      return encodeObject
    }

    if ('update_admin' in wasmMsg) {
      const encodeObject: MsgUpdateAdminEncodeObject = {
        typeUrl: '/cosmwasm.wasm.v1.MsgUpdateAdmin',
        value: {
          sender,
          newAdmin: wasmMsg.update_admin.admin,
          contract: wasmMsg.update_admin.contract_addr,
        },
      }
      return encodeObject
    }

    if ('clear_admin' in wasmMsg) {
      const encodeObject: MsgClearAdminEncodeObject = {
        typeUrl: '/cosmwasm.wasm.v1.MsgClearAdmin',
        value: {
          sender,
          contract: wasmMsg.clear_admin.contract_addr,
        },
      }
      return encodeObject
    }

    throw new Error('Unsupported wasm module message.')
  }

  if ('gov' in msg) {
    const govMsg = msg.gov

    // MsgDepositEncodeObject and MsgSubmitProposalEncodeObject missing from
    // CosmosMsgFor_Empty.

    if ('vote' in govMsg) {
      const vote = govMsg.vote.vote
      const voteOption: CosmosGovVoteOption =
        vote === 'yes'
          ? CosmosGovVoteOption.VOTE_OPTION_YES
          : vote === 'abstain'
          ? CosmosGovVoteOption.VOTE_OPTION_ABSTAIN
          : vote === 'no'
          ? CosmosGovVoteOption.VOTE_OPTION_NO
          : vote === 'no_with_veto'
          ? CosmosGovVoteOption.VOTE_OPTION_NO_WITH_VETO
          : CosmosGovVoteOption.UNRECOGNIZED

      const encodeObject: MsgVoteEncodeObject = {
        typeUrl: '/cosmos.gov.v1beta1.MsgVote',
        value: {
          proposalId: Long.fromInt(govMsg.vote.proposal_id),
          voter: sender,
          option: voteOption,
        },
      }
      return encodeObject
    }

    throw new Error('Unsupported gov module message.')
  }

  throw new Error('Unsupported cosmos message.')
}

// This should mirror the encoder function above.
export const decodedStargateMsgToCw = ({
  typeUrl,
  value,
}: DecodedStargateMsg['stargate']): {
  msg: CosmosMsgFor_Empty
  sender: string
} => {
  let msg: CosmosMsgFor_Empty
  let sender: string
  switch (typeUrl) {
    case '/cosmos.bank.v1beta1.MsgSend':
      msg = {
        bank: {
          send: {
            amount: value.amount,
            to_address: value.toAddress,
          },
        },
      }
      sender = value.fromAddress
      break
    case '/cosmos.staking.v1beta1.MsgDelegate':
      msg = {
        staking: {
          delegate: {
            amount: value.amount,
            validator: value.validatorAddress,
          },
        },
      }
      sender = value.delegatorAddress
      break
    case '/cosmos.staking.v1beta1.MsgUndelegate':
      msg = {
        staking: {
          undelegate: {
            amount: value.amount,
            validator: value.validatorAddress,
          },
        },
      }
      sender = value.delegatorAddress
      break
    case '/cosmos.staking.v1beta1.MsgBeginRedelegate':
      msg = {
        staking: {
          redelegate: {
            amount: value.amount,
            src_validator: value.validatorSrcAddress,
            dst_validator: value.validatorDstAddress,
          },
        },
      }
      sender = value.delegatorAddress
      break
    case '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward':
      msg = {
        distribution: {
          withdraw_delegator_reward: {
            validator: value.validatorAddress,
          },
        },
      }
      sender = value.delegatorAddress
      break
    case '/cosmwasm.wasm.v1.MsgExecuteContract':
      msg = {
        wasm: {
          execute: {
            contract_addr: value.contract,
            funds: value.funds,
            msg: toBase64(value.msg),
          },
        },
      }
      sender = value.sender
      break
    case '/cosmwasm.wasm.v1.MsgInstantiateContract':
      msg = {
        wasm: {
          instantiate: {
            admin: value.admin,
            code_id: Long.fromValue(value.codeId).toNumber(),
            label: value.label,
            msg: toBase64(value.msg),
            funds: value.funds,
          },
        },
      }
      sender = value.sender
      break
    case '/cosmwasm.wasm.v1.MsgMigrateContract':
      msg = {
        wasm: {
          migrate: {
            contract_addr: value.contract,
            new_code_id: Long.fromValue(value.codeId).toNumber(),
            msg: toBase64(value.msg),
          },
        },
      }
      sender = value.sender
      break
    case '/cosmwasm.wasm.v1.MsgUpdateAdmin':
      msg = {
        wasm: {
          update_admin: {
            admin: value.newAdmin,
            contract_addr: value.contract,
          },
        },
      }
      sender = value.sender
      break
    case '/cosmwasm.wasm.v1.MsgClearAdmin':
      msg = {
        wasm: {
          clear_admin: {
            contract_addr: value.contract,
          },
        },
      }
      sender = value.sender
      break
    case '/cosmos.gov.v1beta1.MsgVote':
      const voteOption = value.option
      const vote: VoteOption | undefined =
        voteOption === CosmosGovVoteOption.VOTE_OPTION_YES
          ? 'yes'
          : voteOption === CosmosGovVoteOption.VOTE_OPTION_ABSTAIN
          ? 'abstain'
          : voteOption === CosmosGovVoteOption.VOTE_OPTION_NO
          ? 'no'
          : voteOption === CosmosGovVoteOption.VOTE_OPTION_NO_WITH_VETO
          ? 'no_with_veto'
          : undefined

      if (!vote) {
        throw new Error('Unsupported governance vote option.')
      }

      msg = {
        gov: {
          vote: {
            proposal_id: Long.fromValue(value.proposalId).toNumber(),
            vote,
          },
        },
      }
      sender = value.voter
      break

    default:
      throw new Error('Unsupported type URL.')
  }

  return {
    msg,
    sender,
  }
}

export const typesRegistry = new Registry([
  ...defaultRegistryTypes,
  ...wasmTypes,

  // Custom types not in default registry.
  ...([
    ['/cosmos.slashing.v1beta1.MsgUnjail', MsgUnjail],
    ['/cosmos.authz.v1beta1.GenericAuthorization', GenericAuthorization],
    ['/cosmos.authz.v1beta1.Grant', Grant],
    ['/cosmos.crypto.ed25519.PubKey', PubKey],
    ['/cosmos.bank.v1beta1.SendAuthorization', SendAuthorization],
    ['/cosmwasm.wasm.v1.AcceptedMessageKeysFilter', AcceptedMessageKeysFilter],
    ['/cosmwasm.wasm.v1.AcceptedMessagesFilter', AcceptedMessagesFilter],
    ['/cosmwasm.wasm.v1.AllowAllMessagesFilter', AllowAllMessagesFilter],
    ['/cosmwasm.wasm.v1.CombinedLimit', CombinedLimit],
    ['/cosmwasm.wasm.v1.MaxCallsLimit', MaxCallsLimit],
    ['/cosmwasm.wasm.v1.MaxFundsLimit', MaxFundsLimit],
    ['/google.protobuf.Timestamp', Timestamp],
    [
      '/cosmwasm.wasm.v1.ContractExecutionAuthorization',
      ContractExecutionAuthorization,
    ],
    ['/cosmwasm.wasm.v1.ContractGrant', ContractGrant],
    [
      '/cosmwasm.wasm.v1.ContractMigrationAuthorization',
      ContractMigrationAuthorization,
    ],
    [
      '/juno.feeshare.v1.MsgRegisterFeeShare',
      juno.feeshare.v1.MsgRegisterFeeShare,
    ],
    ['/juno.feeshare.v1.MsgUpdateFeeShare', juno.feeshare.v1.MsgUpdateFeeShare],
    ['/cosmwasm.wasm.v1.MsgInstantiateContract2', MsgInstantiateContract2],
  ] as ReadonlyArray<[string, GeneratedType]>),
])

// Encodes a protobuf message value from its JSON representation into a byte
// array.
export const encodeProtobufValue = (
  typeUrl: string,
  value: any
): Uint8Array => {
  const type = typesRegistry.lookupType(typeUrl)
  if (!type) {
    throw new Error(`Type ${typeUrl} not found in registry.`)
  }
  const encodedValue = type.encode(value).finish()
  return encodedValue
}

// Decodes an encoded protobuf message's value from a Uint8Array or base64
// string into its JSON representation.
export const decodeProtobufValue = (
  typeUrl: string,
  encodedValue: string | Uint8Array
): any => {
  const type = typesRegistry.lookupType(typeUrl)
  if (!type) {
    throw new Error(`Type ${typeUrl} not found in registry.`)
  }

  const decodedValue = type.decode(
    typeof encodedValue === 'string' ? fromBase64(encodedValue) : encodedValue
  )
  return decodedValue
}

// Encodes a protobuf message in its JSON representation into a protobuf `Any`.
export const encodeRawProtobufMsg = ({
  typeUrl,
  value,
}: DecodedStargateMsg['stargate']): Any => ({
  typeUrl,
  value: encodeProtobufValue(typeUrl, value),
})

// Decodes a protobuf message from `Any` into its JSON representation.
export const decodeRawProtobufMsg = ({
  typeUrl,
  value,
}: Any): DecodedStargateMsg['stargate'] => ({
  typeUrl,
  value: decodeProtobufValue(typeUrl, value),
})

// Encodes a protobuf message from its JSON representation into a `StargateMsg`
// that `CosmWasm` understands.
export const makeStargateMessage = ({
  stargate: { typeUrl, value },
}: DecodedStargateMsg): StargateMsg => ({
  stargate: {
    type_url: typeUrl,
    value: toBase64(encodeProtobufValue(typeUrl, value)),
  },
})

// Decodes an encoded protobuf message from CosmWasm's `StargateMsg` into its
// JSON representation.
export const decodeStargateMessage = ({
  stargate: { type_url, value },
}: StargateMsg): DecodedStargateMsg => ({
  stargate: {
    typeUrl: type_url,
    value: decodeProtobufValue(type_url, value),
  },
})

// Decode governance proposal content using a protobuf.
export const decodeGovProposalContent = (
  govProposal: GovProposal
): GovProposalWithDecodedContent => ({
  ...govProposal,
  // It seems as though all proposals can be decoded as a TextProposal, as they
  // tend to start with `title` and `description` fields. This successfully
  // decoded the first 80 proposals, so it's probably intentional.
  decodedContent: cosmos.gov.v1beta1.TextProposal.decode(
    govProposal.content.value
  ),
})

export const isDecodedStargateMsg = (msg: any): msg is DecodedStargateMsg =>
  objectMatchesStructure(msg, {
    stargate: {
      typeUrl: {},
      value: {},
    },
  }) && typeof msg.stargate.value === 'object'
