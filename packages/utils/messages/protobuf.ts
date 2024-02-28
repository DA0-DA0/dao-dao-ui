import { AminoMsg } from '@cosmjs/amino'
import { fromBase64, toBase64 } from '@cosmjs/encoding'
import { EncodeObject, GeneratedType, Registry } from '@cosmjs/proto-signing'
import { AminoTypes } from '@cosmjs/stargate'
import Long from 'long'

import {
  CosmosMsgFor_Empty,
  DecodedStargateMsg,
  GovProposal,
  GovProposalV1,
  GovProposalV1DecodedMessages,
  GovProposalVersion,
  GovProposalWithDecodedContent,
  StargateMsg,
} from '@dao-dao/types'

import { transformIpfsUrlToHttpsIfNecessary } from '../conversion'
import { processError } from '../error'
import {
  cwVoteOptionToGovVoteOption,
  govVoteOptionToCwVoteOption,
} from '../gov'
import { isValidUrl } from '../isValidUrl'
import { objectMatchesStructure } from '../objectMatchesStructure'
import {
  allianceAminoConverters,
  allianceProtoRegistry,
  circleAminoConverters,
  circleProtoRegistry,
  cosmosAminoConverters,
  cosmosProtoRegistry,
  cosmwasmAminoConverters,
  cosmwasmProtoRegistry,
  gaiaAminoConverters,
  gaiaProtoRegistry,
  google,
  ibcAminoConverters,
  ibcProtoRegistry,
  junoAminoConverters,
  junoProtoRegistry,
  neutronAminoConverters,
  neutronProtoRegistry,
  osmosisAminoConverters,
  osmosisProtoRegistry,
  regenAminoConverters,
  regenProtoRegistry,
  publicawesomeAminoConverters as stargazeAminoConverters,
  publicawesomeProtoRegistry as stargazeProtoRegistry,
} from '../protobuf'
import {
  MsgCreateAllianceProposal,
  MsgDeleteAllianceProposal,
  MsgUpdateAllianceProposal,
} from '../protobuf/codegen/alliance/alliance/gov'
import { MsgSend } from '../protobuf/codegen/cosmos/bank/v1beta1/tx'
import {
  MsgSetWithdrawAddress,
  MsgWithdrawDelegatorReward,
} from '../protobuf/codegen/cosmos/distribution/v1beta1/tx'
import { MsgExecLegacyContent } from '../protobuf/codegen/cosmos/gov/v1/tx'
import { TextProposal } from '../protobuf/codegen/cosmos/gov/v1beta1/gov'
import { MsgVote } from '../protobuf/codegen/cosmos/gov/v1beta1/tx'
import { ParameterChangeProposal } from '../protobuf/codegen/cosmos/params/v1beta1/params'
import {
  MsgBeginRedelegate,
  MsgDelegate,
  MsgUndelegate,
} from '../protobuf/codegen/cosmos/staking/v1beta1/tx'
import {
  MsgClearAdmin,
  MsgExecuteContract,
  MsgInstantiateContract,
  MsgInstantiateContract2,
  MsgMigrateContract,
  MsgUpdateAdmin,
} from '../protobuf/codegen/cosmwasm/wasm/v1/tx'
import { Any } from '../protobuf/codegen/google/protobuf/any'
import { UploadCosmWasmPoolCodeAndWhiteListProposal } from '../protobuf/codegen/osmosis/cosmwasmpool/v1beta1/gov'
import { isCosmWasmStargateMsg } from './cw'

// Convert CosmWasm message to its encoded protobuf equivalent.
export const cwMsgToProtobuf = (
  ...params: Parameters<typeof cwMsgToEncodeObject>
): Any => {
  const { typeUrl, value } = cwMsgToEncodeObject(...params)
  return {
    typeUrl,
    value: encodeProtobufValue(typeUrl, value),
  }
}

// Convert protobuf to its CosmWasm message equivalent.
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
      const encodeObject: EncodeObject = {
        typeUrl: MsgSend.typeUrl,
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
      const encodeObject: EncodeObject = {
        typeUrl: MsgDelegate.typeUrl,
        value: {
          delegatorAddress: sender,
          validatorAddress: stakingMsg.delegate.validator,
          amount: stakingMsg.delegate.amount,
        },
      }
      return encodeObject
    }

    if ('undelegate' in stakingMsg) {
      const encodeObject: EncodeObject = {
        typeUrl: MsgUndelegate.typeUrl,
        value: {
          delegatorAddress: sender,
          validatorAddress: stakingMsg.undelegate.validator,
          amount: stakingMsg.undelegate.amount,
        },
      }
      return encodeObject
    }

    if ('redelegate' in stakingMsg) {
      const encodeObject: EncodeObject = {
        typeUrl: MsgBeginRedelegate.typeUrl,
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

    if ('withdraw_delegator_reward' in distributionMsg) {
      const encodeObject: EncodeObject = {
        typeUrl: MsgWithdrawDelegatorReward.typeUrl,
        value: {
          delegatorAddress: sender,
          validatorAddress: distributionMsg.withdraw_delegator_reward.validator,
        },
      }
      return encodeObject
    }

    if ('set_withdraw_address' in distributionMsg) {
      const encodeObject: EncodeObject = {
        typeUrl: MsgSetWithdrawAddress.typeUrl,
        value: {
          delegatorAddress: sender,
          withdrawAddress: distributionMsg.set_withdraw_address.address,
        },
      }
      return encodeObject
    }

    throw new Error('Unsupported distribution module message.')
  }

  if ('stargate' in msg) {
    return decodeStargateMessage(msg, false).stargate
  }

  if ('wasm' in msg) {
    const wasmMsg = msg.wasm

    // MsgStoreCodeEncodeObject missing from CosmosMsgFor_Empty.

    if ('execute' in wasmMsg) {
      const encodeObject: EncodeObject = {
        typeUrl: MsgExecuteContract.typeUrl,
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
      const encodeObject: EncodeObject = {
        typeUrl: MsgInstantiateContract.typeUrl,
        value: {
          sender,
          admin: wasmMsg.instantiate.admin ?? undefined,
          codeId: BigInt(wasmMsg.instantiate.code_id),
          label: wasmMsg.instantiate.label,
          msg: fromBase64(wasmMsg.instantiate.msg),
          funds: wasmMsg.instantiate.funds,
        },
      }
      return encodeObject
    }

    if ('instantiate2' in wasmMsg) {
      const encodeObject: EncodeObject = {
        typeUrl: MsgInstantiateContract2.typeUrl,
        value: {
          sender,
          admin: wasmMsg.instantiate2.admin ?? undefined,
          codeId: BigInt(wasmMsg.instantiate2.code_id),
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
      const encodeObject: EncodeObject = {
        typeUrl: MsgMigrateContract.typeUrl,
        value: {
          sender,
          contract: wasmMsg.migrate.contract_addr,
          codeId: BigInt(wasmMsg.migrate.new_code_id),
          msg: fromBase64(wasmMsg.migrate.msg),
        },
      }
      return encodeObject
    }

    if ('update_admin' in wasmMsg) {
      const encodeObject: EncodeObject = {
        typeUrl: MsgUpdateAdmin.typeUrl,
        value: {
          sender,
          newAdmin: wasmMsg.update_admin.admin,
          contract: wasmMsg.update_admin.contract_addr,
        },
      }
      return encodeObject
    }

    if ('clear_admin' in wasmMsg) {
      const encodeObject: EncodeObject = {
        typeUrl: MsgClearAdmin.typeUrl,
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
      const encodeObject: EncodeObject = {
        typeUrl: MsgVote.typeUrl,
        value: {
          proposalId: BigInt(govMsg.vote.proposal_id),
          voter: sender,
          option: cwVoteOptionToGovVoteOption(govMsg.vote.vote),
        },
      }
      return encodeObject
    }

    throw new Error('Unsupported gov module message.')
  }

  throw new Error('Unsupported cosmos message.')
}

// This should mirror the encoder function above. Do not use this function to
// convert messages that were decoded with `recursive = true`, like in the
// `useDecodedCosmosMsg` hook in actions. That's because the default case with
// `makeStargateMessage` needs a non-recursively encoded message due to
// technicalities with nested protobufs.
export const decodedStargateMsgToCw = ({
  typeUrl,
  value,
}: DecodedStargateMsg['stargate']): {
  msg: CosmosMsgFor_Empty
  sender: string
} => {
  let msg: CosmosMsgFor_Empty
  let sender = ''
  switch (typeUrl) {
    case MsgSend.typeUrl:
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
    case MsgDelegate.typeUrl:
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
    case MsgUndelegate.typeUrl:
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
    case MsgBeginRedelegate.typeUrl:
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
    case MsgWithdrawDelegatorReward.typeUrl:
      msg = {
        distribution: {
          withdraw_delegator_reward: {
            validator: value.validatorAddress,
          },
        },
      }
      sender = value.delegatorAddress
      break
    case MsgSetWithdrawAddress.typeUrl:
      msg = {
        distribution: {
          set_withdraw_address: {
            address: value.withdrawAddress,
          },
        },
      }
      sender = value.delegatorAddress
      break
    case MsgExecuteContract.typeUrl:
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
    case MsgInstantiateContract.typeUrl:
      msg = {
        wasm: {
          instantiate: {
            admin: value.admin,
            code_id: Number(value.codeId),
            label: value.label,
            msg: toBase64(value.msg),
            funds: value.funds,
          },
        },
      }
      sender = value.sender
      break
    case MsgInstantiateContract2.typeUrl:
      msg = {
        wasm: {
          instantiate2: {
            admin: value.admin,
            code_id: Number(value.codeId),
            label: value.label,
            msg: toBase64(value.msg),
            funds: value.funds,
            fix_msg: value.fixMsg,
            salt: toBase64(value.salt),
          },
        },
      }
      sender = value.sender
      break
    case MsgMigrateContract.typeUrl:
      msg = {
        wasm: {
          migrate: {
            contract_addr: value.contract,
            new_code_id: Number(value.codeId),
            msg: toBase64(value.msg),
          },
        },
      }
      sender = value.sender
      break
    case MsgUpdateAdmin.typeUrl:
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
    case MsgClearAdmin.typeUrl:
      msg = {
        wasm: {
          clear_admin: {
            contract_addr: value.contract,
          },
        },
      }
      sender = value.sender
      break
    case MsgVote.typeUrl:
      msg = {
        gov: {
          vote: {
            proposal_id: Number(value.proposalId),
            vote: govVoteOptionToCwVoteOption(value.option),
          },
        },
      }
      sender = value.voter
      break
    default:
      msg = makeStargateMessage({
        stargate: {
          typeUrl,
          value,
        },
      })
      break
  }

  return {
    msg,
    sender,
  }
}

// Convert staking-related stargate msg to CosmWasm format. Returns undefined if
// not a staking-related message.
export const decodedStakingStargateMsgToCw = ({
  typeUrl,
  value,
}: DecodedStargateMsg['stargate']): CosmosMsgFor_Empty | undefined => {
  switch (typeUrl) {
    case MsgDelegate.typeUrl:
      return {
        staking: {
          delegate: {
            amount: value.amount,
            validator: value.validatorAddress,
          },
        },
      }
    case MsgUndelegate.typeUrl:
      return {
        staking: {
          undelegate: {
            amount: value.amount,
            validator: value.validatorAddress,
          },
        },
      }
    case MsgBeginRedelegate.typeUrl:
      return {
        staking: {
          redelegate: {
            amount: value.amount,
            src_validator: value.validatorSrcAddress,
            dst_validator: value.validatorDstAddress,
          },
        },
      }
    case MsgWithdrawDelegatorReward.typeUrl:
      return {
        distribution: {
          withdraw_delegator_reward: {
            validator: value.validatorAddress,
          },
        },
      }
    case MsgSetWithdrawAddress.typeUrl:
      return {
        distribution: {
          set_withdraw_address: {
            address: value.withdrawAddress,
          },
        },
      }
  }
}

export const PROTOBUF_TYPES: ReadonlyArray<[string, GeneratedType]> = [
  ...cosmosProtoRegistry,
  ...cosmwasmProtoRegistry,
  ['/google.protobuf.Timestamp', google.protobuf.Timestamp as GeneratedType],
  ...junoProtoRegistry,
  ...osmosisProtoRegistry,
  ...ibcProtoRegistry,
  ...stargazeProtoRegistry,
  ...gaiaProtoRegistry,
  ...neutronProtoRegistry,
  ...regenProtoRegistry,
  ...allianceProtoRegistry,
  ...circleProtoRegistry,
  // Not a query or TX so it isn't included in any of the registries. But we
  // want to decode this because it appears in gov props. We need to find a
  // better way to collect all generated types in a single registry...
  [ParameterChangeProposal.typeUrl, ParameterChangeProposal as GeneratedType],
  [
    UploadCosmWasmPoolCodeAndWhiteListProposal.typeUrl,
    UploadCosmWasmPoolCodeAndWhiteListProposal as GeneratedType,
  ],
  // alliance.alliance
  [
    MsgCreateAllianceProposal.typeUrl,
    MsgCreateAllianceProposal as GeneratedType,
  ],
  [
    MsgUpdateAllianceProposal.typeUrl,
    MsgUpdateAllianceProposal as GeneratedType,
  ],
  [
    MsgDeleteAllianceProposal.typeUrl,
    MsgDeleteAllianceProposal as GeneratedType,
  ],
]
export const typesRegistry = new Registry(PROTOBUF_TYPES)

export const aminoTypes = new AminoTypes({
  ...cosmosAminoConverters,
  ...cosmwasmAminoConverters,
  ...junoAminoConverters,
  ...osmosisAminoConverters,
  ...ibcAminoConverters,
  ...stargazeAminoConverters,
  ...gaiaAminoConverters,
  ...neutronAminoConverters,
  ...regenAminoConverters,
  ...allianceAminoConverters,
  ...circleAminoConverters,
})

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
  encodedValue: string | Uint8Array,
  // Recursively decode nested protobufs. This is useful for automatically
  // decoding `Any` types where protobuf interfaces exist.
  recursive = true
): any => {
  const type = typesRegistry.lookupType(typeUrl)
  if (!type) {
    throw new Error(`Type ${typeUrl} not found in registry.`)
  }

  const decodedValue = type.decode(
    typeof encodedValue === 'string' ? fromBase64(encodedValue) : encodedValue,
    undefined,
    // The types in the registry take an extra parameter for recursive
    // decoding even though the registry itself is unaware of this type. Thus,
    // tell TypeScript to ignore it.
    // @ts-ignore
    recursive
  )
  return decodedValue
}

// Decodes a protobuf message from `Any` into its JSON representation.
export const decodeRawProtobufMsg = (
  { typeUrl, value }: Any,
  recursive = true
): DecodedStargateMsg['stargate'] => ({
  typeUrl,
  value: decodeProtobufValue(typeUrl, value, recursive),
})

// Convert protobuf Any into its Amino msg.
export const rawProtobufMsgToAmino = (
  ...params: Parameters<typeof decodeRawProtobufMsg>
): AminoMsg => aminoTypes.toAmino(decodeRawProtobufMsg(...params))

// Convert Amino msg into raw protobuf Any.
export const aminoToRawProtobufMsg = (msg: AminoMsg): Any => {
  const { typeUrl, value } = aminoTypes.fromAmino(msg)
  return {
    typeUrl,
    value: encodeProtobufValue(typeUrl, value),
  }
}

// Encodes a protobuf message from its JSON representation into a `StargateMsg`
// that `CosmWasm` understands.
export const makeStargateMessage = ({
  stargate: { typeUrl, value },
}: DecodedStargateMsg): StargateMsg => ({
  stargate: {
    type_url: typeUrl,
    value: toBase64(encodeProtobufValue(typeUrl, prepareProtobufJson(value))),
  },
})

// Decodes an encoded protobuf message from CosmWasm's `StargateMsg` into its
// JSON representation.
export const decodeStargateMessage = (
  { stargate: { type_url, value } }: StargateMsg,
  recursive = true
): DecodedStargateMsg => ({
  stargate: {
    typeUrl: type_url,
    value: decodeProtobufValue(type_url, value, recursive),
  },
})

// Decode governance proposal v1 messages using a protobuf.
export const decodeGovProposalV1Messages = (
  messages: GovProposalV1['proposal']['messages']
): GovProposalV1DecodedMessages =>
  messages.map((msg) => {
    try {
      return protobufToCwMsg(msg).msg
    } catch (err) {
      // If protobuf not found, capture error and return placeholder.
      console.error(processError(err, { forceCapture: true }))
      return {
        stargate: {
          type_url: msg.typeUrl,
          value: toBase64(msg.value),
        },
      }
    }
  })

// Decode governance proposal content using a protobuf.
export const decodeGovProposal = async (
  govProposal: GovProposal
): Promise<GovProposalWithDecodedContent> => {
  if (govProposal.version === GovProposalVersion.V1_BETA_1) {
    let title = govProposal.proposal.content?.title || ''
    let description = govProposal.proposal.content?.description || ''
    // If content not decoded and stuck as Any, decode as TextProposal to get
    // the title and description.
    if (
      govProposal.proposal.content?.$typeUrl === Any.typeUrl &&
      govProposal.proposal.content.value instanceof Uint8Array
    ) {
      try {
        const content = TextProposal.decode(govProposal.proposal.content.value)
        title = content.title
        description = content.description
      } catch (err) {
        console.error(err)
      }
    }

    return {
      ...govProposal,
      title,
      description,
      decodedContent: govProposal.proposal.content,
    }
  }

  const decodedMessages = decodeGovProposalV1Messages(
    govProposal.proposal.messages.filter(
      ({ typeUrl }) => typeUrl !== MsgExecLegacyContent.typeUrl
    )
  )
  const legacyContent = govProposal.proposal.messages
    .filter(({ typeUrl }) => typeUrl === MsgExecLegacyContent.typeUrl)
    .map(
      (msg) => MsgExecLegacyContent.decode(msg.value, undefined, true).content
    )

  let title =
    govProposal.proposal.title ||
    legacyContent.find((content) => content?.title)?.title ||
    legacyContent[0]?.typeUrl ||
    (decodedMessages[0] &&
      'stargate' in decodedMessages[0] &&
      decodedMessages[0].stargate.type_url.split('.').pop()) ||
    '<no title>'
  let description =
    govProposal.proposal.summary ||
    legacyContent.find((content) => content?.description)?.description ||
    ''
  if (govProposal.proposal.metadata) {
    let metadata
    // If metadata is a URL, try to fetch metadata.
    if (isValidUrl(govProposal.proposal.metadata, true)) {
      try {
        const res = await fetch(
          transformIpfsUrlToHttpsIfNecessary(govProposal.proposal.metadata)
        )
        metadata = await res.json()
      } catch {}

      // If metadata is a JSON object, use it.
    } else {
      try {
        metadata = JSON.parse(govProposal.proposal.metadata)
      } catch {}
    }

    if (objectMatchesStructure(metadata, { title: {} })) {
      title = metadata.title
    }
    if (objectMatchesStructure(metadata, { details: {} })) {
      description = metadata.details
    } else if (objectMatchesStructure(metadata, { description: {} })) {
      description = metadata.description
    }
  }

  return {
    ...govProposal,
    title,
    description,
    decodedMessages,
    legacyContent,
  }
}

export const isDecodedStargateMsg = (msg: any): msg is DecodedStargateMsg =>
  objectMatchesStructure(msg, {
    stargate: {
      typeUrl: {},
      value: {},
    },
  }) && typeof msg.stargate.value === 'object'

// Decode any nested protobufs into JSON. Also decodes longs since those show up
// often.
export const decodeRawDataForDisplay = (msg: any): any =>
  typeof msg !== 'object' || msg === null
    ? msg
    : msg instanceof Uint8Array
    ? toBase64(msg)
    : Array.isArray(msg)
    ? msg.map(decodeRawDataForDisplay)
    : Long.isLong(msg)
    ? msg.toString()
    : msg instanceof Date
    ? msg.toISOString()
    : // `Any` protobuf
    objectMatchesStructure(msg, {
        typeUrl: {},
        value: {},
      }) &&
      typeof (msg as Any).typeUrl === 'string' &&
      (msg as Any).value instanceof Uint8Array
    ? (() => {
        try {
          return decodeRawProtobufMsg(msg as Any)
        } catch {
          return msg
        }
      })()
    : // Stargate message
    isCosmWasmStargateMsg(msg)
    ? decodeRawDataForDisplay(decodeStargateMessage(msg))
    : Object.entries(msg).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: decodeRawDataForDisplay(value),
        }),
        {} as Record<string, any>
      )

// Prepare JSON for protobuf encoding. Some fields, like Dates, need special
// handling so that any protobuf type can be encoded.
//
// Rules:
//   (1) Strings with the 'DATE:' prefix are converted to Dates.
export const prepareProtobufJson = (msg: any): any =>
  msg instanceof Uint8Array
    ? msg
    : Array.isArray(msg)
    ? msg.map(prepareProtobufJson)
    : // Rule (1)
    typeof msg === 'string' && msg.startsWith('DATE:')
    ? new Date(msg.replace('DATE:', ''))
    : typeof msg !== 'object' || msg === null || msg.constructor !== Object
    ? msg
    : Object.entries(msg).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: prepareProtobufJson(value),
        }),
        {} as Record<string, any>
      )
